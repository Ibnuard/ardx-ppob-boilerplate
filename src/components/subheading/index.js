import {View, Text} from 'react-native';
import React from 'react';
import {Colors, Typo} from '../../styles';
import {DEFAULT_PROPS, propsInterpreter} from '../../utils/prep';

const PROPS = {...DEFAULT_PROPS, children: ''};

const SubHeading = (props = PROPS) => {
  return (
    <Text
      style={[
        {...Typo.TextNormalRegular, color: Colors.COLOR_DESCRIPTION},
        propsInterpreter(props),
      ]}>
      {props?.children}
    </Text>
  );
};

export default SubHeading;
