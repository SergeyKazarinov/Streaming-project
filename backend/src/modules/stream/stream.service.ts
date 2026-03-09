import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import { User } from 'prisma/generated/prisma/client';
import sharp from 'sharp';

import { MimeType } from '@/shared/types/mime.type';

import { StorageService } from '../libs/storage/storage.service';
import { StreamRepository } from '../repositories/stream/stream.repository';

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input';
import { StreamModel } from './model/stream.model';

@Injectable()
export class StreamService {
  constructor(
    private readonly streamRepository: StreamRepository,
    private readonly storageService: StorageService,
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
}
