import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';

import { validateFileFormat, validateSizeFile } from '../lib/file.util';
import { MimeType, MimeTypeToFileExtensions } from '../types/mime.type';

const ALLOWED_FILE_FORMATS = [
  MimeTypeToFileExtensions[MimeType.IMAGE_BMP],
  MimeTypeToFileExtensions[MimeType.IMAGE_GIF],
  MimeTypeToFileExtensions[MimeType.IMAGE_JPEG],
  MimeTypeToFileExtensions[MimeType.IMAGE_PNG],
  MimeTypeToFileExtensions[MimeType.IMAGE_WEBP],
].flat();

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform(value: FileUpload) {
    if (!value.fieldName) {
      throw new BadRequestException('Файл не загружен');
    }

    const { filename } = value;

    const fileStream = value.createReadStream();

    const isFileFormatValid = validateFileFormat(filename, ALLOWED_FILE_FORMATS);
    if (!isFileFormatValid) {
      throw new BadRequestException('Неверный формат файла');
    }

    const isFileSizeValid = await validateSizeFile(fileStream, 10 * 1024 * 1024);

    if (!isFileSizeValid) {
      throw new BadRequestException('Размер файла превышает 10 МБ');
    }

    return value;
  }
}
