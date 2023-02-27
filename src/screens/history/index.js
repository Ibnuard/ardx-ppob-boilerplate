import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Row, Touchable} from '../../components';
import {groupingArraybyDate} from '../../utils/utils';
import {PARSE_MOMENT_ONLY} from '../../utils/moment';

const HistoryScreen = ({navigation}) => {
  const EX_DATA = [
    {
      name: 'test',
      createdDate: '2023-02-27T17:00:57+07:00',
    },
    {
      name: 'test',
      createdDate: '2023-02-26T17:00:57+07:00',
    },
    {
      name: 'test',
      createdDate: '2023-02-25T17:00:57+07:00',
    },
    {
      name: 'test',
      createdDate: '2023-02-25T17:00:57+07:00',
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
            onPress={() => navigation.navigate('TransactionDetail')}>
            <Row>
              <Text style={styles.textTitle}>{item?.name}</Text>
              <Text style={styles.textPrice}>Price</Text>
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
