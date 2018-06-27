const Immutable = require('immutable');
const {
  isContinue,
  dateToName,
  timeFormat,
  time12hrFormat,
} = require('./helper');

describe('isContinue', () => {
  test('continue', () => {
    const array = Immutable.fromJS([1,2,3]);
    expect(isContinue(array)).toBeTruthy();
  });
  test('discrete', () => {
    const array = Immutable.fromJS([1,3,5]);
    expect(isContinue(array)).toBeFalsy();
  });
  test('two element should not be consider as continue', () => {
    const array = Immutable.fromJS([1, 2]);
    expect(isContinue(array)).toBeFalsy();
  });
  test('single', () => {
    const array = Immutable.fromJS([1]);
    expect(isContinue(array)).toBeFalsy();
  });
  test('not array', () => {
    expect(isContinue('')).toBeFalsy();
    expect(isContinue('string')).toBeFalsy();
    expect(isContinue({})).toBeFalsy();
  });
});

describe('dateToName', () => {
  test('normal', () => {
    expect(dateToName(0)).toBe('Sun');
    expect(dateToName(1)).toBe('Mon');
    expect(dateToName(2)).toBe('Tue');
    expect(dateToName(3)).toBe('Wed');
    expect(dateToName(4)).toBe('Thu');
    expect(dateToName(5)).toBe('Fri');
    expect(dateToName(6)).toBe('Sat');
  });
  test('handle error input', () => {
    expect(dateToName()).toBe('');
    expect(dateToName('1')).toBe('');
    expect(dateToName('a')).toBe('');
  });
});
describe('timeFormat', () => {
  test('normal', () => {
    expect(timeFormat('0900')).toBe('09:00');
    expect(timeFormat('2100')).toBe('21:00');
  });
  test('handle error input', () => {
    expect(timeFormat()).toBe('');
    expect(timeFormat('900')).toBe('');
    expect(timeFormat(900)).toBe('');
  });
});
describe('time12hrFormat', () => {
  test('normal', () => {
    expect(time12hrFormat('0009')).toBe('12:09AM');
    expect(time12hrFormat('0909')).toBe('09:09AM');
    expect(time12hrFormat('1209')).toBe('12:09PM');
    expect(time12hrFormat('2109')).toBe('09:09PM');
  });
  test('handle error input', () => {
    expect(time12hrFormat()).toBe('');
    expect(time12hrFormat('900')).toBe('');
    expect(time12hrFormat(900)).toBe('');
  });
});
