import type { ReadStream } from 'graphql-upload-ts';

export const validateFileFormat = (fileName: string, allowedFileFormats: string[]) => {
  const fileExtension = fileName.split('.').pop();
  if (!fileExtension) {
    return false;
  }
  return allowedFileFormats.includes(fileExtension);
};

export const validateSizeFile = async (fileStream: ReadStream, maxSize: number) => {
  return new Promise((resolve, reject) => {
    let fileSizeInBytes = 0;

    fileStream
      .on('data', (data: Buffer) => {
        fileSizeInBytes += data.byteLength;
      })
      .on('end', () => {
        resolve(fileSizeInBytes <= maxSize);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
