import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { MimeTypeValue } from '@/shared/types/mime.type';

@Injectable()
export class StorageService {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = configService.getOrThrow<string>('S3_BUCKET_NAME');
    this.client = new S3Client({
      endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
      region: this.configService.getOrThrow<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('S3_SECRET_KEY'),
      },
    });
  }

  async uploadFile(buffer: Buffer, key: string, mimeType: MimeTypeValue) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: String(key),
      Body: buffer,
      ContentType: mimeType,
    });

    try {
      await this.client.send(command);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: String(key),
    });

    try {
      await this.client.send(command);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
