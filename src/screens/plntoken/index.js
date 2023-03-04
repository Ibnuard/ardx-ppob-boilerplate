import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {IMG} from '../../utils/images';
import {DetailBottomSheet, Input, Modal, PriceCard} from '../../components';
import {Colors, Scaler, Size} from '../../styles';
import {wait} from '../../utils/utils';
import {MINIMUM_NUMBER} from '../../utils/constant';
import {GET_CURRENT_DATETIME} from '../../utils/moment';

const PlnTokenScreen = ({navigation, route}) => {
  // === State
  const [meterNumber, setMeterNumber] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const [showInfo, setShowInfo] = React.useState(false);
  const [inputError, setInputError] = React.useState('');

  // == PARAMS
  const IS_TRX_CONFIRMED = route?.params?.confirmed;

  // === DUMMY
  const EX_PLN = [
    {
      price: 22000,
      nominal: 20000,
      name: 'PLN Token 20K',
    },
    {
      price: 52000,
      nominal: 50000,
      name: 'PLN Token 50K',
    },
    {
      price: 102000,
      nominal: 100000,
      name: 'PLN Token 100K',
    },
    {
      price: 202000,
      nominal: 200000,
      name: 'PLN Token 200K',
    },
    {
      price: 502000,
      nominal: 500000,
      name: 'PLN Token 500k',
    },
    {
      price: 1000000,
      nominal: 1000000,
      name: 'PLN Token 1000K',
    },
  ];

  // == CHECK CLIENT NUMBER
  const checkClientNumber = item => {
    if (String(meterNumber)?.length < MINIMUM_NUMBER.PLN_TOKEN) {
      setInputError('Nomor meter minimal 10 karakter');
    } else {
      if (meterNumber !== '1234567890') {
        setInputError('Nomor meter tidak ditemukan');
      } else {
        selectItem(item);
      }
    }
  };

  // ==== CALLBACK HANDLER
  const selectItem = React.useCallback(
    item => {
      setSelectedItem({...item, number: meterNumber});
      setShowInfo(true);
    },
    [selectedItem, meterNumber],
  );

  // === DUMMY CONFIRMED TRX
  React.useEffect(() => {
    if (IS_TRX_CONFIRMED) {
      setIsLoading(true);
      wait(2000).then(() => gotoDetail());
    }
  }, [IS_TRX_CONFIRMED]);

  // === SAMPLE RESPONSE
  const SAMPLE_RESPONSE = {
    ...selectedItem,
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

  // === RENDER LIST
  function _renderListPulsa() {
    return (
      <View style={styles.containerList}>
        <FlatList
          data={EX_PLN}
          contentContainerStyle={{
            padding: Size.SIZE_8,
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item, index}) => (
            <PriceCard item={item} onPress={() => checkClientNumber(item)} />
          )}
        />
      </View>
    );
  }

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
      {_renderListPulsa()}
      <DetailBottomSheet
        visible={showInfo}
        data={selectedItem}
        onCancelButtonPress={() => setShowInfo(false)}
        onConfirmButtonPress={() => {
          setShowInfo(false);
          wait(1000).then(() => {
            navigation.navigate('PinModal', {
              id: 'TRANSACTION',
              target: 'PLNToken',
              type: 'PIN',
            });
          });
        }}
      />
      <Modal type={'loading'} visible={isLoading} />
    </View>
  );
};

export default PlnTokenScreen;

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

  loadingContainer: {
    padding: Size.SIZE_24,
  },

  containerList: {
    flex: 1,
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },
});
