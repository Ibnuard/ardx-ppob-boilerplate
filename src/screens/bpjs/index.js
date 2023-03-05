import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {IMG} from '../../utils/images';
import {
  Button,
  DetailBottomSheet,
  Input,
  Modal,
  MonthCard,
  Row,
} from '../../components';
import {MINIMUM_NUMBER, MONTH_LIST, PRODUCT_TYPE} from '../../utils/constant';
import {GET_CURRENT_MONTH_BY_CURRENT, wait} from '../../utils/utils';
import {GET_CURRENT_DATETIME} from '../../utils/moment';

const BPJSScreen = ({navigation, route}) => {
  const [paymentNumber, setPaymentNumber] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [paymentDetails, setPaymentDetails] = React.useState();
  const [showInfo, setShowInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  // == PARAMS
  const IS_TRX_CONFIRMED = route?.params?.confirmed;

  // GENERATE DYNAMIC MONTH AND YEAR
  const MONTHS = GET_CURRENT_MONTH_BY_CURRENT();

  //  == CHECK CLIENT NUMBER
  const checkClientNumber = index => {
    if (paymentNumber?.length < MINIMUM_NUMBER.BPJS) {
      setInputError('Nomor pelanggan minimal 10 karakter');
    } else {
      if (String(index).length > 0) {
        selectMonth(index);
      }
    }
  };

  // PREVENT RE-RENDER ON SELECTED MONTH
  const selectMonth = React.useCallback(
    index => {
      setSelectedIndex(index);
    },
    [selectedIndex],
  );

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
    if (paymentNumber == '1234123412') {
      setIsLoading(false);
      setInputError('Tagihan sudah dibayar');
    } else if (paymentNumber == '12345678901') {
      const PERIOD = `${MONTHS[1].prefix} - ${MONTHS[selectedIndex].prefix} ${MONTHS[0].year}`;
      const testPayment = {
        type: PRODUCT_TYPE.BPJS,
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
          onBlur={() => checkClientNumber()}
          onChangeText={text => {
            setPaymentNumber(text);
            setInputError('');
            setSelectedIndex();
          }}
          showClear={paymentNumber}
          error={inputError}
          onClearPress={() => {
            setPaymentNumber('');
            setInputError('');
            setSelectedIndex();
          }}
        />
      </View>
      <Text style={styles.textBayar}>Bayar Sampai</Text>
      <Row style={styles.monthContainer}>
        {MONTHS.map((item, index) => {
          return (
            <MonthCard
              data={item}
              key={index}
              active={selectedIndex >= index}
              onPress={() => checkClientNumber(index)}
            />
          );
        })}
      </Row>
      <View style={styles.bottomContainer}>
        <Button
          title="Lanjut"
          isLoading={isLoading}
          disabled={
            paymentNumber?.length < MINIMUM_NUMBER.BPJS || selectedIndex == null
          }
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
              target: 'BPJSInit',
              type: 'PIN',
            });
          });
        }}
      />
      <Modal type={'loading'} visible={modalLoading} />
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
