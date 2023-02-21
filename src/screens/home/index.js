import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {Row, Touchable} from '../../components';
import {Colors, Scaler, Size} from '../../styles';
import {IMG} from '../../utils/images';

const HomeScreen = () => {
  // ========= render header
  function _renderHeader() {
    return (
      <View>
        <Row>
          <Image
            source={{
              uri: 'https://i.ytimg.com/vi/K_7gFTa9tg0/maxresdefault.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={styles.nameContainer}>
            <Text>Hi, Wang Jarim</Text>
            <Text>Silahkan Verifikasi Akun Kamu</Text>
          </View>
        </Row>
      </View>
    );
  }

  // =========== render card balance
  function _renderCardBalance() {
    return (
      <>
        <Image source={IMG.cardBg} resizeMode={'cover'} style={styles.cardBg} />
        <View style={styles.cardContainer}>
          <Row>
            <View>
              <Text>Total Saldo</Text>
              <Text>
                Rp<Text>10.000</Text>
              </Text>
            </View>
          </Row>
          <Row>
            <Touchable style={styles.cardButton}>
              <Image source={IMG.icon.topup} />
              <Text style={styles.textButton}>Topup</Text>
            </Touchable>
          </Row>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {_renderHeader()}
      <ScrollView>{_renderCardBalance()}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_14,
  },

  profileImage: {
    width: Scaler.scaleSize(38),
    height: Scaler.scaleSize(38),
    borderRadius: 24,
  },

  nameContainer: {
    marginHorizontal: Size.SIZE_14,
  },

  cardContainer: {
    padding: Size.SIZE_14,
    borderRadius: 10,
  },

  cardBg: {
    width: '100%',
    position: 'absolute',
    borderRadius: 10,
  },

  cardButton: {
    alignItems: 'center',
  },

  // ======= TEXT STYLE
});

export default HomeScreen;
