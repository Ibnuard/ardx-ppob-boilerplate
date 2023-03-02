import {Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {useFocusEffect} from '@react-navigation/native';
import {IMAGE_CAPTURE, IMAGE_PICK} from '../../utils/imagePicker';
import {Button, Center} from '../../components';
import RNTextDetector from 'rn-text-detector';
import {BASE64_PREFIX} from '../../utils/constant';

const VerifySelfieScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = React.useState();
  const [recognizeText, setRecognizeText] = React.useState();

  // === DETECT IF IMAGE ALREADY PICKED
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (selectedImage) {
  //       parseTextFromImage()
  //     }
  //   }, [selectedImage]),
  // );

  // === CHECK IF HAS PERMISSION
  const checkPermisison = async () => {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (!check) {
      requestCameraPermission();
    } else {
      captureIDCard();
    }

    console.log(check);
  };

  //===== REQUEST CONTACT PERMISSION
  const requestCameraPermission = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Camera',
      message: 'This app would like to use your camera.',
      buttonPositive: 'OK',
    })
      .then(res => {
        if (res !== 'denied') {
          captureIDCard();
        }
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  };

  // ==== CAPTURE ID CARD USING CAM
  const captureIDCard = async () => {
    const result = await IMAGE_CAPTURE('front');

    console.log(result);

    if (result) {
      setSelectedImage(result?.assets[0]);
    }
  };

  // === PARSE TEXT DATA FROM PHOTO
  const parseTextFromPhoto = async () => {
    const file = selectedImage?.uri;

    const textReco = await RNTextDetector.detectFromUri(file);

    console.log(textReco);
  };

  // ========= GOTO DETAIL
  const gotoDone = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'VerifyDone',
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Center flex={1}>
        {selectedImage?.base64 ? (
          <>
            <Image
              source={{uri: BASE64_PREFIX + selectedImage?.base64}}
              style={styles.idcardImage}
              resizeMode={'contain'}
            />
            <Text style={styles.textInfo}>
              Pastikan foto selfie dan KTP terlihat jelas dan tidak buram
            </Text>
            <Button
              mb={14}
              invert
              title="Ulangi Foto"
              onPress={() => captureIDCard()}
            />
          </>
        ) : null}

        <Button
          title={
            selectedImage?.base64 ? 'Upload Data' : 'Ambil foto Selfie & KTP'
          }
          onPress={() =>
            selectedImage?.base64 ? gotoDone() : checkPermisison()
          }
        />
      </Center>
    </View>
  );
};

export default VerifySelfieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  idcardImage: {
    width: '100%',
    height: '50%',
  },

  // === TEXT

  textInfo: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DESCRIPTION,
    marginVertical: Size.SIZE_14,
    textAlign: 'center',
  },
});
