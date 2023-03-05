import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {IMG} from '../../utils/images';
import {Button, Input, MonthCard, Row} from '../../components';
import {MONTH_LIST} from '../../utils/constant';

const BPJSScreen = () => {
  const [paymentNumber, setPaymentNumber] = React.useState();
  const [inputError, setInputError] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={IMG.headerSmallBg}
          style={styles.topBg}
          resizeMode={'stretch'}
        />
        <View style={styles.logoContainer}>
          <Image
            source={IMG.bpjsLogo}
            style={styles.logo}
            resizeMode={'contain'}
          />
        </View>
      </View>

      <View style={styles.input}>
        <Input
          theme={'material'}
          label={'ID Pelanggan'}
          value={paymentNumber}
          keyboardType={'phone-pad'}
          onChangeText={text => {
            setPaymentNumber(text);
            setInputError('');
          }}
          showClear={paymentNumber}
          error={inputError}
          onClearPress={() => {
            setPaymentNumber();
            setInputError('');
          }}
        />
      </View>
      <Text style={styles.textBayar}>Bayar Sampai</Text>
      <Row style={styles.monthContainer}>
        {MONTH_LIST.map((item, index) => {
          return <MonthCard />;
        })}
      </Row>
      <View style={styles.bottomContainer}>
        <Button title="Lanjut" />
      </View>
    </View>
  );
};

export default BPJSScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    width: '100%',
  },

  topBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  logoContainer: {
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_12,
  },

  logo: {
    height: Scaler.scaleSize(36),
    width: Scaler.scaleSize(36),
    borderRadius: 18,
  },

  input: {
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_14,
    backgroundColor: Colors.COLOR_WHITE,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Size.SIZE_24,
  },

  monthContainer: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Size.SIZE_24,
  },

  // === TEXT
  textBayar: {
    ...Typo.TextNormalBold,
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_14,
  },
});
