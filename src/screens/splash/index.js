import {useFocusEffect} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {AuthContext} from '../../context';
import {IMG} from '../../utils/images';
import {retrieveData} from '../../utils/store';
import {wait} from '../../utils/utils';
import styles from './styles';

const SplashScreen = ({navigation}) => {
  const {restoreToken} = React.useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);

      return () => StatusBar.setHidden(false);
    }),
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await retrieveData('token', false);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //restoreToken(userToken);
      navigation.navigate('Boarding');
    };
    wait(2500).then(() => bootstrapAsync());
  }, []);

  return (
    <View style={styles.container}>
      <Image source={IMG.logo} style={styles.logo} resizeMode={'contain'} />
    </View>
  );
};

export default SplashScreen;
