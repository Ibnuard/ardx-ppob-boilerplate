import * as React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors} from '../../styles';
import {DEFAULT_PROPS, propsInterpreter} from '../../utils/prep';
import styles from './styles';

const PROPS = {
  ...DEFAULT_PROPS,
  upperCase: false,
  isLoading: false,
  disabled: false,
  invert: false,
  title: 'This is Button',
  buttonStyle: null,
  textStyle: null,
  onPress: null,
};

const Button = (props = PROPS) => {
  //define button and text style based on condition
  const _containerStyle = () => {
    if (!props?.invert) {
      if (!props?.disabled && !props?.isLoading) {
        return {button: styles.container, text: styles.textTitle};
      } else {
        return {
          button: styles.containerInactive,
          text: styles.textTitleInactive,
        };
      }
    } else {
      if (!props?.disabled && !props?.isLoading) {
        return {button: styles.containerInvert, text: styles.textTitleInvert};
      } else {
        return {
          button: styles.containerInvertInactive,
          text: styles.textTitleInvertInactive,
        };
      }
    }
  };

  //handle is Loading statment
  const _renderContent = () => {
    if (props?.isLoading) {
      return (
        <ActivityIndicator
          color={props?.invert ? Colors.COLOR_GRAY : Colors.COLOR_WHITE}
        />
      );
    } else {
      return (
        <Text style={[props?.textStyle, _containerStyle().text]}>
          {props?.upperCase ? title.toUpperCase() : props?.title}
        </Text>
      );
    }
  };

  //main render
  return (
    <TouchableOpacity
      activeOpacity={props?.disabled ? 1 : 0.6}
      style={[
        props?.buttonStyle,
        _containerStyle().button,
        propsInterpreter(props),
      ]}
      onPress={
        props?.disabled || props?.isLoading ? null : props?.onPress ?? null
      }>
      {_renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
