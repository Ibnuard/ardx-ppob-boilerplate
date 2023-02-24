import {StyleSheet} from 'react-native';
import {Colors, Size} from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.05,
    elevation: 3,
  },
});

export default styles;
