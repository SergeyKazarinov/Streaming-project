import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUpload } from 'graphql-upload-ts';
import { AccessToken } from 'livekit-server-sdk';
import { User } from 'prisma/generated/prisma/client';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

import { MimeType } from '@/shared/types/mime.type';

import { StorageService } from '../libs/storage/storage.service';
import { StreamRepository } from '../repositories/stream/stream.repository';
import { UserRepository } from '../repositories/user/user.repository';

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input';
import { StreamModel } from './model/stream.model';

@Injectable()
export class StreamService {
  constructor(
    private readonly streamRepository: StreamRepository,
    private readonly userRepository: UserRepository,
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  private async processAndUploadFile(buffer: Buffer, fileName: string, animated: boolean) {
    const processedBuffer = await sharp(buffer, { animated }).resize(1280, 720).webp({ quality: 80 }).toBuffer();

    await this.storageService.uploadFile(processedBuffer, fileName, MimeType.IMAGE_WEBP);
  }

  private async findStreamByUserId(userId: string): Promise<StreamModel> {
    return await this.streamRepository.findStreamByUserId(userId);
  }

  async findAll(input: Parameters<StreamRepository['findAll']>[0]) {
    return await this.streamRepository.findAll(input);
  }

  async findRandomStream() {
    const totalStream = await this.streamRepository.getTotalCountStream();

    const randomIndexes = new Set<number>();

    while (randomIndexes.size < 4) {
      const randomIndex = Math.floor(Math.random() * totalStream);
      randomIndexes.add(randomIndex);
    }

    const allStreams = await this.streamRepository.findAll({
      offset: 0,
      limit: totalStream,
    });

    const randomStreams = allStreams.filter((stream, index) => randomIndexes.has(index));

    return randomStreams;
  }

  async changeStreamInfo(user: User, input: ChangeStreamInfoInput) {
    return await this.streamRepository.updateStream(user.id, input);
  }

  async changeThumbnail(user: User, file: FileUpload) {
    const stream = await this.findStreamByUserId(user.id);

    if (stream.thumbnailUrl) {
      await this.storageService.deleteFile(stream.thumbnailUrl);
    }

    const chunks: Buffer[] = [];

    for await (const chunk of file.createReadStream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const fileName = `/streams/${user.id}.webp`;

    const isAnimated = !!file.fieldName && !!file.fieldName.endsWith('.gif');

    await this.processAndUploadFile(buffer, fileName, isAnimated);

    const updatedStream = await this.streamRepository.updateStream(user.id, { thumbnailUrl: fileName });

    return updatedStream;
  }

  async removeThumbnail(user: User) {
    const stream = await this.findStreamByUserId(user.id);

    if (!stream.thumbnailUrl) {
      return;
    }

    await this.storageService.deleteFile(stream.thumbnailUrl);

    const updatedStream = await this.streamRepository.updateStream(user.id, { thumbnailUrl: null });

    return updatedStream;
  }

  async generateStreamToken(input: GenerateStreamTokenInput) {
    const { userId, chanelId } = input;
    let self: { id: string; username: string };

    const user = await this.userRepository.findUniqueUserById(userId);

    if (user) {
      self = { id: user.id, username: user.username };
    } else {
      self = { id: uuidv4(), username: `Зритель ${Math.floor(Math.random() * 1000000)}` };
    }

    const channel = await this.userRepository.findUniqueUserById(chanelId);

    if (!channel) {
      throw new NotFoundException('Канал не найден');
    }

    const isHost = self.id === channel.id;

    const token = new AccessToken(
      this.configService.getOrThrow<string>('LIVEKIT_API_KEY'),
      this.configService.getOrThrow<string>('LIVEKIT_API_SECRET'),
      {
        identity: isHost ? `Host-${self.id}` : self.id.toString(),
        name: self.username,
      },
    );

    token.addGrant({
      room: channel.id,
      roomJoin: true,
      canPublish: false,
    });

    return { token: token.toJwt() };
  }
}
