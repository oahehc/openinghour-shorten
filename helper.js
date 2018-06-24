const WeekdayShortName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

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
};
