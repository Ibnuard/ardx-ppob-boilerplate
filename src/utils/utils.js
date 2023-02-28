import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {IMG} from './images';

//create simple log
export const cLog = (log = '', color) => {
  const _selectColor = () => {
    switch (color) {
      case 'red':
        return '\x1B[31m';
        break;
      case 'blue':
        return '\x1B[34m';
        break;
      default:
        return '';
        break;
    }
  };
  console.log(`${_selectColor()}${log}`);
};

//callback to avoid re-render
export const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

//Rupiah currency formater
export function formatRupiah(number = 0, useRp = true) {
  let str = number?.toString();

  if (str.length < 1) {
    return useRp ? 'Rp 0' : '0';
  }

  if (str.includes('Rp')) {
    str = str.replace('Rp ', '');
  }

  if (str.charAt(0) === '0') {
    if (str.length > 0) {
      return useRp ? 'Rp ' + String(Number(str)) : String(Number(str));
    }
  }

  let strNumber = str.replace(/[^,\d]/g, '').toString();
  let split = strNumber.split(',');
  let lost = split[0].length % 3;
  let rupiah = split[0].substr(0, lost);
  let thousand = split[0].substr(lost).match(/\d{3}/gi);

  if (thousand) {
    let separator = lost ? '.' : '';
    rupiah += separator + thousand.join('.');
  }

  rupiah = split[1] != null ? rupiah + ',' + split[1] : rupiah;

  return useRp ? 'Rp ' + rupiah : rupiah;
}

//get number of rupiah
export const getRupiahNumber = (rupiah = '', usePrefix = true) => {
  if (!rupiah.length) {
    return null;
  }

  const base = rupiah;

  if (usePrefix) {
    const rmPrefix = base.replace('Rp ', '');
    const rmDot = rmPrefix.split('.').join('');
    return Number(rmDot);
  } else {
    const rmDot = base.split('.').join('');
    return Number(rmDot);
  }
};

// ======= HANDLE CONTACT LIST
export const handleContactList = (data = []) => {
  let temp = [];

  for (let dt of data) {
    const base = {
      name: dt?.givenName,
      phone: dt?.phoneNumbers[0]?.number,
    };

    temp.push(base);
  }

  const sorted = temp.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return sorted;
};

// ==== NORMALIZE PHONE NUMBER
export const normalizeNumber = (num = '') => {
  let base = num.toString();
  base = base.replace(/-/g, '').replace(/\s/g, '').replace('+', '');

  if (base.charAt(0) == '6' && base.charAt(1) == '2') {
    return base.substring(2);
  }

  if (base.charAt(0) == '0' && base.charAt(1) == '8') {
    return base.substring(1);
  }

  return base;
};

// ========== GROUP ARRAY BY DATE
export const groupingArraybyDate = (arr = []) => {
  const grouping = arr.reduce((group, date) => {
    const {createdDate} = date;
    group[createdDate] = group[createdDate] ?? [];
    group[createdDate].push(date);
    return group;
  }, {});

  const objEnt = Object.entries(grouping);

  let temp = [];

  for (let i = 0; i < objEnt.length; i++) {
    const base = {
      title: objEnt[i][0],
      data: objEnt[i][1],
    };

    temp.push(base);
  }

  return temp;
};

// ============ CREATE TOP TAB
export const CreateTopTabBar = () => {
  const Tab = createMaterialTopTabNavigator();

  return Tab;
};

// ==== GET OPERATOR NAME AND ICON BY PHONE
export const getOperatorNameIcon = phone => {
  const getNumber = normalizeNumber(phone);

  const code = getNumber.substring(0, 2);

  switch (code) {
    case '85':
      return {name: 'indosat', icon: IMG.operator.indosat};
      break;
    default:
      return {name: '', icon: IMG.operator.blank};
      break;
  }
};
