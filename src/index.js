const Immutable = require('immutable');
const {
  dateToName,
  timeFormat,
  time12hrFormat,
} = require('./helper');


const dateFormat = dateList => (
  dateList
    // group continue day: [[0,1,2], [4, 5]]
    .reduce((res, date) => {
      const index = res.reduce((i, arr, idx) => {
        const findIndex = arr.findIndex(ele => ele === (date - 1));
        return findIndex > -1 ? idx : i;
      }, -1);
      return (index > -1) ? res.set(index, res.get(index).push(date)) : res.push(Immutable.fromJS([date]));
    }, Immutable.List())
    // continue group remove middle elements, split if only two elements: [[0,2], [4], [5]]
    .reduce((newList, list) => {
      if (list.size === 2) {
        return newList.push(Immutable.fromJS([list.get(0)])).push(Immutable.fromJS([list.get(1)]));
      }
      if (list.size > 2) {
        return newList.push(Immutable.fromJS([list.first(), list.last()]));
      }
      return newList.push(list);
    }, Immutable.List())
    // mapping to name
    .map(list => list.map(dateToName).join('-')).join(',')
);

/**
 * @param {array} openingHours
 * 
 * @return {string}
 */
module.exports = (openingHours, options = {}) => {
  if (!openingHours) {
    console.error('openingHours not follow google map format');
    return '';
  }
  if (openingHours.length === 1) {
    const hour = openingHours[0];
    if (hour.open && hour.open.day === 0 && hour.open.time === '0000' && !hour.close) {
      return '24/7';
    }
  }
  try {
    let immutableOpeningHours = Immutable.fromJS(openingHours);
    if (options.startByMonday) {
      immutableOpeningHours = immutableOpeningHours.map((hour) => {
        if (hour.getIn(['open', 'day']) === 0) {
          return hour.setIn(['open', 'day'], 7);
        }
        return hour;
      }).sortBy(hour => hour.getIn(['open', 'day']));
    }
    return immutableOpeningHours
      // group by open & close time
      .reduce((group, hour) => {
        const index = `${hour.getIn(['open', 'time'], '')}_${hour.getIn(['close', 'time'], '')}`;
        return group.set(index, group.get(index, Immutable.List()).push(hour));
      }, Immutable.Map())
      // collect day number
      .map(group => group.map(hour => (hour.getIn(['open', 'day'], hour.getIn(['close', 'day'])))))
      // clock format adjust
      .map((group, key) => (
        Immutable.fromJS({
          time: (options.format12Hr) ? key.split('_').map(time12hrFormat).join('~') : key.split('_').map(timeFormat).join('~'),
          date: dateFormat(group),
        })
      ))
      // group equal date
      .reduce((list, group) => list.set(group.get('date'), list.get(group.get('date'), Immutable.List()).push(group.get('time'))), Immutable.Map())
      .map((group, date) => `${date} ${group.join(' ')}`)
      .join('; ');
  } catch (error) {
    // TODO: error handle
    console.error(error);
    return '';
  }
};
