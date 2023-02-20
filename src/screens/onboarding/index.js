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

  return (
    <View style={styles.container}>
      <Slider>
        <Center flex={1} w={'screen'}>
          <Image source={IMG.boarding.first} />
          <Heading mt={24} pv={4}>
            Haloo
          </Heading>
          <Text style={styles.textDesc}>Desc</Text>
        </Center>
        <Center flex={1} w={'screen'}>
          <Image source={IMG.boarding.first} />
          <Heading mt={24} pv={4}>
            Haloo
          </Heading>
          <Text style={styles.textDesc}>Desc</Text>
        </Center>
        <Center flex={1} w={'screen'}>
          <Image source={IMG.boarding.first} />
          <Heading mt={24} pv={4}>
            Haloo
          </Heading>
          <Text style={styles.textDesc}>Desc</Text>
        </Center>
      </Slider>
      <View style={styles.bottomContainer}>
        <Button title="Halo" onPress={() => onStartButtonPressed()} />
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

  //=== TEXT STYLES

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DESCRIPTION,
  },
});
