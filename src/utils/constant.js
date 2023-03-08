export const BASE64_PREFIX = 'data:image/png;base64,';

export const MINIMUM_NUMBER = {
  PULSA_DATA: 9,
  PLN_TOKEN: 10,
  PLN_TAGIHAN: 11,
  BPJS: 10,
  PDAM: 10,
};

// === PPOB PRODUCT TYPE
export const PRODUCT_TYPE = {
  PULSADATA: 'PULSADATA',
  PLN_TOKEN: 'PLNTOKEN',
  PLN_TAGIHAN: 'PLNTAGIHAN',
  BPJS: 'BPJS',
  PDAM: 'PDAM',
};

// === DEFINE PAYMENT DETAIL EACH PAYMENT TYPE
export const DETAIL_ITEM_BY_TYPE = (type, data) => {
  if (type == 'PULSADATA') {
    return [
      {
        title: 'Nomor Ponsel',
        value: data?.number,
      },
      {
        title: 'Produk',
        value: `${data?.name} ${data?.nominal}`,
      },
    ];
  } else if (type == 'PLNTOKEN') {
    return [
      {
        title: 'Nomor Meter',
        value: data?.phone || data?.number,
      },
      {
        title: 'Produk',
        value: data?.name,
      },
      {
        title: 'Nama Pelanggan',
        value: data?.clientName,
      },
    ];
  } else if (type == 'PLNTAGIHAN') {
    return [
      {
        title: 'Nomor Pelanggan',
        value: data?.number,
      },
      {
        title: 'Nama Pelanggan',
        value: data?.clientName,
      },
      {
        title: 'Periode',
        value: data?.periode,
      },
    ];
  } else if (type == 'BPJS') {
    return [
      {
        title: 'Nomor Pelanggan',
        value: data?.number,
      },
      {
        title: 'Nama Pelanggan',
        value: data?.clientName,
      },
      {
        title: 'Periode',
        value: data?.periode,
      },
    ];
  } else if (type == 'PDAM') {
    return [
      {
        title: 'Nomor Pelanggan',
        value: data?.number,
      },
      {
        title: 'Nama Pelanggan',
        value: data?.clientName,
      },
      {
        title: 'Periode',
        value: data?.periode,
      },
    ];
  } else {
    return [];
  }
};

// === DEFINE PAYMENT DETAIL EACH PAYMENT TYPE
export const PAYMENT_ITEM_NAME_BY_TYPE = (type, data) => {
  if (type == 'PULSADATA') {
    const trxName = `${data?.name} ${data?.nominal}`;

    if (trxName.length > 20) {
      return trxName.substring(0, 20) + '...';
    } else {
      return trxName;
    }
  } else if (type == 'PLNTOKEN') {
    return `PLN Token ${data?.nominal}`;
  } else if (type == 'PLNTAGIHAN') {
    return `${data?.clientName} - PLN Tagihan`;
  } else if (type == 'BPJS') {
    return `BPJS Kesehatan`;
  } else if (type == 'PDAM') {
    return `PDAM`;
  } else {
    return 'Transaksi';
  }
};

// == month list
export const MONTH_LIST = [
  {
    id: 0,
    prefix: 'JAN',
    name: 'JANUARI',
  },
  {
    id: 1,
    prefix: 'FEB',
    name: 'FEBRUARI',
  },
  {
    id: 2,
    prefix: 'MAR',
    name: 'MARET',
  },
  {
    id: 3,
    prefix: 'APR',
    name: 'APRIL',
  },
  {
    id: 4,
    prefix: 'MEI',
    name: 'MEI',
  },
  {
    id: 5,
    prefix: 'JUN',
    name: 'JUNI',
  },
  {
    id: 6,
    prefix: 'JUL',
    name: 'JULI',
  },
  {
    id: 7,
    prefix: 'AGU',
    name: 'AGUSTUS',
  },
  {
    id: 8,
    prefix: 'SEP',
    name: 'SEPTEMBER',
  },
  {
    id: 9,
    prefix: 'OKT',
    name: 'OKTOBER',
  },
  {
    id: 10,
    prefix: 'NOV',
    name: 'NOVEMBER',
  },
  {
    id: 11,
    prefix: 'DES',
    name: 'DESEMBER',
  },
];
