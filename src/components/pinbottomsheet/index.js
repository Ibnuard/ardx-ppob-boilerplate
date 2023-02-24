import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles';
import BottomSheet from '../bottomsheet';
import PinModalScreen from '../pin';

const PinBottomSheet = ({visible, onBackPress, onFilled}) => {
  const {height} = Dimensions.get('window');
  return (
    <BottomSheet
      visible={visible}
      flex={1}
      maxH={height}
      onBackButtonPress={onBackPress}>
      <PinModalScreen type={'PIN'} onFilled={onFilled} />
    </BottomSheet>
  );
};

export default PinBottomSheet;
