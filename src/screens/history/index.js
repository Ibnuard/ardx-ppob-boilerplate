import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HistoryScreen</Text>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },
});
