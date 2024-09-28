import * as d3 from 'd3-time-format';
import dt from '..';
import { date, time, timedelta } from '../classes';
import { datetime } from '../classes/datetime'; // Fixes initialization error

/**
 * The smallest year number allowed in date and datetime objects.
 * Because of JavaScript Date limitations, it's value is 100.
 */
export const MINYEAR = 100;
/** The largest year number allowed in date and datetime objects. It's value is 9999. */
export const MAXYEAR = 9999;
/** The MINYEAR translated to it's ordinal day. */
export const MINYEAR_ORDINAL = 36160;
/** The MAXYEAR translated to it's ordinal day. */
export const MAXYEAR_ORDINAL = 3652059;
/** The earliest representable datetime. */
export const min = new datetime(MINYEAR, 1, 1);
/** The latest representable datetime. */
export const max = new datetime(MAXYEAR, 12, 31, 23, 59, 59, 999);

/**
 * Return the current local date and time.
 * @returns {datetime}
 */
export function today() {
	return now();
}

/**
 * Return the current local date and time.
 * Functionally equivalent to dt.datetime.today() but is considered the preferred syntax.
 * @returns {datetime}
 */
export function now() {
	return fromjsdate(new Date());
}

/**
 * Return the current UTC date and time.
 * @returns {datetime}
 */
export function utcnow() {
	return utcfromjsdate(new Date());
}

/**
 * Return the local date and time corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {datetime}
 */
export function fromtimestamp(timestamp: number) {
	const jsdate = new Date(timestamp * 1000);
	return fromjsdate(jsdate);
}

/**
 * Return the UTC datetime corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {datetime}
 */
export function utcfromtimestamp(timestamp: number) {
	const jsdate = new Date(timestamp * 1000);
	return utcfromjsdate(jsdate);
}

/**
 * Return the localdate and time corresponding to the JS Date object.
 * @param {Date} jsdate
 * @returns {datetime}
 */
export function fromjsdate(jsdate: Date) {
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

/**
 * Return the UTC datetime corresponding to the JS Date object.
 * @param {Date} jsdate
 * @returns {datetime}
 */
export function utcfromjsdate(jsdate: Date) {
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

/**
 * Return the datetime corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has oridinal 1.
 * @param {number} ordinal
 * @returns {datetime}
 */
export function fromordinal(ordinal: number) {
	if (ordinal < MINYEAR_ORDINAL || ordinal > MAXYEAR_ORDINAL) {
		throw RangeError(`ordinal ${ordinal} is out of range`);
	}
	return dt.datetime.fromtimestamp(
		dt.date.min.valueOf() +
			new timedelta({ days: ordinal - MINYEAR_ORDINAL }).valueOf(),
	);
}

/**
 * Return a new datetime object whose date components are equal to the given date object's,
 * and whose time components are equal to the given time object's.
 * If the date argument is a datetime object, its time components are ignored.
 * @param {date | datetime} date
 * @param {time} time
 * @returns {datetime}
 */
export function combine(date: date | datetime, time: time) {
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

/**
 * Return a datetime corresponding to a date_string in any valid ISO 8601 format.
 * @param {string} date_string
 * @returns {datetime}
 */
export function fromisoformat(date_string: string) {
	const d = d3.isoParse(date_string);
	if (d) {
		return dt.datetime.fromjsdate(d);
	}
	throw SyntaxError('Unable to parse date string');
}

/**
 * Return a datetime corresponding to the ISO calendar date specified by the year, week, and day.
 * The non-date components of the datetime are populated with their normal default values.
 * @param {number} year
 * @param {number} week
 * @param {number} day
 * @returns {datetime}
 */
export function fromisocalendar(year: number, week: number, day: number) {
	return dt.datetime.strptime(`${year}-${week}-${day}`, '%G-%V-%u');
}

/**
 * Return a datetime corresponding to date_string, parsed according to format.
 * @param {string} date_string
 * @param {string} format
 * @param {boolean} [utc=false]
 * @returns {datetime}
 */
export function strptime(
	date_string: string,
	format: string,
	utc: boolean = false,
) {
	const parser = utc ? d3.utcParse : d3.timeParse;
	const parsed = parser(format)(date_string);
	if (!parsed) {
		throw Error(`'${date_string}' does not match format '${format}'`);
	}
	return utc
		? dt.datetime.utcfromjsdate(parsed)
		: dt.datetime.fromjsdate(parsed);
}
