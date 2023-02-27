import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles';

const StatusBarWhite = () => {
  return (
    <StatusBar
      backgroundColor={Colors.COLOR_WHITE}
      barStyle={'light-content'}
    />
  );
};

export default StatusBarWhite;
