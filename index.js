const Immutable = require('immutable');
const {
  isContinue,
  dateToName,
} = require('./helper');


const timeFormat = (t) => `${t.slice(0, 2)}:${t.slice(2, 4)}`;
const dateFormat = (dateList) => {
  // TODO: handle continue day
  if (isContinue(dateList)) {
    return `${dateList.map(dateToName).first()}-${dateList.map(dateToName).last()}`;
  }
  return dateList.map(dateToName).join(',');
};

/**
 * @param {array} openingHours
 * 
 * @return {string}
 */
module.exports = function(openingHours) {
  if (!openingHours) {
    console.error('openingHours not follow google map format');
    return null;
  }
  try {
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
      .join('; ');
  } catch (error) {
    console.error(error);
    return null;
  }
};