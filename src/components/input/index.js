import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import React from 'react';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Touchable from '../touchable';
import {IMG} from '../../utils/images';

const Input = props => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [isSecure, setIsSecure] = React.useState(false);

  const themeSelector = () => {
    switch (props?.theme) {
      case 'material':
        return isFocus
          ? styles.containerBorderBottomActive
          : styles.containerBorderBottom;
        break;
      case 'border':
        return isFocus ? styles.containerBorderActive : styles.containerBorder;
        break;

      default:
        return styles.containerNoBorder;
        break;
    }
  };

  return (
    <View style={[styles.container, themeSelector()]}>
      {props?.renderLeftContainer}
      <TextInput
        {...props}
        style={styles.input}
        onFocus={() => {
          setIsFocus(!isFocus);
          props?.onFocus ?? null;
        }}
        onBlur={() => {
          setIsFocus(!isFocus);
          props?.onBlur ?? null;
        }}
        secureTextEntry={isSecure}
      />
      {props?.showEye && (
        <Touchable
          style={styles.showEye}
          onPress={() => setIsSecure(!isSecure)}>
          <Icon
            name={isSecure ? 'eyeo' : 'eye'}
            size={24}
            color={Colors.COLOR_DARK_BACKGROUND}
          />
        </Touchable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  showEye: {
    paddingHorizontal: 8,
  },
  container: {
    marginVertical: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.COLOR_GRAY,
  },

  containerBorderBottomActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.COLOR_PRIMARY,
  },

  containerBorder: {
    borderWidth: 1.5,
    borderColor: Colors.COLOR_GRAY,
    borderRadius: 8,
    backgroundColor: Colors.COLOR_WHITE,
    paddingHorizontal: 8,
  },

  containerBorderActive: {
    borderWidth: 1.5,
    borderColor: Colors.COLOR_PRIMARY,
    borderRadius: 8,
    backgroundColor: Colors.COLOR_WHITE,
    paddingHorizontal: 8,
  },

  containerNoBorder: {
    borderColor: Colors.COLOR_GRAY,
    borderRadius: 8,
    backgroundColor: Colors.COLOR_DARK_GRAY,
    paddingHorizontal: 8,
  },

  input: {
    ...Typo.TextNormalMedium,
    flex: 1,
  },
});

export default Input;
