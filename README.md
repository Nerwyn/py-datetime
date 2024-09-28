# Python-style datetime handling lib for TypeScript

This tiny lib emulates most of the main functions of [Python's datetime lib](https://docs.python.org/3.12/library/datetime.html) to simplify datetime handling in TypeScript that is notoriously cumbersome in this regard.
It tries to stay as close to the python API as possible - ideal if you are working with both Python and TS projects.
Hope you'll find it useful!

This project is a fork of [py-datetime](https://github.com/tstriker/py-datetime). It ports the project to TypeScript and adds many more functions and constants from the Python datetime module.

# Install

`npm install ts-py-datetime`

# Demo

```typescript
import dt from 'ts-py-datetime'; // const { default: dt } = await import("./src/index.ts"); in a REPL

const now = dt.datetime.now();
const today = dt.datetime.combine(now, dt.time());
console.log('Now:', now.strftime('%Y-%m-%d %H:%M:%S'));
console.log('Today:', today.strftime('%Y-%m-%d'));
console.log(
  'Minutes since midnight:',
  dt.timedelta(now - today).valueOf() / 60,
);
```

## Pythonic Syntax

JavaScript/TypeScript does not support keyword arguments like Python does. As an alternative for any function that has multiple optional inputs, the first input can instead be an object with keys with the same names as the arguments.

In order to be as close to the Python datetime module as possible, any externally exposed variables, properties, and methods use Python style naming conventions instead of JavaScript/TypeScript ones. Such as `date_string` instead of `dateString` or `total_seconds()` instead of `totalSeconds()`.

# `dt.timedelta` Objects

A `timedelta` object represents a duration, the difference betwee two `datetime` or `date` instances.

## _class_ dt.**timedelta(**{ days: 0, seconds: 0, milliseconds: 0, minutes: 0, hours: 0, weeks: 0 }**)**

All arguments are optional and default to 0. Arguments may be integers or floats, and may be positive or negative.

Only _days_, _seconds_, and _milliseconds_ are stored internally. Arguments are converted to those units:

- A minute is converted to 60 seconds.
- An hour is conveted to 3600 seconds.
- A week is converted to 7 days.

and days, seconds, and milliseconds are then normalized so that the representation is unique, with

- `0 <= milliseconds < 1000`
- `0 <= seconds < 36000*24`
- `-999999999 <= days < 999999999`

The following example illustrates how any arguments besides _days_, _seconds_ and _milliseconds_ are "merged" and normalized into those three resulting attributes:

```typescript
import dt from 'ts-py-datetime';
const delta = dt.timedelta({
  days: 50,
  seconds: 27,
  milliseconds: 29100,
  minutes: 5,
  hours: 8,
  weeks: 2,
});
//  Only days, seconds, and microseconds remain
console.log(delta);
...
timedelta { days: 64, seconds: 29156, milliseconds: 100 }
```

Any fractional milliseconds are lost, as JavaScript Date objects only support millisecond precision.

If the normalized total seconds lies outside the min and max timedelta range, `RangeError` is thrown.

## Class properties

### dt.timedelta.**min**

The most negative `timedelta` object, `timedelta(-999999999)`

### dt.timedelta.**max**

The most positive `timedelta` object, `timedelta({ days: 999999999, hours: 23, minutes: 59, seconds: 59, milliseconds: 999 })`

### dt.timedelta.**resolution**

The smallest possible difference between non-equal `timedelta` objects, `timedelta({ milliseconds: 1 })`

## Instance properties (read-only):

### dt.timedelta.**days**

Between -999,999,999 and 999,999,999 inclusive.

### dt.timedelta.**seconds**

Between 0 and 86,399 inclusive.

### dt.timedelta.**milliseconds**

Between 0 and 999 inclusive.

## Supported operations

Timedelta objects can be added or subtracted to each other or to date, time, or datetime objects. Any of these operations will return a number, which can then be cast back to one of these objects using their constructors or static methods.

```typescript
const delta = dt.timedelta({ days: 31 });
const datetime = dt.datetime(2013, 10, 1, 12, 11, 10);
console.log(datetime.fromtimestamp(datetime + delta));
...
datetime {
  year: 2013,
  month: 11,
  day: 1,
  hour: 12,
  minute: 11,
  second: 10,
  millisecond: 0,
  utc: false
}
```

## Instance methods

### dt.timedelta.**total_seconds()**

Return the total number of seconds contained in the duration.

### dt.timedelta.**valueOf()**

For a timedelta _delta_, `delta.valueOf()` is equivalent to `delta.total_seconds()`.

### dt.timedelta.**toString()**

Return the days, hours, minutes, seconds, and milliseconds of the timedelta in a string format. If the timedelta is less than one day then days is not included. If the timdelta does not have a millisecond component then it is also not included.

# `dt.date` Objects

A `date` object represents a date (year, month, and day) in an idealized calendar, the current Gregorian calendar indefinitely extended in both directions.

January 1 of year 1 is called day number 1, January 2 of year 1 is called day number 2, and so on. Because of JavaScript Date limitations, the minimum year is 100. The maximum year is still 9999.

## _class_ dt.**date(**year, month, day**)**

All arguments are required. Arguments must be integers, in the following ranges:

- `MINYEAR <= year < MAXYEAR`
- `1 <= month <= 12`
- `1 <= day <= number of days in the given month and year`

If an argument is outside those ranges is given, `RangeError` is thrown.

## Other static method constructors

### _static method_ dt.date.**today()**

Return the current local date.

### _static method_ dt.date.**fromtimestamp(**_timestamp_**)**

Return the local date corresponding to the POSIX timestamp.

### _static method_ dt.date.**fromoridinal(**_ordinal_**)**

Return the date corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has ordinal 1.

The `MINYEAR` restriction of year 100 still applies, and any ordinal below 36160 or above 3652059 wil throw a `RangeError`.

### _static method_ dt.date.**fromisoformat(**_date_string_**)**

Return a `date` corresponding to a _date_string_ given in the ISO 8601 format `YYYY-MM-DD`.

### _static_method_ dt.date.**fromisocalendar(**_year_, _week_, _day_**)**

Return a `date` corresponding to the ISO calendar date specified by year, week, and day. This is the inverse of the function `date.isocalendar()`

_This function does not seem to work correctly, possibly due to an issue with [d3-time-format](https://d3js.org/d3-time-format)_.

## Class properties

### dt.date.**min**

The earliest representable date, `date(MINYEAR, 1, 1)`.

### dt.date.**max**

The latest representable date, `date(MAXYEAR, 12, 31)`.

### dt.date.**resolution**

The smallest possible difference between non-equal date objects, `timedelta({ days: 1 }).

## Instance properties (read-only)

### dt.date.**year**

Between `MINYEAR` and `MAXYEAR` exclusive.

### dt.date.**month**

Between 1 and 12 inclusive.

### dt.date.**day**

Between 1 and the number of days in the given month of the given year.

## Supported Operations

Date objects can be added or subtracted with timedelta objects or logically compared to other date objects. As said above all timedelta object arithmetic returns seconds which can be used to construct other objects.

```typescript
const delta = dt.timedelta({ days: 1000 })
const date = dt.date({ 2006, 6, 11 })
console.log(dt.date.fromtimestamp(date - delta))
...
date { year: 2003, month: 9, day: 15 }
```

```typescript
const date1 = dt.date({ 2006, 6, 11 })
const date2 = dt.date({ 2007, 7, 2 })
console.log(date1 < date2)
...
true
```

## Instance methods

### dt.date.**replace(**{ _year:_ _this.year,_ _month:_ _this.month,_ _day:_ _this.day_ }**)**

Return a date with the same value, except for those parameters given new values by whichever arguments are specified.

### dt.date.**toordinal()**

Return the proleptic Gregorian ordinal ofthe date, where January 1 of year 1 has ordinal 1. For any `date` object _d_, `dt.date.fromordinal(d.toordinal()) == d`

The `MINYEAR` restriction of year 100 still applies, and any ordinal below 36160 or above 3652059 wil throw a `RangeError`.

### dt.date.**weekday()**

Return the day of the week as an integer, where Monday is 0 and Sunday is 6. For example, `dt.date(2002, 12, 4).weekday() == 2`, a Wednesday.

### dt.date.**isoweekday()**

Return the day of the week as an integer, where Monday is 1 and Sunday is 7. For example, `dt.date(2002, 12, 4).isoweekday() == 3`, a Wednesday.

### dt.date.**isocalendar()**

Return an array with three components: `year`, `week`, and `weekday`.

The ISO calendar is a widely used variant of the Gregorian calendar.

The ISO year consists of 52 or 53 full weeks, and where a week starts on a Monday and ends on a Sunday. The first week of an ISO year is the first (Gregorian) calendar week of a year containing a Thursday. This is called week number 1, and the ISO year of that Thursday is the same as its Gregorian year.

_This function does not seem to work correctly, possibly due to an issue with [d3-time-format](https://d3js.org/d3-time-format)_.

### dt.date.**isoformat()**

Return a string representing the date in ISO 8601 format, `YYYY-MM-DD`.

### dt.date.**valueOf()**

Return the POSIX timestamp of the date, assuming it's time is midnight.

### dt.date.**toString()**

For a date _d_, `d.toString()` is equivalent to `d.isoformat()`.

### dt.date.**ctime()**

Return a string representing the date, such as `Wed Dec  4 00:00:00 2002`.

### dt.date.**strftime**(_format_**)**

Return a string representing the date, controlled by an explicit format string. Format codes referring to hours, minutes, or seconds will see 0 values.

# `dt.datetime` Objects

A `datetime` object is a single object containing all the information from a `date` object and a `time` object.

Like a `date` object, `datetime` assumes the current Gregorian calendar extended in both directions; like a `time` object, `datetime` assumes there are exactly 3600\*24 seconds in every day.

## _class_ dt.**datetime(**{ year, month, day, hour: 0, minute: 0, second: 0, millisecond: 0, utc: false }**)**

The _year_, _month_, and _day_ arguments are required. The remaining arguments must be integers in the following ranges:

- `MINYEAR <= year <= MAXYEAR`
- `1 <= month <= 12`
- `1 <= day <= number of days in the given month and year`
- `0 <= hour < 24`
- `0 <= minute < 60`
- `0 <= second < 60`
- `0 <= millisecond < 1000`

If _utc_ is set to true, then the datetime will be treated as UTC. Otherwise it will use the local time.

## Other static method constructors

### _static method_ dt.datetime.**today()**

Return the current local date and time.

### _static_method_ dt.datetime.**now()**

Return the current local date and time. Functionally equivalent to `dt.datetime.today()` but is considered the preferred syntax.
