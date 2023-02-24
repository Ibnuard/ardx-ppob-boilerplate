import {
  formatCurrency,
  getSupportedCurrencies,
} from 'react-native-format-currency';

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
