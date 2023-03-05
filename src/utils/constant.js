export const BASE64_PREFIX = 'data:image/png;base64,';

export const MINIMUM_NUMBER = {
  PULSA_DATA: 9,
  PLN_TOKEN: 10,
  PLN_TAGIHAN: 11,
};

// === PPOB PRODUCT TYPE
export const PRODUCT_TYPE = {
  PULSADATA: 'PULSADATA',
  PLN_TOKEN: 'PLNTOKEN',
  PLN_TAGIHAN: 'PLNTAGIHAN',
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
  } else {
    return 'Transaksi';
  }
};
