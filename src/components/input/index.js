import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Touchable from '../touchable';
import {color} from 'react-native-reanimated';

const Input = props => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [isSecure, setIsSecure] = React.useState(false);

  const focusAnim = React.useRef(new Animated.Value(0)).current;

  //animate label
  React.useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocus || !!props?.value ? 1 : 0,
      // I took duration and easing values
      // from material.io demo page
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      // we'll come back to this later
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocus, props?.value]);

  const themeSelector = () => {
    switch (props?.theme) {
      case 'material':
        return isFocus
          ? styles.containerBorderBottomActive
          : props?.error
          ? styles.containerBorderBottomError
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
    <>
      <View style={[styles.container, themeSelector(), props?.containerStyle]}>
        {props?.label && props?.theme == 'material' && (
          <Animated.View
            style={[
              styles.labelContainer,
              {
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.8],
                    }),
                  },
                  {
                    translateY: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -36],
                    }),
                  },
                  {
                    translateX: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -16],
                    }),
                  },
                ],
              },
            ]}>
            <Text
              style={[
                styles.textLabel,
                {
                  color: isFocus
                    ? Colors.COLOR_PRIMARY
                    : Colors.COLOR_DARK_GRAY,
                },
              ]}>
              {props?.label}
            </Text>
          </Animated.View>
        )}
        {props?.renderLeftContainer}
        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor={Colors.COLOR_DESCRIPTION}
          onFocus={() => {
            setIsFocus(!isFocus);
            props?.onFocus ? props?.onFocus() : null;
          }}
          onBlur={() => {
            setIsFocus(!isFocus);
            props?.onBlur ? props?.onBlur() : null;
          }}
          secureTextEntry={isSecure}
        />

        {props?.showClear ? (
          <Touchable style={styles.close} onPress={props?.onClearPress}>
            <Icon name="close" size={16} color={Colors.COLOR_DESCRIPTION} />
          </Touchable>
        ) : null}

        {props?.showContact && (
          <Touchable
            style={styles.contactButton}
            onPress={props?.onContactPress}>
            <Icon name="contacts" size={24} color={Colors.COLOR_DARK_GRAY} />
          </Touchable>
        )}

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
      {props?.error ? (
        <Text style={styles.textError}>{props?.error}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    left: 4,
  },

  showEye: {
    paddingHorizontal: 8,
  },
  container: {
    marginTop: Size.SIZE_18,
    marginBottom: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.COLOR_GRAY,
  },

  containerBorderBottomError: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.COLOR_RED,
  },

  containerBorderBottomActive: {
    borderBottomWidth: 1,
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
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  input: {
    ...Typo.TextNormalMedium,
    flex: 1,
  },

  contactButton: {
    paddingHorizontal: Size.SIZE_8,
    marginLeft: Size.SIZE_12,
  },

  close: {
    paddingLeft: Size.SIZE_8,
  },

  // ============= TEXT STYLE
  textLabel: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_DARK_GRAY,
  },

  textError: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_RED,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});

export default Input;
