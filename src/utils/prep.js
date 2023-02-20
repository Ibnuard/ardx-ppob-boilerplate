import {Scaler} from '../styles';
import {Dimensions} from 'react-native';

//get dim
const dim = Dimensions.get('window');

//set default props
export const DEFAULT_PROPS = {
  flex: 0,
  mx: 0,
  mv: 0,
  m: 0,
  mt: 0,
  mb: 0,
  ml: 0,
  mr: 0,
  px: 0,
  pv: 0,
  p: 0,
  pt: 0,
  pb: 0,
  pl: 0,
  pr: 0,
  h: 0,
  w: 0,
  maxH: 0,
  maxW: 0,
};

//parse props to css
const propsParser = key => {
  switch (key) {
    case 'mx':
      return 'marginHorizontal';
      break;
    case 'mv':
      return 'marginVertical';
      break;
    case 'm':
      return 'margin';
      break;
    case 'mt':
      return 'marginTop';
      break;
    case 'mb':
      return 'marginBottom';
      break;
    case 'ml':
      return 'marginLeft';
      break;
    case 'mr':
      return 'marginRight';
      break;
    case 'px':
      return 'paddingHorizontal';
      break;
    case 'pv':
      return 'paddingVertical';
      break;
    case 'p':
      return 'padding';
      break;
    case 'pt':
      return 'paddingTop';
      break;
    case 'pb':
      return 'paddingBottom';
      break;
    case 'pl':
      return 'paddingLeft';
      break;
    case 'pr':
      return 'paddingRight';
      break;
    case 'h':
      return 'height';
      break;
    case 'w':
      return 'width';
      break;
    case 'maxH':
      return 'maxHeight';
      break;
    case 'maxW':
      return 'maxWidth';
      break;
    case 'flex':
      return 'flex';
      break;
    default:
      return null;
      break;
  }
};

const parseValue = (value, key) => {
  switch (value) {
    case 'full':
      return '100%';
      break;
    case 'half':
      return '50%';
      break;
    case 'screen':
      return dim[key];
      break;
    default:
      return Scaler.scaleSize(value);
      break;
  }
};

//Generate style from parsed Key
export const propsInterpreter = props => {
  let styled = {};
  for (const [key, value] of Object.entries(props)) {
    const parsedKey = propsParser(key);
    if (parsedKey !== null) {
      styled[parsedKey] = parseValue(value, parsedKey);
    }
  }
  return styled;
};
