function getDate(secNone) {
  const date = new Date();
  let nowTime = '';
  let [year, month, nowDate, hours, minutes, seconds] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ];
  if (year < 10) {
    year = `0${year}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  if (nowDate < 10) {
    nowDate = `0${nowDate}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  switch (true) {
    case secNone === 'haveSec':
      nowTime = `${year}/${month}/${nowDate} ${hours}:${minutes}:${seconds}`;
      break;
    case secNone === 'noneSec':
      nowTime = `${year}/${month}/${nowDate} ${hours}:${minutes}`;
      break;

    case secNone === 'justDate':
      nowTime = `${year}/${month}/${nowDate}`;
      break;
  }
  return nowTime;
}

module.exports = getDate;
