const WeekdayShortName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

module.exports = {
  isContinue: (array) => array.reduce((res, element, index, arr) => {
    if (element - index !== arr.first()) {
      return false;
    }
    return res;
  }, array.size > 1),
  dateToName: (day) => {
    if (Number.isInteger(day) && day >= 0 && day < WeekdayShortName.length) {
      return WeekdayShortName[day];
    }
    return '';
  },
};
