const openinghourShorten = require('./index');

describe('NORMAL', () => {
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
    // const expectResult = 'Sun,Sat 06:30~10:30 12:00~14:30; Mon-Fri 06:30~10:00 11:30~14:00; Sun-Sat 15:30~17:00 18:00~21:30'; TODO:
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
  test('7DAY 24HR', () => {
    const openingHours = [
      { open: { day: 0, time: '0000' } },
    ];
    const expectResult = '24/7';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  test('Single Day', () => {
    const openingHours = [
      { close: { day: 0, time: '1400' }, open: { day: 0, time: '1130' } },
    ];
    const expectResult = 'Sun 11:30~14:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
});

describe('START BY MONDAY', () => {
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
    const expectResult = 'Mon-Sun 11:00~21:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Fri 11:00~21:00; Sat,Sun 10:00~22:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Thu 11:00~21:00; Fri 11:00~22:00; Sat 10:00~22:00; Sun 10:00~21:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon 11:00~21:00; Tue 12:00~21:00; Wed 10:00~20:00; Thu 11:00~20:00; Fri 12:00~20:00; Sat 10:00~22:00; Sun 10:00~21:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Thu,Sat 11:00~21:00; Fri 11:00~22:00; Sun 10:00~21:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon,Tue,Thu-Sun 11:00~21:00; Wed 11:00~23:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Thu,Sun 18:00~00:00; Fri,Sat 18:00~01:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Fri 06:30~10:00 11:30~14:00; Mon-Sun 15:30~17:00 18:00~21:30; Sat,Sun 06:30~10:30 12:00~14:30';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Tue-Sun 11:30~14:00 18:00~00:00';
    expect(openinghourShorten(openingHours, { startByMonday: true })).toBe(expectResult);
  });
});

describe('12 HOUR FORMAT', () => {
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
    const expectResult = 'Mon-Sun 11:00AM~09:00PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Fri 11:00AM~09:00PM; Sat,Sun 10:00AM~10:00PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Thu 11:00AM~09:00PM; Fri 11:00AM~10:00PM; Sat 10:00AM~10:00PM; Sun 10:00AM~09:00PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon 11:00AM~09:00PM; Tue 12:00PM~09:00PM; Wed 10:00AM~08:00PM; Thu 11:00AM~08:00PM; Fri 12:00PM~08:00PM; Sat 10:00AM~10:00PM; Sun 10:00AM~09:00PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Thu,Sat 11:00AM~09:00PM; Fri 11:00AM~10:00PM; Sun 10:00AM~09:00PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon,Tue,Thu-Sun 11:00AM~09:00PM; Wed 11:00AM~11:00PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Thu,Sun 06:00PM~12:00AM; Fri,Sat 06:00PM~01:00AM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Fri 06:30AM~10:00AM 11:30AM~02:00PM; Mon-Sun 03:30PM~05:00PM 06:00PM~09:30PM; Sat,Sun 06:30AM~10:30AM 12:00PM~02:30PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Mon-Sat 11:30AM~02:00PM 05:30PM~09:00PM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
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
    const expectResult = 'Tue-Sun 11:30AM~02:00PM 06:00PM~12:00AM';
    expect(openinghourShorten(openingHours, { format12Hr: true, startByMonday: true })).toBe(expectResult);
  });
});


describe('ERROR HANDLE', () => {
  test('undefined', () => {
    const expectResult = '';
    expect(openinghourShorten()).toBe(expectResult);
  });
  test('null', () => {
    const expectResult = '';
    expect(openinghourShorten(null)).toBe(expectResult);
  });
  test('error format', () => {
    const openingHours = 'openingHours';
    const expectResult = '';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
});
