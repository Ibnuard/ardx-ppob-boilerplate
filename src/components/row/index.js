import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DEFAULT_PROPS, propsInterpreter} from '../../utils/prep';

const PROPS = {...DEFAULT_PROPS, children: null, style: null};

const Row = (props = PROPS) => {
  return (
    <View style={[styles.container, propsInterpreter(props), props?.style]}>
      {props?.children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
