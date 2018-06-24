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
  test('multiple continue range in same group', () => {
    const openingHours = [
      { close: { day: 0, time: '2100' }, open: { day: 0, time: '1100' } },
      { close: { day: 1, time: '2100' }, open: { day: 1, time: '1100' } },
      { close: { day: 2, time: '2100' }, open: { day: 2, time: '1100' } },
      { close: { day: 3, time: '2300' }, open: { day: 3, time: '1100' } },
      { close: { day: 4, time: '2100' }, open: { day: 4, time: '1100' } },
      { close: { day: 5, time: '2100' }, open: { day: 5, time: '1100' } },
      { close: { day: 6, time: '2100' }, open: { day: 6, time: '1100' } },
    ];
    const expectResult = 'Sun-Tue,Thu-Sat 11:00~21:00; Wed 11:00~23:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('overnight', () => {
    const openingHours = [
      { close: { day: 1, time: '0000' }, open: { day: 0, time: '1800' } },
      { close: { day: 2, time: '0000' }, open: { day: 1, time: '1800' } },
      { close: { day: 3, time: '0000' }, open: { day: 2, time: '1800' } },
      { close: { day: 4, time: '0000' }, open: { day: 3, time: '1800' } },
      { close: { day: 5, time: '0000' }, open: { day: 4, time: '1800' } },
      { close: { day: 6, time: '0100' }, open: { day: 5, time: '1800' } },
      { close: { day: 0, time: '0100' }, open: { day: 6, time: '1800' } },
    ];
    const expectResult = 'Sun-Thu 18:00~00:00; Fri,Sat 18:00~01:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('multiple time period', () => {
    const openingHours = [
      { close: { day: 0, time: '1030' }, open: { day: 0, time: '0630' } },
      { close: { day: 0, time: '1430' }, open: { day: 0, time: '1200' } },
      { close: { day: 0, time: '1700' }, open: { day: 0, time: '1530' } },
      { close: { day: 0, time: '2130' }, open: { day: 0, time: '1800' } },
      { close: { day: 1, time: '1000' }, open: { day: 1, time: '0630' } },
      { close: { day: 1, time: '1400' }, open: { day: 1, time: '1130' } },
      { close: { day: 1, time: '1700' }, open: { day: 1, time: '1530' } },
      { close: { day: 1, time: '2130' }, open: { day: 1, time: '1800' } },
      { close: { day: 2, time: '1000' }, open: { day: 2, time: '0630' } },
      { close: { day: 2, time: '1400' }, open: { day: 2, time: '1130' } },
      { close: { day: 2, time: '1700' }, open: { day: 2, time: '1530' } },
      { close: { day: 2, time: '2130' }, open: { day: 2, time: '1800' } },
      { close: { day: 3, time: '1000' }, open: { day: 3, time: '0630' } },
      { close: { day: 3, time: '1400' }, open: { day: 3, time: '1130' } },
      { close: { day: 3, time: '1700' }, open: { day: 3, time: '1530' } },
      { close: { day: 3, time: '2130' }, open: { day: 3, time: '1800' } },
      { close: { day: 4, time: '1000' }, open: { day: 4, time: '0630' } },
      { close: { day: 4, time: '1400' }, open: { day: 4, time: '1130' } },
      { close: { day: 4, time: '1700' }, open: { day: 4, time: '1530' } },
      { close: { day: 4, time: '2130' }, open: { day: 4, time: '1800' } },
      { close: { day: 5, time: '1000' }, open: { day: 5, time: '0630' } },
      { close: { day: 5, time: '1400' }, open: { day: 5, time: '1130' } },
      { close: { day: 5, time: '1700' }, open: { day: 5, time: '1530' } },
      { close: { day: 5, time: '2130' }, open: { day: 5, time: '1800' } },
      { close: { day: 6, time: '1030' }, open: { day: 6, time: '0630' } },
      { close: { day: 6, time: '1430' }, open: { day: 6, time: '1200' } },
      { close: { day: 6, time: '1700' }, open: { day: 6, time: '1530' } },
      { close: { day: 6, time: '2130' }, open: { day: 6, time: '1800' } },
    ];
    // const expectResult = 'Sun,Sat 06:30~10:30 12:00~14:30; Mon-Fri 06:30~10:00 11:30~14:00; Sun-Sat 15:30~17:00 18:00~21:30';
    const expectResult = 'Sun,Sat 06:30~10:30 12:00~14:30; Sun-Sat 15:30~17:00 18:00~21:30; Mon-Fri 06:30~10:00 11:30~14:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('with holiday', () => {
    const openingHours = [
      { close: { day: 1, time: '1400' }, open: { day: 1, time: '1130' } },
      { close: { day: 1, time: '2100' }, open: { day: 1, time: '1730' } },
      { close: { day: 2, time: '1400' }, open: { day: 2, time: '1130' } },
      { close: { day: 2, time: '2100' }, open: { day: 2, time: '1730' } },
      { close: { day: 3, time: '1400' }, open: { day: 3, time: '1130' } },
      { close: { day: 3, time: '2100' }, open: { day: 3, time: '1730' } },
      { close: { day: 4, time: '1400' }, open: { day: 4, time: '1130' } },
      { close: { day: 4, time: '2100' }, open: { day: 4, time: '1730' } },
      { close: { day: 5, time: '1400' }, open: { day: 5, time: '1130' } },
      { close: { day: 5, time: '2100' }, open: { day: 5, time: '1730' } },
      { close: { day: 6, time: '1400' }, open: { day: 6, time: '1130' } },
      { close: { day: 6, time: '2100' }, open: { day: 6, time: '1730' } },
    ];
    const expectResult = 'Mon-Sat 11:30~14:00 17:30~21:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('overnight + multiple time period + holiday', () => {
    const openingHours = [
      { close: { day: 0, time: '1400' }, open: { day: 0, time: '1130' } },
      { close: { day: 1, time: '0000' }, open: { day: 0, time: '1800' } },
      { close: { day: 2, time: '1400' }, open: { day: 2, time: '1130' } },
      { close: { day: 3, time: '0000' }, open: { day: 2, time: '1800' } },
      { close: { day: 3, time: '1400' }, open: { day: 3, time: '1130' } },
      { close: { day: 4, time: '0000' }, open: { day: 3, time: '1800' } },
      { close: { day: 4, time: '1400' }, open: { day: 4, time: '1130' } },
      { close: { day: 5, time: '0000' }, open: { day: 4, time: '1800' } },
      { close: { day: 5, time: '1400' }, open: { day: 5, time: '1130' } },
      { close: { day: 6, time: '0000' }, open: { day: 5, time: '1800' } },
      { close: { day: 6, time: '1400' }, open: { day: 6, time: '1130' } },
      { close: { day: 0, time: '0000' }, open: { day: 6, time: '1800' } },
    ];
    const expectResult = 'Sun,Tue-Sat 11:30~14:00 18:00~00:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
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
