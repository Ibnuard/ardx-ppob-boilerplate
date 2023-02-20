import {View, Text} from 'react-native';
import React from 'react';
import {Typo} from '../../styles';
import {DEFAULT_PROPS, propsInterpreter} from '../../utils/prep';

const PROPS = {...DEFAULT_PROPS, children: ''};

const Heading = (props = PROPS) => {
  return (
    <Text style={[{...Typo.TextExtraLargeBold}, propsInterpreter(props)]}>
      {props?.children}
    </Text>
  );
};

export default Heading;
