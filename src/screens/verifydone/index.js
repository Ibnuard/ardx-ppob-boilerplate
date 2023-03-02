import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../../styles';
import {Button, Center, Heading, SubHeading} from '../../components';
import {IMG} from '../../utils/images';

const VerifyDoneScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Heading>Berhasil Upload Data</Heading>
      <SubHeading>
        Silahkan menunggu 2x24 jam untuk proses verifikasi
      </SubHeading>
      <Center flex={1}>
        <Image source={IMG.boarding.first} />
      </Center>
      <Button title="Selesai" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default VerifyDoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },
});
