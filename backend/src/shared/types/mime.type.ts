export enum MimeType {
  // Images
  IMAGE_JPEG = 'image/jpeg',
  IMAGE_PNG = 'image/png',
  IMAGE_GIF = 'image/gif',
  IMAGE_WEBP = 'image/webp',
  IMAGE_SVG = 'image/svg+xml',
  IMAGE_BMP = 'image/bmp',
  IMAGE_ICO = 'image/x-icon',

  // Videos
  VIDEO_MP4 = 'video/mp4',
  VIDEO_WEBM = 'video/webm',
  VIDEO_OGG = 'video/ogg',
  VIDEO_QUICKTIME = 'video/quicktime',
  VIDEO_X_MSVIDEO = 'video/x-msvideo',

  // Audio
  AUDIO_MPEG = 'audio/mpeg',
  AUDIO_OGG = 'audio/ogg',
  AUDIO_WAV = 'audio/wav',
  AUDIO_WEBM = 'audio/webm',

  // Documents
  APPLICATION_PDF = 'application/pdf',
  APPLICATION_JSON = 'application/json',
  APPLICATION_XML = 'application/xml',
  APPLICATION_ZIP = 'application/zip',
  APPLICATION_X_TAR = 'application/x-tar',
  APPLICATION_X_RAR = 'application/x-rar-compressed',

  // Text
  TEXT_PLAIN = 'text/plain',
  TEXT_HTML = 'text/html',
  TEXT_CSS = 'text/css',
  TEXT_CSV = 'text/csv',
  TEXT_JAVASCRIPT = 'text/javascript',

  // Office
  APPLICATION_MSWORD = 'application/msword',
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  APPLICATION_VND_MS_EXCEL = 'application/vnd.ms-excel',
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  APPLICATION_VND_MS_POWERPOINT = 'application/vnd.ms-powerpoint',
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}

export const MimeTypeToFileExtensions: Record<MimeType, string[]> = {
  [MimeType.IMAGE_JPEG]: ['jpg', 'jpeg'],
  [MimeType.IMAGE_PNG]: ['png'],
  [MimeType.IMAGE_GIF]: ['gif'],
  [MimeType.IMAGE_WEBP]: ['webp'],
  [MimeType.IMAGE_SVG]: ['svg'],
  [MimeType.IMAGE_BMP]: ['bmp'],
  [MimeType.IMAGE_ICO]: ['ico'],

  [MimeType.VIDEO_MP4]: ['mp4'],
  [MimeType.VIDEO_WEBM]: ['webm'],
  [MimeType.VIDEO_OGG]: ['ogv'],
  [MimeType.VIDEO_QUICKTIME]: ['mov', 'qt'],
  [MimeType.VIDEO_X_MSVIDEO]: ['avi'],

  [MimeType.AUDIO_MPEG]: ['mp3', 'mpeg'],
  [MimeType.AUDIO_OGG]: ['oga', 'ogg'],
  [MimeType.AUDIO_WAV]: ['wav'],
  [MimeType.AUDIO_WEBM]: ['weba'],

  [MimeType.APPLICATION_PDF]: ['pdf'],
  [MimeType.APPLICATION_JSON]: ['json'],
  [MimeType.APPLICATION_XML]: ['xml'],
  [MimeType.APPLICATION_ZIP]: ['zip'],
  [MimeType.APPLICATION_X_TAR]: ['tar'],
  [MimeType.APPLICATION_X_RAR]: ['rar'],

  [MimeType.TEXT_PLAIN]: ['txt'],
  [MimeType.TEXT_HTML]: ['html', 'htm'],
  [MimeType.TEXT_CSS]: ['css'],
  [MimeType.TEXT_CSV]: ['csv'],
  [MimeType.TEXT_JAVASCRIPT]: ['js'],

  [MimeType.APPLICATION_MSWORD]: ['doc'],
  [MimeType.APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT]: ['docx'],
  [MimeType.APPLICATION_VND_MS_EXCEL]: ['xls'],
  [MimeType.APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET]: ['xlsx'],
  [MimeType.APPLICATION_VND_MS_POWERPOINT]: ['ppt'],
  [MimeType.APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION]: ['pptx'],
};

export type MimeTypeValue = (typeof MimeType)[keyof typeof MimeType];
