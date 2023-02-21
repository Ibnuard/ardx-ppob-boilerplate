import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {DEFAULT_PROPS, propsInterpreter} from '../../utils/prep';
import styles from './styles';

const PROPS = {
  ...DEFAULT_PROPS,
  onPress: null,
  style: null,
  children: null,
  disabled: null,
};

const Touchable = (props = PROPS) => {
  return (
    <TouchableOpacity
      style={[props?.style, styles.container, propsInterpreter(props)]}
      activeOpacity={props?.disabled ? 1 : 0.6}
      onPress={props?.disabled ? null : props?.onPress ? props?.onPress : null}>
      {props?.children}
    </TouchableOpacity>
  );
};

export default Touchable;
