import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// PICK FROM GALLERY
export const IMAGE_PICK = async () => {
  return await launchImageLibrary({
    includeBase64: true,
    mediaType: 'photo',
    quality: 1,
  });
};

// PICK FROM CAMERA
export const IMAGE_CAPTURE = async (type = 'back') => {
  return await launchCamera({
    cameraType: type,
    includeBase64: true,
    mediaType: 'photo',
    quality: 1,
  });
};
