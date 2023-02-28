import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {formatRupiah, groupingArraybyDate} from '../../utils/utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {PARSE_MOMENT_ONLY} from '../../utils/moment';
import {Row, Touchable} from '../../components';

const InboxScreen = ({navigation}) => {
  // ==== INITIALIZE TAB-BAR
  const Tab = createMaterialTopTabNavigator();

  const EX_DATA = [
    {
      name: '085741894533',
      price: 20000,
      message: 'Halo',
      createdDate: '2023-02-27T17:00:57+07:00',
    },
    {
      name: '085741894533',
      price: 20000,
      message: 'Halo',
      createdDate: '2023-02-26T17:00:57+07:00',
    },
    {
      name: '085741894533',
      price: 20000,
      message: 'Halo',
      createdDate: '2023-02-25T17:00:57+07:00',
    },
    {
      name: '085741894533',
      price: 20000,
      message: 'Halo',
      createdDate: '2023-02-25T17:00:57+07:00',
    },
  ];

  const NORMALIZE_DATA = groupingArraybyDate(EX_DATA);

  // ==== RENDER LIST SCREEN
  function _renderListRequestScreen() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={NORMALIZE_DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Touchable
              style={styles.card}
              onPress={() =>
                navigation.navigate('Transfer', {
                  screen: 'SendInit',
                  params: {id: 'FROM_REQUEST', data: item},
                })
              }>
              <Row>
                <Text style={styles.textTitle}>
                  Permintaan dari {item?.name}
                </Text>
                <Text style={styles.textPrice}>
                  {formatRupiah(item?.price)}
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
  }

  // ==== RENDER LIST SCREEN
  function _renderListMyRequestScreen() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={NORMALIZE_DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Touchable
              style={styles.card}
              onPress={() =>
                navigation.navigate('Transfer', {
                  screen: 'SendInit',
                  params: {id: 'FROM_REQUEST', data: item},
                })
              }>
              <Row>
                <Text style={styles.textTitle}>Permintaan ke {item?.name}</Text>
                <Text style={styles.textPrice}>
                  {formatRupiah(item?.price)}
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
  }

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            ...Typo.TextSmallRegular,
            textTransform: 'none',
          },
          tabBarPressColor: 'transparent',
          tabBarIndicatorStyle: {
            backgroundColor: Colors.COLOR_PRIMARY,
          },
        }}>
        <Tab.Screen
          name="Request"
          component={_renderListRequestScreen}
          options={{
            title: 'Request',
          }}
        />
        <Tab.Screen
          name="MyRequest"
          component={_renderListMyRequestScreen}
          options={{
            title: 'My Request',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default InboxScreen;

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
