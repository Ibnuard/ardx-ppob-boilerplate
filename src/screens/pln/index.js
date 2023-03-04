import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Row, Touchable} from '../../components';
import {Colors, Size, Typo} from '../../styles';
import {IMG} from '../../utils/images';
import Icon from 'react-native-vector-icons/AntDesign';

const PlnScreen = ({navigation}) => {
  const TYPE = [
    {
      title: 'Token Listrik',
      id: 'PLNToken',
    },
    {
      title: 'Tagihan Listrik',
      id: 'PLNTagihan',
    },
  ];

  return (
    <View style={styles.container}>
      {TYPE.map((item, index) => {
        return (
          <Touchable
            key={index}
            style={styles.cardButton}
            onPress={() => navigation.navigate(item?.id)}>
            <Row>
              <Row flex={1}>
                <Image
                  source={IMG.plnLogo}
                  style={styles.plnLogo}
                  resizeMode={'contain'}
                />
                <Text style={styles.textTitle}>{item.title}</Text>
              </Row>
              <Icon name="right" color={Colors.COLOR_BLACK} size={14} />
            </Row>
          </Touchable>
        );
      })}
    </View>
  );
};

export default PlnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cardButton: {
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_14,
  },

  plnLogo: {
    width: Size.SIZE_24 + 8,
    height: Size.SIZE_24 + 8,
    borderRadius: 16,
    marginRight: Size.SIZE_14,
  },

  // == TEXT

  textTitle: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_BLACK,
  },
});
