import {StyleSheet} from 'react-native';
import {Colors, Typo} from '../../styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.COLOR_PRIMARY,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  containerInactive: {
    width: '100%',
    backgroundColor: Colors.COLOR_DARK_GRAY,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  containerInvert: {
    width: '100%',
    backgroundColor: Colors.COLOR_WHITE,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.COLOR_PRIMARY,
  },

  containerInvertInactive: {
    width: '100%',
    backgroundColor: Colors.COLOR_WHITE,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.COLOR_DARK_GRAY,
  },

  //text style
  textTitle: {
    ...Typo.TextNormalMedium,
    color: Colors.COLOR_WHITE,
  },

  textTitleInactive: {
    ...Typo.TextNormalMedium,
    color: Colors.COLOR_WHITE,
  },

  textTitleInvert: {
    ...Typo.TextNormalMedium,
    color: Colors.COLOR_PRIMARY,
  },

  textTitleInvertInactive: {
    ...Typo.TextNormalMedium,
    color: Colors.COLOR_DARK_GRAY,
  },
});

export default styles;
