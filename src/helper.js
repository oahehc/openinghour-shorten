const WeekdayShortName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

module.exports = {
  isContinue: (array) => {
    try {
      return array.reduce((res, element, index, arr) => {
        if (element - index !== arr.first()) {
          return false;
        }
        return res;
      }, array.size > 2);
    } catch (error) {
      return false;
    }
  },
  dateToName: (day) => {
    if (Number.isInteger(day) && day >= 0 && day < WeekdayShortName.length) {
      return WeekdayShortName[day];
    }
    return '';
  },
  timeFormat: (t) => {
    if (!t || t.length !== 4) {
      return '';
    }
    return `${t.slice(0, 2)}:${t.slice(2, 4)}`;
  },
  time12hrFormat: (t) => {
    if (!t || t.length !== 4) {
      return '';
    }
    const hour = t.slice(0, 2);
    const hourNum = parseInt(t.slice(0, 2), 10);
    const min = t.slice(2, 4);
    if (hourNum > 12) {
      const h = `0${hourNum - 12}`.slice(-2);
      return `${h}:${min}PM`;
    }
    if (hourNum === 12) {
      return `${hour}:${min}PM`;
    }
    if (hourNum === 0) {
      return `12:${min}AM`;
    }
    return `${hour}:${min}AM`;
  },
};
