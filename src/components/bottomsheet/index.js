import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors, Size} from '../../styles';

export default function BottomSheet({
  visible,
  children,
  onSwipeDone,
  bgColor,
  maxH,
  flex,
  showPull,
  cph,
  cpv,
  onHide,
  onBackButtonPress,
}) {
  return (
    <Modal
      isVisible={visible}
      useNativeDriverForBackdrop
      useNativeDriver={true}
      swipeDirection={'down'}
      swipeThreshold={24}
      style={{margin: 0, justifyContent: 'flex-end'}}
      onModalHide={onHide}
      onBackButtonPress={onBackButtonPress}
      onSwipeComplete={onSwipeDone}>
      <View
        style={{
          backgroundColor: bgColor ?? Colors.COLOR_WHITE,
          maxHeight: maxH ?? '70%',
          paddingHorizontal: cph ?? 0,
          paddingBottom: cpv ?? 0,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          flex: flex,
        }}>
        {showPull && (
          <View
            style={{
              width: 60,
              height: 6,
              backgroundColor: Colors.COLOR_GRAY,
              borderRadius: 4,
              margin: Size.SIZE_8,
              alignSelf: 'center',
            }}
          />
        )}
        {children}
      </View>
    </Modal>
  );
}
