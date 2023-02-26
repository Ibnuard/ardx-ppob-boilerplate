import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {Button, Heading, Row} from '../../components';

export default function TransactionDetailScreen({navigation}) {
  // ========== DETAILS
  const DETAIL_ITEM = [
    {
      title: 'Status',
      value: 'Sukses',
    },
    {
      title: 'Tanggal',
      value: '23 Feb 2023',
    },
    {
      title: 'Waktu',
      value: '12:14',
    },
    {
      title: 'ID Transaksi',
      value: 'TRX123',
    },
    {
      title: 'Token / SN',
      value: '1234567890',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.textStatusSuccess}>Transaksi Sukses</Text>
        <Heading>Rp 10.000</Heading>
        <Text style={styles.textSubject}>Transfer ke 0857</Text>
        <Text style={styles.textDatetime}>Date-time</Text>
      </View>
      <View style={styles.spacer} />
      <Text style={styles.textSubtitle}>Rincian Transaksi</Text>
      <View>
        {DETAIL_ITEM.map((item, index) => {
          return (
            <Row key={index} style={styles.detailRow}>
              <Text style={styles.textDetailTitle}>{item?.title}</Text>
              <Text style={styles.textDetailValue}>{item?.value}</Text>
            </Row>
          );
        })}
      </View>
      <View style={styles.spacer} />
      <Row style={styles.detailRow}>
        <Text style={styles.textDetailTitleBold}>Total</Text>
        <Text style={styles.textDetailValueBold}>123</Text>
      </Row>
      <View style={styles.bottomContainer}>
        <Button title="Tutup" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  topContainer: {
    alignItems: 'center',
  },

  spacer: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.COLOR_DESCRIPTION,
    marginVertical: Size.SIZE_14,
  },

  detailRow: {
    paddingVertical: 4,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // ===== TEXT STYLE

  textSubject: {
    ...Typo.TextNormalRegular,
  },

  textDatetime: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DESCRIPTION,
  },

  textSubtitle: {
    ...Typo.TextNormalBold,
  },

  textDetailTitle: {
    ...Typo.TextNormalRegular,
    flex: 1,
    textAlign: 'left',
    color: Colors.COLOR_DESCRIPTION,
  },

  textDetailValue: {
    ...Typo.TextNormalRegular,
    flex: 1,
    textAlign: 'right',
    color: Colors.COLOR_DESCRIPTION,
  },

  textDetailTitleBold: {
    ...Typo.TextNormalBold,
    flex: 1,
    textAlign: 'left',
  },

  textDetailValueBold: {
    ...Typo.TextNormalBold,
    textAlign: 'right',
  },

  textStatusSuccess: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_GREEN,
    marginBottom: Size.SIZE_14,
  },
});
