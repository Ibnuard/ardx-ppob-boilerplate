import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../../styles';
import {Heading, SubHeading} from '../../components';

const TopUpScreen = () => {
  return (
    <View style={styles.container}>
      <Heading>Top Up</Heading>
      <SubHeading>Pilih bank untuk melakukan top up</SubHeading>
    </View>
  );
};

export default TopUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },
});
