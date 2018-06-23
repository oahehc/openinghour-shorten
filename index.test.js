const openinghourShorten = require('./index');

describe('NORMAL CASE', () => {
  test('all same period', () => {
    const openingHours = [
      { close: { day: 0, time: '2100' }, open: { day: 0, time: '1100' } },
      { close: { day: 1, time: '2100' }, open: { day: 1, time: '1100' } },
      { close: { day: 2, time: '2100' }, open: { day: 2, time: '1100' } },
      { close: { day: 3, time: '2100' }, open: { day: 3, time: '1100' } },
      { close: { day: 4, time: '2100' }, open: { day: 4, time: '1100' } },
      { close: { day: 5, time: '2100' }, open: { day: 5, time: '1100' } },
      { close: { day: 6, time: '2100' }, open: { day: 6, time: '1100' } },
    ];
    const expectResult = 'Sun-Sat 11:00~21:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('weekday AND weekend', () => {
    const openingHours = [
      { close: { day: 0, time: '2200' }, open: { day: 0, time: '1000' } },
      { close: { day: 1, time: '2100' }, open: { day: 1, time: '1100' } },
      { close: { day: 2, time: '2100' }, open: { day: 2, time: '1100' } },
      { close: { day: 3, time: '2100' }, open: { day: 3, time: '1100' } },
      { close: { day: 4, time: '2100' }, open: { day: 4, time: '1100' } },
      { close: { day: 5, time: '2100' }, open: { day: 5, time: '1100' } },
      { close: { day: 6, time: '2200' }, open: { day: 6, time: '1000' } },
    ];
    const expectResult = 'Sun,Sat 10:00~22:00; Mon-Fri 11:00~21:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('partial continue', () => {
    const openingHours = [
      { close: { day: 0, time: '2100' }, open: { day: 0, time: '1000' } },
      { close: { day: 1, time: '2100' }, open: { day: 1, time: '1100' } },
      { close: { day: 2, time: '2100' }, open: { day: 2, time: '1100' } },
      { close: { day: 3, time: '2100' }, open: { day: 3, time: '1100' } },
      { close: { day: 4, time: '2100' }, open: { day: 4, time: '1100' } },
      { close: { day: 5, time: '2200' }, open: { day: 5, time: '1100' } },
      { close: { day: 6, time: '2200' }, open: { day: 6, time: '1000' } },
    ];
    const expectResult = 'Sun 10:00~21:00; Mon-Thu 11:00~21:00; Fri 11:00~22:00; Sat 10:00~22:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('discrete', () => {
    const openingHours = [
      { close: { day: 0, time: '2100' }, open: { day: 0, time: '1000' } },
      { close: { day: 1, time: '2100' }, open: { day: 1, time: '1100' } },
      { close: { day: 2, time: '2100' }, open: { day: 2, time: '1200' } },
      { close: { day: 3, time: '2000' }, open: { day: 3, time: '1000' } },
      { close: { day: 4, time: '2000' }, open: { day: 4, time: '1100' } },
      { close: { day: 5, time: '2000' }, open: { day: 5, time: '1200' } },
      { close: { day: 6, time: '2200' }, open: { day: 6, time: '1000' } },
    ];
    const expectResult = 'Sun 10:00~21:00; Mon 11:00~21:00; Tue 12:00~21:00; Wed 10:00~20:00; Thu 11:00~20:00; Fri 12:00~20:00; Sat 10:00~22:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('partial continue in same group', () => {
    const openingHours = [
      { close: { day: 0, time: '2100' }, open: { day: 0, time: '1000' } },
      { close: { day: 1, time: '2100' }, open: { day: 1, time: '1100' } },
      { close: { day: 2, time: '2100' }, open: { day: 2, time: '1100' } },
      { close: { day: 3, time: '2100' }, open: { day: 3, time: '1100' } },
      { close: { day: 4, time: '2100' }, open: { day: 4, time: '1100' } },
      { close: { day: 5, time: '2200' }, open: { day: 5, time: '1100' } },
      { close: { day: 6, time: '2100' }, open: { day: 6, time: '1100' } },
    ];
    const expectResult = 'Sun 10:00~21:00; Mon-Thu,Sat 11:00~21:00; Fri 11:00~22:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  // multiple continue range in same group

});

describe('ERROR HANDLE', () => {
  test('undefined', () => {
    const expectResult = null;
    expect(openinghourShorten()).toBe(expectResult);
  });
  test('null', () => {
    const expectResult = null;
    expect(openinghourShorten(null)).toBe(expectResult);
  });
  test('error format', () => {
    const openingHours = 'openingHours';
    const expectResult = null;
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
});