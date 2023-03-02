import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {Button, Heading, Row} from '../../components';
import {
  GET_CURRENT_MOMENT,
  PARSE_MOMENT,
  PARSE_MOMENT_ONLY,
} from '../../utils/moment';
import {formatRupiah} from '../../utils/utils';

export default function TransactionDetailScreen({navigation, route}) {
  //SAMPLE DATA
  const SAMPLE_DATA = route?.params?.data;

  // ========== DETAILS
  const DETAIL_ITEM = [
    {
      title: 'Status',
      value: 'Sukses',
    },
    {
      title: 'ID Number',
      value: SAMPLE_DATA?.number || SAMPLE_DATA?.phone,
    },
    {
      title: 'Tanggal',
      value: PARSE_MOMENT_ONLY(SAMPLE_DATA?.createdDate, 'date'),
    },
    {
      title: 'Waktu',
      value: PARSE_MOMENT_ONLY(SAMPLE_DATA?.createdDate, 'time'),
    },
    {
      title: 'ID Transaksi',
      value: SAMPLE_DATA?.trxId,
    },
    {
      title: 'Token / SN',
      value: SAMPLE_DATA?.sn,
    },
  ];

  //=== HANDLE SINGLE DATA
  const DETAIL_ITEM_SINGLE = {
    price: formatRupiah(SAMPLE_DATA?.price),
    datetime: PARSE_MOMENT(SAMPLE_DATA?.createdDate, 'lll'),
    nominal: `${SAMPLE_DATA?.name} ${SAMPLE_DATA?.nominal}`,
    total: formatRupiah(SAMPLE_DATA?.price),
  };

  // === HANDLE STATUS
  const GET_STATUS = () => {
    switch (SAMPLE_DATA?.status) {
      case 'success':
        return {title: 'Sukses', style: styles.textStatusSuccess};
        break;
      case 'process':
        return {title: 'Diproses', style: styles.textStatusProcess};
        break;
      case 'failed':
        return {title: 'Gagal', style: styles.textStatusFailed};
        break;
      default:
        return {title: 'Diproses', style: styles.textStatusProcess};
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topContainer}>
          <Text style={GET_STATUS().style}>Transaksi {GET_STATUS().title}</Text>
          <Heading>{DETAIL_ITEM_SINGLE?.price}</Heading>
          <Text style={styles.textSubject}>{DETAIL_ITEM_SINGLE?.nominal}</Text>
          <Text style={styles.textDatetime}>
            {DETAIL_ITEM_SINGLE?.datetime}
          </Text>
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
          <Text style={styles.textDetailValueBold}>
            {DETAIL_ITEM_SINGLE?.price}
          </Text>
        </Row>
        <View style={styles.bottomContainer}>
          <Button title="Tutup" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
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

  textStatusProcess: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_ORANGE,
    marginBottom: Size.SIZE_14,
  },

  textStatusFailed: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_RED,
    marginBottom: Size.SIZE_14,
  },
});
