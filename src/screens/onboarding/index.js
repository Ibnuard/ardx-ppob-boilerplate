import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size, Typo} from '../../styles';
import {Button, Center, Heading, Slider} from '../../components';
import {IMG} from '../../utils/images';
import {AuthContext} from '../../context';

export default function OnBoardingScreen() {
  const {restoreToken} = React.useContext(AuthContext);

  const onStartButtonPressed = () => {
    restoreToken();
  };

  // === GENERATE
  const DATA = [
    {
      img: IMG.boarding.first,
      title: 'Quick and Easy',
      desc: 'Just visit any of the growing number of outlets who accept money and make your purchase within second',
    },
    {
      img: IMG.boarding.second,
      title: 'Investerment Effectives',
      desc: 'We constantly updated currency market, exchange rates',
    },
    {
      img: IMG.boarding.third,
      title: 'Security',
      desc: 'Your money is protected by your login credentials',
    },
  ];

  return (
    <View style={styles.container}>
      <Slider>
        {DATA.map((item, index) => {
          return (
            <Center key={index} flex={1} w={'screen'} px={32}>
              <Image
                source={item.img}
                style={styles.pic}
                resizeMode={'contain'}
              />
              <Heading mt={24} pv={4}>
                {item.title}
              </Heading>
              <Text style={styles.textDesc}>{item.desc}</Text>
            </Center>
          );
        })}
      </Slider>
      <View style={styles.bottomContainer}>
        <Button title="Lewati" onPress={() => onStartButtonPressed()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  bottomContainer: {
    padding: Scaler.scaleSize(24),
  },

  pic: {
    height: Scaler.scaleSize(250),
    width: Scaler.scaleSize(250),
  },

  //=== TEXT STYLES

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DESCRIPTION,
    textAlign: 'center',
  },
});
