import moment from 'moment';

// === GET CURRENT DATE TIME
const GET_CURRENT_DATETIME = (initial, format) => {
  return moment(initial).format(format);
};

// === GET CURRENT DATE / TIME ONLY
const GET_CURRENT_MOMENT = (type = 'date') => {
  if (type == 'date') {
    return moment().format('ll');
  } else {
    return moment().format('LT');
  }
};

// ==== PARSE DATETTIME
const PARSE_MOMENT = (date, format) => {
  return moment(date).format(format);
};

// ==== PARSE DATETTIME
const PARSE_MOMENT_ONLY = (date, type = 'date') => {
  return moment(date).format(type == 'time' ? 'LT' : 'll');
};

export {
  GET_CURRENT_DATETIME,
  GET_CURRENT_MOMENT,
  PARSE_MOMENT,
  PARSE_MOMENT_ONLY,
};
