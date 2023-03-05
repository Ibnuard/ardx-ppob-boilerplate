import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {formatRupiah} from '../../utils/utils';
import Touchable from '../touchable';

export default function MonthCard({data, active, onPress}) {
  return (
    <Touchable
      style={active ? styles.containerActive : styles.container}
      onPress={onPress}>
      <View>
        <Text
          style={styles.textNominal}>{`${data?.prefix} ${data?.year}`}</Text>
      </View>
    </Touchable>
  );
}

const {width, heigth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 4,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_8,
    borderRadius: 10,
    margin: Size.SIZE_8,
  },

  containerActive: {
    width: width / 4,
    backgroundColor: Colors.COLOR_PRIMARY_30,
    padding: Size.SIZE_8,
    borderRadius: 10,
    margin: Size.SIZE_8,
  },

  // === TEXT

  textNominal: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_BLACK,
  },

  textDesc: {
    ...Typo.TextExtraSmallRegular,
    color: Colors.BLACK_SECONDARY,
  },

  textPrice: {
    ...Typo.TextSmallBold,
  },
});
