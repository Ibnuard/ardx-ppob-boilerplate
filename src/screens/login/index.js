import {useFocusEffect} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Center, Input, Modal, Row, Touchable} from '../../components';
import {AuthContext} from '../../context';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {IMG} from '../../utils/images';
import {USER_TEST} from '../../utils/test';
import {normalizeNumber, wait} from '../../utils/utils';

const LoginScreen = ({navigation, route}) => {
  const [phone, setPhone] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputError, setInputError] = React.useState('');

  // === context
  const {signIn} = React.useContext(AuthContext);

  // === GET PIN CALLBACK
  const PIN_CALLBACK = route?.params?.pin;

  // === TEST DATA
  const USER_DATA = USER_TEST;

  // === ON PIN CALLBACK
  useFocusEffect(
    React.useCallback(() => {
      if (PIN_CALLBACK?.length) {
        onLogin();
      }

      return () => null;
    }, [PIN_CALLBACK]),
  );

  // === on login press
  const onLogin = () => {
    setIsLoading(true);

    const phoneNumber = normalizeNumber(phone);
    const testUserPhone = normalizeNumber(USER_DATA?.phone);

    if (phoneNumber !== testUserPhone) {
      wait(2000).then(() => {
        setIsLoading(false);
        setInputError('User tidak ditemukan');
      });
    } else {
      if (String(PIN_CALLBACK) == String(USER_DATA?.pin)) {
        wait(2000).then(() => {
          signIn();
        });
      } else {
        wait(2000).then(() => {
          setIsLoading(false);
          setInputError('User tidak ditemukan');
        });
      }
    }
  };

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

      <View style={styles.centerContainer}>
        <Image source={IMG.logo} style={styles.logo} resizeMode={'contain'} />
        <Input
          placeholder={'Masukan Nomor Telpon'}
          theme={'material'}
          keyboardType={'phone-pad'}
          error={inputError}
          onChangeText={text => {
            setPhone(text);
            setInputError('');
          }}
          value={phone}
        />
        <View style={styles.loginButton}>
          <Button
            disabled={!phone}
            title="Masuk"
            onPress={() =>
              navigation.navigate('PinModal', {
                id: 'LOGIN',
                type: 'PIN',
                target: 'SignIn',
              })
            }
          />
        </View>

        <Row mt={24}>
          <Text style={styles.textDesc}>Belum punya akun?</Text>
          <Touchable mx={4} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.textRegisterButton}>Daftar</Text>
          </Touchable>
        </Row>
      </View>
      <Modal visible={isLoading} type={'loading'} />
    </KeyboardAvoidingView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    justifyContent: 'center',
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

  centerContainer: {
    flex: 0.8,
    alignItems: 'center',
    padding: Size.SIZE_24,
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
