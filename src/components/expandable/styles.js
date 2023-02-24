import {StyleSheet} from 'react-native';
import {Colors, Scaler, Size, Typo} from '../../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.COLOR_WHITE,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Size.SIZE_14,
    backgroundColor: Colors.COLOR_WHITE,
  },

  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: Colors.COLOR_DESCRIPTION,
  },

  child: {
    padding: Size.SIZE_14,
  },

  childContent: {
    paddingVertical: Size.SIZE_16,
  },

  title: {
    ...Typo.TextNormalRegular,
  },

  caption: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DESCRIPTION,
  },
});

export default styles;
