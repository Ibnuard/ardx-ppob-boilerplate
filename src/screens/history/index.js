import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Row, Touchable} from '../../components';
import {formatRupiah, groupingArraybyDate} from '../../utils/utils';
import {PARSE_MOMENT_ONLY} from '../../utils/moment';

const HistoryScreen = ({navigation}) => {
  const EX_DATA = [
    {
      name: 'Pulsa Indosat',
      createdDate: '2023-02-27T17:00:57+07:00',
      price: 10000,
      nominal: 10000,
      trxId: 'TRX123',
      sn: '1234 - 1234 - 1234 - 1234',
      status: 'success',
      number: '0857418945111',
    },
    {
      name: 'PLN Token',
      createdDate: '2023-02-26T17:00:57+07:00',
      price: 20000,
      nominal: 20000,
      trxId: 'TRX123',
      sn: '1234 - 1234 - 1234 - 1234',
      status: 'pending',
      number: '7654321',
    },
    {
      name: 'BPJS',
      createdDate: '2023-02-25T17:00:57+07:00',
      price: 70000,
      nominal: 70000,
      trxId: 'TRX123',
      sn: '1234 - 1234 - 1234 - 1234',
      status: 'failed',
      number: '00021212121',
    },
    {
      name: 'Paket Data',
      createdDate: '2023-02-25T17:00:57+07:00',
      price: 50000,
      nominal: 50000,
      trxId: 'TRX123',
      sn: '1234 - 1234 - 1234 - 1234',
      status: 'success',
      number: '0857418945112',
    },
  ];

  const NORMALIZE_DATA = groupingArraybyDate(EX_DATA);

  return (
    <View style={styles.container}>
      <SectionList
        sections={NORMALIZE_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <Touchable
            style={styles.card}
            onPress={() =>
              navigation.navigate('TransactionDetail', {data: item})
            }>
            <Row>
              <Text style={styles.textTitle}>{item?.name}</Text>
              <Text style={styles.textPrice}>
                - {formatRupiah(item?.price)}
              </Text>
            </Row>
          </Touchable>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.cardHeader}>
            <Text style={styles.textHeader}>{PARSE_MOMENT_ONLY(title)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  card: {
    padding: Size.SIZE_14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.COLOR_LIGHT_GRAY,
  },

  cardHeader: {
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
    paddingHorizontal: Size.SIZE_14,
    paddingVertical: 4,
  },

  // === TEXT STYLE

  textTitle: {
    ...Typo.TextSmallBold,
    flex: 1,
  },

  textPrice: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_GREEN,
  },

  textHeader: {
    ...Typo.TextSmallBold,
    color: Colors.COLOR_DESCRIPTION,
  },
});
