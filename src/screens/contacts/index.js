import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles';

const ContactScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>ContactScreen</Text>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },
});
