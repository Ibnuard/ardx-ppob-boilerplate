import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {formatRupiah} from '../../utils/utils';
import Touchable from '../touchable';

export default function PriceCard({item, useTitle, onPress}) {
  return (
    <View style={{flex: 0.5}}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.textNominal}>
            {useTitle ? item?.nominal : formatRupiah(item?.nominal, false)}
          </Text>
          <View>
            <Text style={styles.textDesc}>Harga</Text>
            <Text style={styles.textPrice}>{formatRupiah(item?.price)}</Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_8,
    borderRadius: 10,
    margin: 4,
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
