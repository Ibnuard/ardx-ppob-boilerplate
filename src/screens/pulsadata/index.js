import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {IMG} from '../../utils/images';
import {
  Card,
  DetailBottomSheet,
  Input,
  PriceCard,
  Row,
  Touchable,
} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {normalizeNumber} from '../../utils/utils';

const PulsaDataScreen = ({navigation, route}) => {
  // === STATE
  const [phone, setPhone] = React.useState();
  const [selectedItem, setSelectedItem] = React.useState();
  const [showInfo, setShowInfo] = React.useState(false);

  //VAR
  const SELECTED_CONTACT = route?.params?.phone ?? '';

  // ==== INITIALIZE TAB-BAR
  const Tab = createMaterialTopTabNavigator();

  // == HANDLE SELECETD CONTACT
  useFocusEffect(
    React.useCallback(() => {
      if (SELECTED_CONTACT.length > 0) {
        const number = normalizeNumber(SELECTED_CONTACT);

        setPhone(number);
      }
    }, [SELECTED_CONTACT]),
  );

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

  // === RENDER LIST
  function _renderListPulsa() {
    return (
      <View style={styles.containerList}>
        <FlatList
          data={EX_PULSA}
          contentContainerStyle={{
            padding: Size.SIZE_8,
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item, index}) => (
            <PriceCard
              item={item}
              onPress={() => {
                setSelectedItem(item);
                setShowInfo(true);
              }}
            />
          )}
        />
      </View>
    );
  }

  // === RENDER LIST
  function _renderListData() {
    return (
      <View style={styles.containerList}>
        <FlatList
          data={EX_PULSA}
          contentContainerStyle={{
            padding: Size.SIZE_8,
          }}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          renderItem={({item, index}) => (
            <PriceCard item={item} useTitle onPress={() => setShowInfo(true)} />
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
            source={{
              uri: 'https://img.tek.id/img/content/2020/04/30/28915/total-pendapatan-indosat-ooredoo-meningkat-dari-tahun-lalu-aXuIhcTpnH.jpg',
            }}
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
          onClearPress={() => setPhone()}
          showContact
          onContactPress={() =>
            navigation.navigate('Contact', {target: 'PulsaDataInit'})
          }
        />
      </View>

      <Tab.Navigator
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
      />
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
});
