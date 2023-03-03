import {StyleSheet} from 'react-native';
import {Colors, Scaler, Size, Typo} from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COLOR_PRIMARY,
  },

  logo: {
    height: 100,
    width: 100,
  },

  logoBy: {
    width: Scaler.scaleSize(64),
    height: Scaler.scaleSize(64),
    marginLeft: Size.SIZE_8,
  },

  bottomContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    marginBottom: Size.SIZE_14,
  },

  textPoweredBy: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_WHITE,
  },
});

export default styles;
