import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DEFAULT_PROPS, propsInterpreter} from '../../utils/prep';

const PROPS = {...DEFAULT_PROPS, children: null};

const Center = (props = PROPS) => {
  return (
    <View style={[styles.container, propsInterpreter(props)]}>
      {props?.children}
    </View>
  );
};

export default Center;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
