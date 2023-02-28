import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomSheet from '../bottomsheet';
import {Colors, Size, Typo} from '../../styles';
import Heading from '../heading';
import Row from '../row';
import Button from '../button';
import Touchable from '../touchable';
import {formatRupiah} from '../../utils/utils';

const DetailBottomSheet = ({
  visible,
  data,
  onBackPress,
  onCancelButtonPress,
  onConfirmButtonPress,
}) => {
  const PARSE_DATA = [
    {
      title: 'Nomor',
      value: data?.phone,
    },
    {
      title: 'Nominal',
      value: formatRupiah(data?.nominal, false),
    },
    {
      title: 'Deskripsi',
      value: data?.detail ?? '-',
    },
  ];

  return (
    <BottomSheet
      visible={visible}
      flex={1}
      maxH={'62%'}
      onBackButtonPress={onBackPress}>
      <View style={styles.container}>
        <Text style={styles.textHeader}>Informasi Pelanggan</Text>
        {PARSE_DATA.map((item, index) => {
          return (
            <Row mt={8} key={index}>
              <Text style={styles.textTitle}>{item?.title}</Text>
              <Text style={styles.textValue}>{item?.value}</Text>
            </Row>
          );
        })}
        <View style={styles.spacer} />
        <Text style={styles.textHeader}>Detail Pembayaran</Text>
        <Row mt={8}>
          <Text style={styles.textTitle}>Harga</Text>
          <Text style={styles.textValue}>{formatRupiah(data?.price)}</Text>
        </Row>
        <Row mt={8}>
          <Text style={styles.textTitle}>Biaya Transaksi</Text>
          <Text style={styles.textValue}>Rp 0</Text>
        </Row>
        <Row mt={8}>
          <Text style={styles.textTitle}>Total</Text>
          <Text style={styles.textValue}>{formatRupiah(data?.price)}</Text>
        </Row>
        <View style={styles.bottomContainer}>
          <Row>
            <Touchable
              style={styles.buttonInvert}
              onPress={onCancelButtonPress}>
              <Text style={styles.textButtonInvert}>Batal</Text>
            </Touchable>
            <Touchable style={styles.button} onPress={onConfirmButtonPress}>
              <Text style={styles.textButton}>Lanjut</Text>
            </Touchable>
          </Row>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.SIZE_24,
  },

  spacer: {
    marginTop: Size.SIZE_24,
  },

  button: {
    flex: 1,
    backgroundColor: Colors.COLOR_PRIMARY,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 4,
  },

  buttonInvert: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    borderWidth: 1,
    borderColor: Colors.COLOR_PRIMARY,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 4,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // === TEXT STYLE
  textHeader: {
    ...Typo.TextMediumBold,
  },

  textTitle: {
    ...Typo.TextNormalRegular,
    flex: 1,
    textAlign: 'left',
    opacity: 0.6,
  },

  textValue: {
    ...Typo.TextNormalRegular,
    flex: 1,
    textAlign: 'right',
    opacity: 0.6,
  },

  textButtonInvert: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_PRIMARY,
  },

  textButton: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_WHITE,
  },
});

export default DetailBottomSheet;
