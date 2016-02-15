import moment from 'moment';

const MINUTE = 60;
const HOUR = MINUTE*60;
const DAY = HOUR*24;
const WEEK = DAY*7;
const MONTH = WEEK*4;
const YEAR = MONTH*12;

export function convertDate(date){
  if(date && date.match(/\d{4}(\-\d{2}){2}T/)){
    return moment(new Date(date)).format('YYYY-MM-DD');
  }
  return date;
}

export function isListSame(array1, array2){
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}

export function igDate(date){
  const timeDiff = moment().diff(moment(date), 'seconds');
  if(timeDiff / MINUTE <= 1){
    return '1m';
  } else if (timeDiff / HOUR <=1 ){
    return `${Math.floor(timeDiff/MINUTE)}m`;
  } else if (timeDiff / DAY <=1 ){
    return `${Math.floor(timeDiff/HOUR)}h`;
  } else if (timeDiff / WEEK <=1 ){
    return `${Math.floor(timeDiff/DAY)}d`;
  } else {
    return `${Math.floor(timeDiff/WEEK)}w`;
  }
}
