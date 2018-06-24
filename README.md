# openinghour-shorten [![Build Status](https://travis-ci.org/oahehc/openinghour-shorten.svg?branch=develop)](https://travis-ci.org/oahehc/openinghour-shorten)
### shorten google map opening hour data


## Install
```
$ npm install --save openinghour-shorten
$ yarn add openinghour-shorten
```


## Usage

```js
import openinghourShorten from 'openinghour-shorten';
// const openinghourShorten = require('openinghour-shorten');

// google map api response: result.opening_hours.periods
const openingHour = [
  { close: { day: 0, time: '2100' }, open: { day: 0, time: '1000' } },
  { close: { day: 1, time: '2100' }, open: { day: 1, time: '1100' } },
  { close: { day: 2, time: '2100' }, open: { day: 2, time: '1100' } },
  { close: { day: 3, time: '2100' }, open: { day: 3, time: '1100' } },
  { close: { day: 4, time: '2100' }, open: { day: 4, time: '1100' } },
  { close: { day: 5, time: '2200' }, open: { day: 5, time: '1100' } },
  { close: { day: 6, time: '2200' }, open: { day: 6, time: '1000' } }
];

openinghourShorten(openingHour);
//=> Sun 10:00~21:00; Mon-Thu 11:00~21:00; Fri 11:00~22:00; Sat 10:00~22:00
```


## License
MIT © [Oahehc](https://github.com/oahehc)


## Contributors
