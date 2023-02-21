import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Button, Center, Heading, Input, Row, Touchable} from '../../components';

const RegisterScreen = ({navigation}) => {
  const [phone, setPhone] = React.useState();
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();

  return (
    <View style={styles.container}>
      <Heading mb={24}>Daftar</Heading>
      <Input
        label={'Nomor Ponsel'}
        theme={'material'}
        keyboardType={'phone-pad'}
        maxLength={15}
        onChangeText={text => setPhone(text)}
        value={phone}
      />
      <View style={styles.vSpacer} />
      <Input
        label={'Nama Lengkap'}
        theme={'material'}
        maxLength={128}
        onChangeText={text => setName(text)}
        value={name}
      />
      <View style={styles.vSpacer} />
      <Input
        label={'Email'}
        theme={'material'}
        keyboardType={'email-address'}
        maxLength={128}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <View style={styles.vSpacer} />
      <Text style={styles.textTerms}>
        Dengan menekan tombol 'Daftar' berarti anda menyetujui syarat dan
        ketentuan yang berlaku
      </Text>
      <View style={styles.bottomContainer}>
        <Button title="Daftar" />
        <Row mt={24} style={styles.bottomTextButton}>
          <Text style={styles.textDesc}>Sudah Punya Akun?</Text>
          <Touchable mx={4} onPress={() => navigation.goBack()}>
            <Text style={styles.textRegisterButton}>Masuk</Text>
          </Touchable>
        </Row>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  vSpacer: {
    marginBottom: Size.SIZE_8,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  bottomTextButton: {
    justifyContent: 'center',
  },

  // ========== TEXT STYLE

  textTerms: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DESCRIPTION,
  },

  textDesc: {
    ...Typo.TextNormalRegular,
  },

  textRegisterButton: {
    ...Typo.TextNormalBold,
  },
});
