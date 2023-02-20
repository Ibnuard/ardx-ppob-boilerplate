import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Center, Input, Row, Touchable} from '../../components';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {IMG} from '../../utils/images';

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = React.useState();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.bg}>
        <Image
          source={IMG.authBg}
          style={styles.bgImage}
          resizeMode={'stretch'}
        />
      </View>

      <Center flex={1} p={24}>
        <Image source={IMG.logo} style={styles.logo} resizeMode={'contain'} />
        <Input
          placeholder={'Masukan Nomor Telpon'}
          theme={'material'}
          onChangeText={text => setPhone(text)}
          value={phone}
        />
        <View style={styles.loginButton}>
          <Button disabled={!phone} title="Masuk" />
        </View>

        <Row mt={24}>
          <Text style={styles.textDesc}>Belum punya akun?</Text>
          <Touchable mx={4} mt={-4}>
            <Text style={styles.textRegisterButton}>Daftar</Text>
          </Touchable>
        </Row>
      </Center>
    </KeyboardAvoidingView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  logo: {
    width: Scaler.scaleSize(128),
    height: Scaler.scaleSize(128),
  },

  loginButton: {
    width: '100%',
    marginTop: Scaler.scaleSize(32),
  },

  bg: {
    height: height,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'flex-end',
  },

  bgImage: {
    width: '100%',
  },

  // ==== TEXT STYLE

  textDesc: {
    ...Typo.TextNormalRegular,
  },

  textRegisterButton: {
    ...Typo.TextNormalBold,
  },
});

export default LoginScreen;
