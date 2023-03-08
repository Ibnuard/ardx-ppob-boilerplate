import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size} from '../../styles';
import {IMG} from '../../utils/images';
import {
  Button,
  DetailBottomSheet,
  Input,
  Modal,
  Touchable,
} from '../../components';
import {MINIMUM_NUMBER, PRODUCT_TYPE} from '../../utils/constant';
import {wait} from '../../utils/utils';
import {GET_CURRENT_DATETIME} from '../../utils/moment';

const PDAMScreen = ({navigation, route}) => {
  const [paymentNumber, setPaymentNumber] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [paymentDetails, setPaymentDetails] = React.useState();
  const [showInfo, setShowInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  // == PARAMS
  const IS_TRX_CONFIRMED = route?.params?.confirmed;
  const SELECTED_REGION = route?.params?.region;

  //  == CHECK CLIENT NUMBER
  const checkClientNumber = () => {
    if (paymentNumber?.length < MINIMUM_NUMBER.PDAM) {
      setInputError('Nomor pelanggan minimal 10 karakter');
    }
  };

  // ==== CALLBACK HANDLER
  const paymentItem = React.useCallback(
    item => {
      setPaymentDetails(item);
      setShowInfo(true);
    },
    [paymentDetails, paymentNumber],
  );

  // == on continue pressed
  const onContinuePressed = () => {
    setIsLoading(true);
    // == dummy test
    if (paymentNumber == '123412341234') {
      setIsLoading(false);
      setInputError('Tagihan sudah dibayar');
    } else if (paymentNumber == '12345678901') {
      const PERIOD = `MAR 2023`;
      const testPayment = {
        type: PRODUCT_TYPE.PDAM,
        number: paymentNumber,
        price: 128000,
        clientName: 'Wang Ja',
        periode: PERIOD,
        adminFee: 2500,
      };

      setIsLoading(false);
      paymentItem(testPayment);
    } else {
      setIsLoading(false);
      setInputError('Nomor meter tidak ditemukan');
    }
  };

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
            source={IMG.pdamLogo}
            style={styles.logo}
            resizeMode={'contain'}
          />
        </View>
      </View>

      <View style={styles.input}>
        <Touchable
          onPress={() =>
            navigation.navigate('PDAMRegion', {target: 'PDAMInit'})
          }>
          <Input
            editable={false}
            theme={'material'}
            label={'Pilih Lokasi'}
            value={SELECTED_REGION?.name}
          />
        </Touchable>

        <Input
          theme={'material'}
          label={'ID Pelanggan'}
          value={paymentNumber}
          keyboardType={'phone-pad'}
          onBlur={() => checkClientNumber()}
          onChangeText={text => {
            setPaymentNumber(text);
            setInputError('');
          }}
          showClear={paymentNumber}
          error={inputError}
          onClearPress={() => {
            setPaymentNumber('');
            setInputError('');
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          disabled={
            !SELECTED_REGION ||
            !paymentNumber?.length ||
            paymentNumber.length < MINIMUM_NUMBER.PDAM
          }
          isLoading={isLoading}
          title="Lanjut"
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
              target: 'PDAMInit',
              type: 'PIN',
            });
          });
        }}
      />
      <Modal type={'loading'} visible={modalLoading} />
    </View>
  );
};

export default PDAMScreen;

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
