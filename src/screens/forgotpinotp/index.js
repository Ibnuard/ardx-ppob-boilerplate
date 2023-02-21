import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Heading} from '../../components';

const ForgotPinOTPScreen = () => {
  return (
    <View style={styles.container}>
      <Heading>Masukan OTP</Heading>
      <Text style={styles.textDescription}>
        Kami telah mengirim OTP ke <Text style={styles.textNumber}>0857</Text>
      </Text>
    </View>
  );
};

export default ForgotPinOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.SIZE_24,
    backgroundColor: Colors.COLOR_WHITE,
  },

  // =========  TEXT STYLE

  textDescription: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DESCRIPTION,
  },

  textNumber: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_BLACK,
  },
});
