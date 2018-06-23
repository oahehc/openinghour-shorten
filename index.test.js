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
      { close: { day: 6, time: '2100' }, open: { day: 6, time: '1100' } }
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
      { close: { day: 6, time: '2200' }, open: { day: 6, time: '1000' } }
    ];
    const expectResult = 'Sat&Sun 10:00~22:00; Mon-Fri 11:00~21:00';
    expect(openinghourShorten(openingHours)).toBe(expectResult);
  });
  // partial continue

  // discrete

});

// describe('ERROR HANDLE', () => {
//   test('undefined', () => {
//     const openingHours;
//     const expectResult = null;
//     expect(openinghourShorten(openingHours)).toBe(expectResult);
//   });
// });