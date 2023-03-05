import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../../styles';
import {Button, Center, Heading, SubHeading} from '../../components';
import {IMG} from '../../utils/images';

const VerifyAccountScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Heading>Verifikasi Akun</Heading>
      <SubHeading>Lengkapi data untuk memverifikasi akun</SubHeading>
      <Center flex={1}>
        <Image source={IMG.boarding.first} />
      </Center>
      <View style={styles.bottomContainer}>
        <Button
          title="Konfirmasi"
          onPress={() => navigation.navigate('VerifyIDCard')}
        />
      </View>
    </View>
  );
};

export default VerifyAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  bottomContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    alignSelf: 'center',
    paddingVertical: Size.SIZE_24,
  },
});
