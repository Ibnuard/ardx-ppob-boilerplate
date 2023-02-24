import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';
import styles from './styles';

const ExpandableView = ({
  title,
  containerStyle,
  headerStyle,
  contentStyle,
  titleStyle,
  children,
}) => {
  const [ddetail, showDetail] = React.useState(false);

  const rotateAnimation = React.useRef(new Animated.Value(1)).current;

  //CONFIG
  const EXPAND_ANIMATION_CONFIG = {
    duration: 400,
    create: {
      type: 'linear',
      property: 'opacity',
      duration: 200,
    },
    update: {
      type: 'spring',
      springDamping: Platform.OS == 'ios' ? 0.9 : 1.8,
    },
    delete: {
      type: 'linear',
      property: 'opacity',
      duration: 100,
    },
  };

  function toggleAnimation() {
    Animated.timing(rotateAnimation, {
      toValue: ddetail ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function renderChild() {
    return ddetail ? <View style={[contentStyle]}>{children}</View> : null;
  }

  function renderHeader() {
    return (
      <TouchableOpacity
        style={[styles.header, headerStyle]}
        activeOpacity={1}
        onPress={() => {
          LayoutAnimation.configureNext(EXPAND_ANIMATION_CONFIG);
          showDetail(!ddetail);
          toggleAnimation();
        }}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      {renderHeader()}
      {renderChild()}
    </View>
  );
};

export default ExpandableView;
