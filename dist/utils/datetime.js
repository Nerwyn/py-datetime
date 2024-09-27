import * as d3 from 'd3-time-format';
import dt from '..';
import { timedelta } from '../classes';
import { datetime } from '../classes/datetime'; // Fixes initialization error
// JS Date thinks two digit years are 1900s, which makes calculating older dates difficult
export const MINYEAR = 100;
export const MAXYEAR = 9999;
export const MINYEAR_ORDINAL = 36160;
export const MAXYEAR_ORDINAL = 3652059;
export const min = new datetime(MINYEAR, 1, 1);
export const max = new datetime(MAXYEAR, 12, 31, 23, 59, 59, 999);
export function today() {
    return now();
}
export function now() {
    return fromjsdate(new Date());
}
export function utcnow() {
    return utcfromjsdate(new Date());
}
export function fromtimestamp(timestamp) {
    const jsdate = new Date(timestamp * 1000);
    return fromjsdate(jsdate);
}
export function utcfromtimestamp(timestamp) {
    const jsdate = new Date(timestamp * 1000);
    return utcfromjsdate(jsdate);
}
export function fromjsdate(jsdate) {
    return new datetime({
        year: jsdate.getFullYear(),
        month: jsdate.getMonth() + 1,
        day: jsdate.getDate(),
        hour: jsdate.getHours(),
        minute: jsdate.getMinutes(),
        second: jsdate.getSeconds(),
        millisecond: jsdate.getMilliseconds(),
    });
}
export function utcfromjsdate(jsdate) {
    return new datetime({
        year: jsdate.getUTCFullYear(),
        month: jsdate.getUTCMonth() + 1,
        day: jsdate.getUTCDate(),
        hour: jsdate.getUTCHours(),
        minute: jsdate.getUTCMinutes(),
        second: jsdate.getUTCSeconds(),
        millisecond: jsdate.getUTCMilliseconds(),
        utc: true,
    });
}
export function fromordinal(ordinal) {
    if (ordinal < MINYEAR_ORDINAL || ordinal > MAXYEAR_ORDINAL) {
        throw RangeError(`ordinal ${ordinal} is out of range`);
    }
    return dt.datetime.fromtimestamp(dt.date.min.valueOf() +
        new timedelta({ days: ordinal - MINYEAR_ORDINAL }).valueOf());
}
export function combine(date, time) {
    return new datetime({
        year: date.year,
        month: date.month,
        day: date.day,
        hour: time.hour,
        minute: time.minute,
        second: time.second,
        millisecond: time.millisecond,
    });
}
export function fromisoformat(date_string) {
    const d = d3.isoParse(date_string);
    if (d) {
        return dt.datetime.fromjsdate(d);
    }
    throw SyntaxError('Unable to parse date string');
}
export function fromisocalendar(year, week, day) {
    return dt.datetime.strptime(`${year}-${week}-${day}`, '%G-%V-%u');
}
export function strptime(date_string, format, utc = false) {
    const parser = utc ? d3.utcParse : d3.timeParse;
    const parsed = parser(format)(date_string);
    if (!parsed) {
        throw Error(`'${date_string}' does not match format '${format}'`);
    }
    return utc
        ? dt.datetime.utcfromjsdate(parsed)
        : dt.datetime.fromjsdate(parsed);
}
