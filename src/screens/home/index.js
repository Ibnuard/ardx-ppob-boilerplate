import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import {Row, Touchable} from '../../components';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {IMG} from '../../utils/images';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  //const DIM
  const {width} = Dimensions.get('window');

  //service icon static
  const SERVICES_BUTTON = [
    {
      title: 'Pulsa',
      icon: IMG.services.pulsa,
    },
    {
      title: 'Data',
      icon: IMG.services.data,
    },
    {
      title: 'Pln',
      icon: IMG.services.pln,
    },
    {
      title: 'BPJS',
      icon: IMG.services.bpjs,
    },
    {
      title: 'PDAM',
      icon: IMG.services.pdam,
    },
    {
      title: 'Games',
      icon: IMG.services.games,
    },
  ];

  // ========= render header
  function _renderHeader() {
    return (
      <View style={styles.header}>
        <Row>
          <Row flex={1}>
            <Image
              source={{
                uri: 'https://i.ytimg.com/vi/K_7gFTa9tg0/maxresdefault.jpg',
              }}
              style={styles.profileImage}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.textName}>Hi, Wang Jarim</Text>
            </View>
          </Row>

          <Touchable style={styles.notifButton}>
            <Icon
              name="md-notifications-outline"
              size={20}
              color={Colors.COLOR_BLACK}
            />
          </Touchable>
        </Row>
      </View>
    );
  }

  // =========== render card balance
  function _renderCardBalance() {
    return (
      <View style={[styles.topCardContainer]}>
        <Image source={IMG.cardBg} resizeMode={'cover'} style={styles.cardBg} />
        <View style={styles.cardContainer}>
          <Row>
            <View>
              <Text style={styles.textBalanceCaption}>Total Saldo</Text>
              <Row>
                <Text style={styles.textRp}>Rp</Text>
                <Text style={styles.textRupiah}>10.000</Text>
              </Row>
            </View>
          </Row>
          <Row mt={24}>
            <Touchable style={styles.cardButton}>
              <Image
                source={IMG.icon.topup}
                style={styles.iconButton}
                resizeMode={'contain'}
              />
              <Text style={styles.textButton}>Top up</Text>
            </Touchable>
            <Touchable style={styles.cardButton}>
              <Image
                source={IMG.icon.pay}
                style={styles.iconButton}
                resizeMode={'contain'}
              />
              <Text style={styles.textButton}>Pay</Text>
            </Touchable>
            <Touchable style={styles.cardButton}>
              <Image
                source={IMG.icon.send}
                style={styles.iconButton}
                resizeMode={'contain'}
              />
              <Text style={styles.textButton}>Send</Text>
            </Touchable>
            <Touchable style={styles.cardButton}>
              <Image
                source={IMG.icon.request}
                style={styles.iconButton}
                resizeMode={'contain'}
              />
              <Text style={styles.textButton}>Request</Text>
            </Touchable>
          </Row>
        </View>
      </View>
    );
  }

  // ============ RENDER SERVICE
  function _renderService() {
    return (
      <View style={styles.service}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Row mt={14} style={{flexWrap: 'wrap'}}>
            {SERVICES_BUTTON.map((item, index) => {
              return (
                <Touchable
                  mv={14}
                  itemCenter
                  style={{
                    width: '33%',
                  }}
                  key={index}>
                  <Image
                    source={item.icon}
                    style={styles.iconService}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.textService}>{item.title}</Text>
                </Touchable>
              );
            })}
          </Row>
          <View style={styles.spacer} />
          <GestureHandlerRootView style={styles.slideContainer}>
            <Carousel
              loop
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              width={width}
              height={width / 2}
              autoPlay={true}
              data={[...new Array(6).keys()]}
              scrollAnimationDuration={1000}
              snapEnabled={true}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              renderItem={({index}) => (
                <Touchable flex={1}>
                  <Image
                    source={{
                      uri: 'https://d2h87rbqc48mm2.cloudfront.net/ir/img/Examples-of-Promotional-Words-Collections.jpg',
                    }}
                    style={styles.promoImage}
                  />
                </Touchable>
              )}
            />
          </GestureHandlerRootView>
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
      <StatusBar backgroundColor={Colors.COLOR_SECONDARY} />
      {_renderHeader()}
      {_renderCardBalance()}
      {_renderService()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_SECONDARY,
  },

  header: {
    marginHorizontal: Size.SIZE_24,
    marginTop: Size.SIZE_14,
  },

  profileImage: {
    width: Scaler.scaleSize(28),
    height: Scaler.scaleSize(28),
    borderRadius: 24,
  },

  nameContainer: {
    marginHorizontal: Size.SIZE_14,
    justifyContent: 'center',
  },

  cardContainer: {
    padding: Size.SIZE_14,
    borderRadius: 10,
  },

  cardBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
  },

  cardButton: {
    flex: 1,
    alignItems: 'center',
  },

  iconButton: {
    height: Size.SIZE_18,
    width: Size.SIZE_18,
    marginBottom: 8,
  },

  topCardContainer: {
    marginTop: Size.SIZE_14,
    marginHorizontal: Size.SIZE_24,
    overflow: 'hidden',
  },

  service: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    marginTop: Size.SIZE_14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  notifButton: {
    backgroundColor: Colors.COLOR_DARK_BACKGROUND,
    width: Scaler.scaleSize(28),
    height: Scaler.scaleSize(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },

  scrollContainer: {
    paddingBottom: Scaler.scaleSize(20),
  },

  slideContainer: {
    marginTop: Size.SIZE_14,
  },

  promoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  spacer: {
    width: '100%',
    height: Size.SIZE_8,
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
    marginVertical: Size.SIZE_8,
  },

  // ======= TEXT STYLE

  textName: {
    ...Typo.TextSmallMedium,
  },

  textActivateAcc: {
    ...Typo.TextExtraSmallRegular,
    color: Colors.COLOR_DESCRIPTION,
  },

  textBalanceCaption: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_WHITE,
  },

  textRp: {
    ...Typo.TextSmallMedium,
    color: Colors.COLOR_WHITE,
  },

  textRupiah: {
    ...Typo.TextMediumMedium,
    color: Colors.COLOR_WHITE,
    marginBottom: -5,
    marginHorizontal: 4,
  },

  textButton: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_WHITE,
  },

  textService: {
    ...Typo.TextSmallRegular,
    marginTop: Size.SIZE_12,
  },
});

export default HomeScreen;
