import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size} from '../../styles';
import {IMG} from '../../utils/images';
import {DetailBottomSheet, Input, Modal, PriceCard} from '../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {getOperatorNameIcon, normalizeNumber, wait} from '../../utils/utils';

const PulsaDataScreen = ({navigation, route}) => {
  // === STATE
  const [phone, setPhone] = React.useState();
  const [selectedItem, setSelectedItem] = React.useState();
  const [showInfo, setShowInfo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pulsaList, setPulsaList] = React.useState();
  const [dataList, setDataList] = React.useState();

  //VAR
  const SELECTED_CONTACT = route?.params?.phone ?? '';
  const OPERATOR = getOperatorNameIcon(phone);
  const NAV_DATA = route?.params?.data;
  const IS_TRX_CONFIRMED = route?.params?.confirmed;

  console.log(NAV_DATA);

  // ==== INITIALIZE TAB-BAR
  const Tab = createMaterialTopTabNavigator();

  // ==== CALLBACK HANDLER
  const selectItem = React.useCallback(
    item => {
      setSelectedItem({...item, phone: phone});
      setShowInfo(true);
    },
    [selectedItem, phone],
  );

  // == HANDLE SELECETD CONTACT
  useFocusEffect(
    React.useCallback(() => {
      if (SELECTED_CONTACT.length > 0) {
        const number = normalizeNumber(SELECTED_CONTACT);

        setPhone(number);
      }
    }, [SELECTED_CONTACT]),
  );

  // === HANDLE LOAD DATA
  useFocusEffect(
    React.useCallback(() => {
      if (OPERATOR?.name?.length > 0 && !pulsaList && !dataList) {
        setIsLoading(true);
      }

      if (!OPERATOR?.name?.length) {
        setPulsaList();
        setDataList();
      }
    }, [OPERATOR]),
  );

  //===DUMMY API TEST
  React.useEffect(() => {
    if (isLoading) {
      wait(2000)
        .then(() => {
          setPulsaList(EX_PULSA);
          setDataList(EX_DATA);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  // === DUMMY CONFIRMED TRX
  React.useEffect(() => {
    if (IS_TRX_CONFIRMED) {
      wait(2000).then(() => gotoDetail());
    }
  }, [IS_TRX_CONFIRMED]);

  // ========= GOTO DETAIL
  const gotoDetail = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'TransactionDetail',
        },
      ],
    });
  };

  //DUMMY PULSA
  const EX_PULSA = [
    {
      price: 1500,
      nominal: 1000,
    },
    {
      price: 2500,
      nominal: 2000,
    },
    {
      price: 3100,
      nominal: 3000,
    },
    {
      price: 5500,
      nominal: 5000,
    },
    {
      price: 10100,
      nominal: 10000,
    },
    {
      price: 15100,
      nominal: 15000,
    },
    {
      price: 20100,
      nominal: 20000,
    },
    {
      price: 25100,
      nominal: 25000,
    },
    {
      price: 30000,
      nominal: 30000,
    },
    {
      price: 40000,
      nominal: 40000,
    },
    {
      price: 50000,
      nominal: 50000,
    },
  ];

  const EX_DATA = [
    {
      nominal: 'Paket Data 1GB 1 hari',
      price: 1000,
    },
    {
      nominal: 'Paket Data 2GB 1 hari',
      price: 2000,
    },
    {
      nominal: 'Paket Data 3GB 1 hari',
      price: 3000,
    },
    {
      nominal: 'Paket Data 3GB 7 hari',
      price: 5000,
    },
    {
      nominal: 'Paket Data 5GB 7 hari',
      price: 10000,
    },
  ];

  // === RENDER LIST
  function _renderListPulsa() {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.containerList}>
        {OPERATOR?.name?.length > 0 ? (
          <FlatList
            data={pulsaList}
            contentContainerStyle={{
              padding: Size.SIZE_8,
            }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item, index}) => (
              <PriceCard item={item} onPress={() => selectItem(item)} />
            )}
          />
        ) : null}
      </View>
    );
  }

  // === RENDER LIST
  function _renderListData() {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.containerList}>
        {OPERATOR?.name?.length > 0 ? (
          <FlatList
            data={dataList}
            contentContainerStyle={{
              padding: Size.SIZE_8,
            }}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            renderItem={({item, index}) => (
              <PriceCard
                item={item}
                useTitle
                onPress={() => selectItem(item)}
              />
            )}
          />
        ) : null}
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
            source={OPERATOR.icon}
            style={styles.logo}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Input
          theme={'material'}
          label={'Nomor Ponsel'}
          value={phone}
          onChangeText={text => setPhone(text)}
          showClear={phone}
          onClearPress={() => {
            setPhone();
            setIsLoading(false);
            setPulsaList();
            setDataList();
          }}
          showContact
          onContactPress={() =>
            navigation.navigate('Contact', {target: 'PulsaDataInit'})
          }
        />
      </View>

      <Tab.Navigator
        initialRouteName={NAV_DATA?.type}
        screenOptions={{
          tabBarActiveTintColor: Colors.COLOR_PRIMARY,
          tabBarInactiveTintColor: Colors.COLOR_DESCRIPTION,
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Bold',
            textTransform: 'none',
          },

          tabBarPressColor: 'transparent',
          tabBarIndicatorStyle: {
            backgroundColor: Colors.COLOR_PRIMARY,
          },
        }}>
        <Tab.Screen
          name="Pulsa"
          component={_renderListPulsa}
          options={{
            title: 'Pulsa',
          }}
        />
        <Tab.Screen
          name="PaketData"
          component={_renderListData}
          options={{
            title: 'Paket Data',
          }}
        />
      </Tab.Navigator>
      <DetailBottomSheet
        visible={showInfo}
        data={selectedItem}
        onCancelButtonPress={() => setShowInfo(false)}
        onConfirmButtonPress={() => {
          setShowInfo(false);
          wait(1000).then(() => {
            navigation.navigate('PinModal', {
              id: 'TRANSACTION',
              target: 'PulsaDataInit',
              type: 'PIN',
            });
          });
        }}
      />
      <Modal type={'loading'} visible={IS_TRX_CONFIRMED} />
    </View>
  );
};

export default PulsaDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  containerList: {
    flex: 1,
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Size.SIZE_24,
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

  topContainer: {
    width: '100%',
  },

  contactButton: {
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.COLOR_DESCRIPTION,
    paddingHorizontal: Size.SIZE_8,
    paddingVertical: Size.SIZE_16,
    marginLeft: Size.SIZE_12,
  },

  input: {
    paddingHorizontal: Size.SIZE_24,
  },

  loadingContainer: {
    padding: Size.SIZE_24,
  },
});
