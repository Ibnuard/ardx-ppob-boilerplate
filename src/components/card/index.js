import * as React from 'react';
import {View, Text} from 'react-native';
import {DEFAULT_PROPS, propsInterpreter} from '../../utils/prep';
import Touchable from '../touchable';
import styles from './styles';

const PROPS = {...DEFAULT_PROPS, children: null, style: null, onPress: null};

const Card = (props = PROPS) => {
  return props?.onPress ? (
    <Touchable
      style={[props?.style, styles.container, propsInterpreter(props)]}
      onPress={props?.onPress}>
      {props?.children}
    </Touchable>
  ) : (
    <View style={[props?.style, styles.container]}>{props?.children}</View>
  );
};

export default Card;
