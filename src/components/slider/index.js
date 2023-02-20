import {ScrollView, StyleSheet, Dimensions, View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../styles';
import Row from '../row';

const Slider = ({children}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const dots = [1, 2, 3];
  const onScroll = e => {
    const indexed = Math.round(
      e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
    );

    setActiveIndex(indexed);
  };

  return (
    <>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={e => onScroll(e)}
        scrollEventThrottle={10}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
      <Row mb={14} style={{justifyContent: 'center'}}>
        {dots.map((item, index) => {
          return (
            <View
              key={index}
              style={activeIndex == index ? styles.circleActive : styles.circle}
            />
          );
        })}
      </Row>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.COLOR_GRAY,
    marginHorizontal: 4,
  },

  circleActive: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.COLOR_PRIMARY,
    marginHorizontal: 4,
  },
});
