# openinghour-shorten
[![Build Status](https://travis-ci.org/oahehc/openinghour-shorten.svg?branch=master)](https://travis-ci.org/oahehc/openinghour-shorten) [![Coverage Status](https://coveralls.io/repos/github/oahehc/openinghour-shorten/badge.svg?branch=master)](https://coveralls.io/github/oahehc/openinghour-shorten?branch=master)
### shorten google map opening hour data


## Install
```
$ npm install --save openinghour-shorten
$ yarn add openinghour-shorten
```


## Usage

```js
import openinghourShorten from 'openinghour-shorten';
//OR const openinghourShorten = require('openinghour-shorten');

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

openinghourShorten(openingHour, { startByMonday: true });
//=> Mon-Thu 11:00~21:00; Fri 11:00~22:00; Sat 10:00~22:00; Sun 10:00~21:00

openinghourShorten(openingHour, { format12Hr: true });
//=> Sun 10:00AM~09:00PM; Mon-Thu 11:00AM~09:00PM; Fri 11:00AM~10:00PM; Sat 10:00AM~10:00PM
```

## What's Next


## License
MIT © [Oahehc](https://github.com/oahehc)


## Contributors
