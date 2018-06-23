const Immutable = require('immutable');


/**
 * @param {array} openingHours
 * 
 * @return {string}
 */
module.exports = function(openingHours) {
  return Immutable.fromJS(openingHours)
    // group by open & close time
    .reduce((group, hour) => {
      const index = `${hour.getIn(['open', 'time'], '')}_${hour.getIn(['close', 'time'], '')}`;
      return group.set(index, group.get(index, Immutable.List()).push(hour));
    }, Immutable.Map())
    // day to name
    .map((group) => (
      group.map((hour) => (hour.getIn(['open', 'day'], hour.getIn(['close', 'day']))))
    ))
    // clock format adjust
    .map((group, key) => {
      const time = key.split('_').map(timeFormat).join('~');
      const date = dateFormat(group);
      return `${date} ${time}`;
    })
    .join('; ')
};

const WeekdayShortName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const timeFormat = (t) => `${t.slice(0, 2)}:${t.slice(2, 4)}`;
const dateFormat = (dateList) => {
  // TODO: handle continue day
  if (dateList.size === 2) {
    if (dateList.get(0) === 0 && dateList.get(1) === 6) {
      return dateList.map(dateToName).reverse().join('&');
    }
    return dateList.map(dateToName).join('&');
  }
  if (dateList.size === 7 || (dateList.size === 5 && dateList.get(0) === 1 && dateList.get(4) === 5)) {
    return `${dateList.map(dateToName).first()}-${dateList.map(dateToName).last()}`;
  }
  return dateList.map(dateToName).join(',');
};
const dateToName = (day) => WeekdayShortName[day];
