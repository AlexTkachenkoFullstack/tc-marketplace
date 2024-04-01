export function extractPhotoName(photoUrl: string) {
    if(photoUrl === ''){
        return ''
    }
  let index = photoUrl.lastIndexOf('_');
  if (index === -1) {
    return null;
  }
  let desiredPart = photoUrl.substring(index + 1);
  let jpgIndex = desiredPart.indexOf('.jpg');
  if (jpgIndex !== -1) {
    desiredPart = desiredPart.substring(0, jpgIndex + 4);
  }
  return desiredPart;
}