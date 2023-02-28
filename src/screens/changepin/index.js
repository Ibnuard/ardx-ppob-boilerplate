import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../../styles';
import {Button, Center, Heading, SubHeading} from '../../components';
import {IMG} from '../../utils/images';

const ChangePINScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Heading>Ganti PIN</Heading>
      <SubHeading>Tekan konfirmasi untuk melanjutkan</SubHeading>
      <Center flex={1}>
        <Image source={IMG.boarding.first} />
      </Center>
      <Button
        title="Konfirmasi"
        onPress={() =>
          navigation.navigate('PinModal', {
            id: 'CHANGE_PIN',
            type: 'OTP',
          })
        }
      />
    </View>
  );
};

export default ChangePINScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },
});
