import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import { User } from 'prisma/generated/prisma/client';
import sharp from 'sharp';

import { StorageService } from '@/modules/libs/storage/storage.service';
import { UserRepository } from '@/modules/repositories/user/user.repository';

import { MimeType } from '@/shared/types/mime.type';

@Injectable()
export class ProfileService {
  constructor(
    private readonly storageService: StorageService,
    private readonly userRepository: UserRepository,
  ) {}

  private async processAndUploadFile(buffer: Buffer, fileName: string, animated: boolean) {
    const processedBuffer = await sharp(buffer, { animated }).resize(512, 512).webp({ quality: 80 }).toBuffer();

    await this.storageService.uploadFile(processedBuffer, fileName, MimeType.IMAGE_WEBP);
  }

  async changeAvatar(user: User, file: FileUpload) {
    if (user.avatar) {
      await this.storageService.deleteFile(user.avatar);
    }

    const chunks: Buffer[] = [];

    for await (const chunk of file.createReadStream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const fileName = `/avatars/${user.id}.webp`;

    const isAnimated = !!file.fieldName && !!file.fieldName.endsWith('.gif');

    await this.processAndUploadFile(buffer, fileName, isAnimated);

    const updatedUser = await this.userRepository.updateUser(user.id, { avatar: fileName });

    return updatedUser;
  }

  async removeAvatar(user: User) {
    if (!user.avatar) {
      return;
    }

    const updatedUser = await this.userRepository.updateUser(user.id, { avatar: null });

    return updatedUser;
  }
}
