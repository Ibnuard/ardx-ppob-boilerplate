import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Heading from '../heading';
import Center from '../center';
import {AuthContext} from '../../context';
import Touchable from '../touchable';
import {useFocusEffect} from '@react-navigation/native';

const PinModalScreen = props => {
  const {navigation, route} = props;

  // ======= CONTEXT FOR AUTH
  const {signIn} = React.useContext(AuthContext);

  //STATE
  const [code, setCode] = React.useState();
  const [pinError, setPinError] = React.useState(false);
  const [delay, setDelay] = React.useState(60);

  // ========== NAV ID / TYPE
  const NAV_ID = route?.params?.id;
  const TYPE = route?.params?.type || props?.type;

  // ========= HANDLE SCREEN TITLE
  const handleTitleById = () => {
    if (NAV_ID == 'LOGIN') {
      return 'Masukan PIN';
    } else if (NAV_ID == 'FORGOT_PIN' || NAV_ID == 'REGISTER_OTP') {
      return 'Masukan OTP';
    } else if (NAV_ID == 'CREATE_NEW_PIN' || NAV_ID == 'REGISTER') {
      return 'Buat PIN';
    } else if (
      NAV_ID == 'CONFIRM_NEW_PIN' ||
      NAV_ID == 'REGISTER_CONFIRM_PIN'
    ) {
      return 'Konfirmasi PIN';
    } else {
      return 'Masukan PIN';
    }
  };

  // ========== ON FULLFILL HANLDER
  const handleOnFilled = code => {
    if (code == '123456') {
      setCode();
      return setPinError(true);
    }

    switch (NAV_ID) {
      case 'LOGIN':
        {
          signIn();
        }
        break;
      case 'FORGOT_PIN':
        {
          setCode();
          navigation.navigate('PinModal', {id: 'CREATE_NEW_PIN', type: 'PIN'});
        }
        break;
      case 'CREATE_NEW_PIN':
        {
          setCode();
          navigation.navigate('PinModal', {id: 'CONFIRM_NEW_PIN', type: 'PIN'});
        }
        break;
      case 'CONFIRM_NEW_PIN':
        {
          setCode();
          navigation.goBack();
        }
        break;
      case 'REGISTER':
        {
          setCode();
          navigation.navigate('PinModal', {
            id: 'REGISTER_CONFIRM_PIN',
            type: 'PIN',
          });
        }
        break;
      case 'REGISTER_CONFIRM_PIN':
        {
          setCode();
          navigation.navigate('PinModal', {
            id: 'REGISTER_OTP',
            type: 'OTP',
          });
        }
        break;
      case 'REGISTER_OTP':
        {
          setCode();
          navigation.popToTop();
        }
        break;

      default:
        {
          props?.onFilled ? props?.onFilled() : null;
        }
        break;
    }
  };

  // ======= HANDLE OTP DELAY
  useFocusEffect(
    React.useCallback(() => {
      if (TYPE == 'OTP') {
        setTimeout(() => {
          if (delay > 0) {
            setDelay(delay - 1);
          }
        }, 1000);
      }
    }, [delay]),
  );

  // ======== RENDER TYPE PIN
  function _renderPIN() {
    return (
      <Center>
        <Heading>{handleTitleById()}</Heading>
        <SmoothPinCodeInput
          autoFocus
          codeLength={6}
          cellSpacing={4}
          cellSize={24}
          placeholder={
            <View
              style={{
                width: Size.SIZE_12,
                height: Size.SIZE_12,
                borderRadius: 25,
                opacity: 0.5,
                backgroundColor: Colors.COLOR_DARK_GRAY,
              }}></View>
          }
          mask={
            <View
              style={{
                width: Size.SIZE_12,
                height: Size.SIZE_12,
                borderRadius: 25,
                backgroundColor: Colors.COLOR_PRIMARY,
              }}></View>
          }
          containerStyle={{
            marginVertical: 24,
          }}
          maskDelay={10}
          password={true}
          cellStyle={null}
          cellStyleFocused={null}
          value={code}
          onTextChange={code => {
            setCode(code);
            setPinError(false);
          }}
          onFulfill={code => handleOnFilled(code)}
        />
        {pinError && (
          <Text style={styles.textError}>PIN yang anda masukan salah</Text>
        )}
        <Touchable
          mt={14}
          onPress={() =>
            navigation.push('PinModal', {
              id: 'FORGOT_PIN',
              type: 'OTP',
            })
          }>
          {NAV_ID == 'LOGIN' && (
            <Text style={styles.textForgotPIN}>Lupa PIN?</Text>
          )}
        </Touchable>
      </Center>
    );
  }

  // ======== RENDER TYPE OTP
  function _renderOTP() {
    return (
      <>
        <Heading>{handleTitleById()}</Heading>
        <Text style={styles.textDescription}>
          Kami telah mengirimkan kode OTP ke{' '}
          <Text style={styles.textNumber}>0857</Text>
        </Text>
        <SmoothPinCodeInput
          autoFocus
          codeLength={6}
          cellSpacing={8}
          cellSize={48}
          containerStyle={{
            marginVertical: 24,
          }}
          cellStyle={{
            borderRadius: 4,
            borderWidth: 2,
            borderColor: Colors.COLOR_DARK_GRAY,
            opacity: 0.5,
          }}
          textStyle={{
            ...Typo.TextMediumBold,
            color: Colors.COLOR_BLACK,
          }}
          maskDelay={10}
          cellStyleFocused={null}
          value={code}
          onTextChange={code => {
            setCode(code);
            setPinError(false);
          }}
          onFulfill={code => handleOnFilled(code)}
        />
        {pinError && (
          <Text style={styles.textError}>OTP yang anda masukan salah</Text>
        )}
        <Touchable mt={14} disabled={delay > 0} onPress={() => setDelay(60)}>
          <Text
            style={[
              styles.textForgotPIN,
              {
                color: delay > 0 ? Colors.COLOR_DARK_GRAY : Colors.COLOR_BLACK,
              },
            ]}>
            Kirim Ulang{delay > 0 ? ` (${delay})` : ''}
          </Text>
        </Touchable>
      </>
    );
  }

  return (
    <View style={styles.container}>
      {TYPE == 'PIN' ? _renderPIN() : _renderOTP()}
    </View>
  );
};

export default PinModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  // =======  text style

  textError: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_RED,
  },

  textForgotPIN: {
    ...Typo.TextNormalBold,
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
