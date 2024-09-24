# Python-style datetime handling lib for TypeScript

This tiny lib emulates most of the main functions of [Python's datetime lib](https://docs.python.org/3.12/library/datetime.html) to simplify datetime handling in TypeScript that is notoriously cumbersome in this regard.
It tries to stay as close to the python API as possible - ideal if you are working with both Python and TS projects.
Hope you'll find it useful!

# Install

`npm install ts-py-datetime`

# Demo

```typescript
import dt from 'ts-py-datetime';

const now = dt.datetime.now();
const today = dt.datetime.combine(now, dt.time());
console.log('Now:', now.strftime('%Y-%m-%d %H:%M:%S'));
console.log('Today:', today.strftime('%Y-%m-%d'));
console.log(
  'Minutes since midnight:',
  dt.timedelta(now - today).valueOf() / 60,
);
```

# A few gotchas

- `dt.timedelta(days, [seconds, [milliseconds..)` constructor can't really guess whether you are passing in a day or a result from date math (as dt - dt in javascript will return an int), so if the input number is under 900 we treat it as days, but otherwise it's seconds. For most cases this should work just fine, but where disambiguation is required, you can be be explicit about it: `dt.timedelta({days: ..})` and `dt.timedelta({seconds: ..}), respectively.
- use `.str()` to get string representation of the object. JavaScript's `toString()` will return Unix epoch.

# List of supported functions

Note: all objects evaluate to seconds, meaning `dt.datetime.now() + 0` will give you time in Unix epoch. you can also call
`<object>.toString()` directly.

## `dt.datetime`

| Function             | Arguments                                           | Description                                                                                                                                                                                                                                                         |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dt.datetime          | year, month, day, hour, minute, second, millisecond | gets you a brand new datetime                                                                                                                                                                                                                                       |
| dt.datetime          | jsDate                                              | you can also pass in a JavaScript Date object                                                                                                                                                                                                                       |
| dt.datetime          | unixEpoch                                           | this will also work                                                                                                                                                                                                                                                 |
| dt.datetime          | datetime                                            | this will clone an existing datetime object                                                                                                                                                                                                                         |
| dt.datetime.strptime | dateString, format, utc                             | parse given date string into a new datetime. Format uses posix parsing see [d3-time-format](https://github.com/d3/d3-time-format#locale_format) for details. The third parameter is an optional boolean. When set to true, dateString will be assumed to be in UTC. |
| dt.datetime.now      |                                                     | return current time                                                                                                                                                                                                                                                 |
| dt.datetime.utcnow   |                                                     | return current time in UTC                                                                                                                                                                                                                                          |
| dt.datetime.combine  | date, time                                          | combines passed in `dt.date` or `dt.datetime` with the passed in `dt.time` to create a new datetime                                                                                                                                                                 |
| datetime.replace     | year, month, day, hour, minute, second, millisecond | returns a new datetime with items replaced as requested                                                                                                                                                                                                             |
| datetime.jsDate      |                                                     | property returns JavaScript Date object representing the datetime                                                                                                                                                                                                   |
| datetime.str         |                                                     | returns analog of python's `str(datetime)` which is `%Y-%m-%d %H:%M:%S.%f`                                                                                                                                                                                          |

## `dt.date`

| Function     | Arguments        | Description                                                       |
| ------------ | ---------------- | ----------------------------------------------------------------- |
| dt.date      | year, month, day | creates a, well, timeless object, all three params are mandatory  |
| date.jsDate  |                  | property returns JavaScript Date object representing the datetime |
| datetime.str |                  | returns analog of python's `str(date)`, which is `%Y-%m-%d`       |

## `dt.time`

| Function | Arguments                         | Description                                                    |
| -------- | --------------------------------- | -------------------------------------------------------------- |
| dt.time  | hour, minute, second, millisecond | return a new time object                                       |
| dt.time  | time                              | clone an existing dt.time object                               |
| time.str |                                   | returns analog of python's `str(time)`, which is `%H:%M:%S.%f` |

## `dt.timedelta`

| Function          | Arguments                                          | Description                                                                                                                                                                        |
| ----------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dt.timedelta      | days, seconds, milliseconds, minutes, hours, weeks | return a new time object. the param order is not random and matches python.                                                                                                        |
| dt.timedelta      | seconds                                            | this will work if seconds is > 900. will initiate the timedelta object from seconds. this is so you can do `dt.timedelta(dateA - dateB)`. See gotchas higher up for the 900 thing. |
| timedelta.valueOf |                                                    | returns total seconds between the two times.                                                                                                                                       |
| timedelta.str     |                                                    | returns analog of python's `str(time)`, which is `%H:%M:%S.%f`                                                                                                                     |

# Dealing with UTC

ts-py-datetime is timezone naive, but dates and times around daylight savings can get bit iffy. There are two functions
that help mitigate that

- `dt.datetime.utc` - pass in JS datetime in UTC timezone or unix epoch. the datetime object will be marked as operating in UTC
- `dt.datetime.strptime` - if you pass in the date string in UTC, make sure to specify the third optional param to `true`.
  from there on out this date object will be marked as operating in UTC.

Be mindful around datemath, e.g. `z = dt.datetime(dt.datetime.utc(someDate) + dt.timedelta(1))` will lose the UTC information, so
you should do `z = dt.datetime.utc(dt.datetime.utc(someDate) + dt.timedelta(1))`.
The API is bit sucky at the moment, so if you have any good ideas - pull requests welcome!

