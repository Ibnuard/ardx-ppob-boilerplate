import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size} from '../../styles';
import {IMG} from '../../utils/images';
import {Button, DetailBottomSheet, Input, Modal} from '../../components';
import {wait} from '../../utils/utils';
import {MINIMUM_NUMBER, PRODUCT_TYPE} from '../../utils/constant';
import {GET_CURRENT_DATETIME} from '../../utils/moment';

const PlnTagihanScreen = ({navigation, route}) => {
  // ==STATE
  const [meterNumber, setMeterNumber] = React.useState();
  const [inputError, setInputError] = React.useState('');
  const [showInfo, setShowInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);
  const [paymentDetails, setPaymentDetails] = React.useState();

  // == PARAMS
  const IS_TRX_CONFIRMED = route?.params?.confirmed;

  // === ON CONTINUE
  const onContinuePressed = () => {
    setIsLoading(true);

    // == dummy test
    if (meterNumber == '123412341234') {
      setIsLoading(false);
      setInputError('Tagihan sudah dibayar');
    } else if (meterNumber == '123456789001') {
      const testPayment = {
        type: PRODUCT_TYPE.PLN_TAGIHAN,
        number: meterNumber,
        price: 125000,
        clientName: 'Wang Ja',
        periode: 'Maret 2023',
        adminFee: 2500,
      };

      setIsLoading(false);
      paymentItem(testPayment);
    } else {
      setIsLoading(false);
      setInputError('Nomor meter tidak ditemukan');
    }
  };

  // ==== CALLBACK HANDLER
  const paymentItem = React.useCallback(
    item => {
      setPaymentDetails(item);
      setShowInfo(true);
    },
    [paymentDetails, meterNumber],
  );

  // === DUMMY CONFIRMED TRX
  React.useEffect(() => {
    if (IS_TRX_CONFIRMED) {
      setModalLoading(true);
      wait(2000).then(() => gotoDetail());
    }
  }, [IS_TRX_CONFIRMED]);

  // === SAMPLE RESPONSE
  const SAMPLE_RESPONSE = {
    ...paymentDetails,
    createdDate: GET_CURRENT_DATETIME(),
    sn: '0980-5780-8979-4608',
    status: 'success',
    trxId: 'TRX5646',
  };

  // ========= GOTO DETAIL
  const gotoDetail = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'TransactionDetail',
          params: {
            data: SAMPLE_RESPONSE,
          },
        },
      ],
    });
  };

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
            source={IMG.plnLogo}
            style={styles.logo}
            resizeMode={'contain'}
          />
        </View>
      </View>

      <View style={styles.input}>
        <Input
          theme={'material'}
          label={'Nomor Meter'}
          value={meterNumber}
          keyboardType={'phone-pad'}
          onChangeText={text => {
            setMeterNumber(text);
            setInputError('');
          }}
          showClear={meterNumber}
          error={inputError}
          onClearPress={() => {
            setMeterNumber();
            setInputError('');
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          disabled={
            !meterNumber || meterNumber?.length < MINIMUM_NUMBER.PLN_TAGIHAN
          }
          title="Lanjut"
          isLoading={isLoading}
          onPress={() => onContinuePressed()}
        />
      </View>
      <DetailBottomSheet
        visible={showInfo}
        data={paymentDetails}
        onCancelButtonPress={() => setShowInfo(false)}
        onConfirmButtonPress={() => {
          setIsLoading(true);
          setShowInfo(false);
          wait(1000).then(() => {
            navigation.navigate('PinModal', {
              id: 'TRANSACTION',
              target: 'PLNTagihan',
              type: 'PIN',
            });
          });
        }}
      />
      <Modal type={'loading'} visible={modalLoading} />
    </View>
  );
};

export default PlnTagihanScreen;

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
});
