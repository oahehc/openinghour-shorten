const Immutable = require('immutable');
const {
  isContinue,
  dateToName,
} = require('./helper');


const timeFormat = (t) => `${t.slice(0, 2)}:${t.slice(2, 4)}`;
const dateFormat = (dateList) => {
  return dateList
    // group continue day: [[0,1,2], [4, 5]]
    .reduce((res, date) => {
      const index = res.reduce((i, arr, idx) => {
        const findIndex = arr.findIndex((ele) => ele === (date - 1));
        return findIndex > -1 ? idx : i;
      }, -1);
      return (index > -1) ? res.set(index, res.get(index).push(date)) : res.push(Immutable.fromJS([date]));
    }, Immutable.List())
    // continue group remove middle elements, split if only two elements: [[0,2], [4], [5]]
    .reduce((newList, list) => {
      if (list.size === 2) {
        return newList.push(Immutable.fromJS([list.get(0)])).push(Immutable.fromJS([list.get(1)]));
      } else if (list.size > 2) {
        return newList.push(Immutable.fromJS([list.first(), list.last()]))
      }
      return newList.push(list);
    }, Immutable.List())
    // mapping to name
    .map((list) => list.map(dateToName).join('-')).join(',');
  // if (isContinue(dateList)) {
  //   return `${dateList.map(dateToName).first()}-${dateList.map(dateToName).last()}`;
  // }
  // return dateList.map(dateToName).join(',');
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
        return Immutable.fromJS({
          time,
          date,
        });
      })
      .reduce((list, group) => list.set(group.get('date'), list.get(group.get('date'), Immutable.List()).push(group.get('time'))), Immutable.Map())
      .map((group, date) => `${date} ${group.join(' ')}`)
      .join('; ');
  } catch (error) {
    // TODO: error handle
    console.error(error);
    return null;
  }
};