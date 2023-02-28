import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Heading, Row, Touchable} from '../../components';
import {Colors, Scaler, Size, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../context';

const ProfileScreen = ({navigation}) => {
  // === CONTEXT
  const {signOut} = React.useContext(AuthContext);

  const MENU = [
    {title: 'Verifikasi Akun', id: 'VerifyAccount'},
    {title: 'Ganti PIN', id: 'ChangePIN'},
    {title: 'Bantuan', id: 'VerifyAccount'},
    {title: 'Syarat dan Ketentuan', id: 'VerifyAccount'},
    {title: 'Keluar', id: 'LOGOUT'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Row>
          <Image
            source={{
              uri: 'https://i.ytimg.com/vi/K_7gFTa9tg0/maxresdefault.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.textName}>WangJA</Text>
            <Text style={styles.textPhone}>0857</Text>
          </View>
          <Touchable>
            <Text style={styles.textEditProfile}>Ubah Profile</Text>
          </Touchable>
        </Row>
      </View>
      <View>
        {MENU.map((item, index) => {
          return (
            <Touchable
              key={index}
              onPress={() => {
                // == CHECK IF NOT SIGN OUT FUNCT
                if (item?.id !== 'LOGOUT') {
                  navigation.navigate(item?.id, {
                    screen: `${item?.id}Init`,
                    params: {},
                  });
                } else {
                  signOut();
                }
              }}>
              <Row style={styles.card}>
                <Text style={styles.textCardTitle}>{item?.title}</Text>
                <Icon name="right" size={16} color={Colors.BLACK_SECONDARY} />
              </Row>
            </Touchable>
          );
        })}
      </View>
      <Text style={styles.textVersion}>App Version 0.1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    paddingHorizontal: Size.SIZE_24,
  },

  profileImage: {
    width: Scaler.scaleSize(54),
    height: Scaler.scaleSize(54),
    borderRadius: 32,
  },

  topContainer: {
    paddingTop: Size.SIZE_8,
    paddingBottom: Size.SIZE_14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.COLOR_LIGHT_GRAY,
  },

  infoContainer: {
    flex: 1,
    paddingHorizontal: Size.SIZE_14,
  },

  card: {
    paddingVertical: Size.SIZE_16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.COLOR_LIGHT_GRAY,
  },

  // ============= TEXT STYLE

  textName: {
    ...Typo.TextNormalBold,
  },

  textPhone: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DESCRIPTION,
  },

  textEditProfile: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_PRIMARY,
  },

  textCardTitle: {
    ...Typo.TextNormalMedium,
    flex: 1,
    color: Colors.BLACK_SECONDARY,
  },

  textVersion: {
    ...Typo.TextExtraSmallBold,
    color: Colors.BLACK_SECONDARY,
    alignSelf: 'center',
    paddingVertical: Size.SIZE_24,
  },
});

export default ProfileScreen;
