export default function getFileType(
  mimeType: string
): 'image' | 'video' | 'other' {
  if (mimeType.startsWith('image/')) {
    return 'image';
  }

  if (mimeType.startsWith('video/')) {
    return 'video';
  }

  return 'other';
}
