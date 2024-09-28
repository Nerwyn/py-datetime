import { date, time } from '../classes';
import { datetime } from '../classes/datetime';
/**
 * The smallest year number allowed in date and datetime objects.
 * Because of JavaScript Date limitations, it's value is 100.
 */
export declare const MINYEAR = 100;
/** The largest year number allowed in date and datetime objects. It's value is 9999. */
export declare const MAXYEAR = 9999;
/** The MINYEAR translated to it's ordinal day. */
export declare const MINYEAR_ORDINAL = 36160;
/** The MAXYEAR translated to it's ordinal day. */
export declare const MAXYEAR_ORDINAL = 3652059;
/** The earliest representable datetime. */
export declare const min: datetime;
/** The latest representable datetime. */
export declare const max: datetime;
/**
 * Return the current local date and time.
 * @returns {datetime}
 */
export declare function today(): datetime;
/**
 * Return the current local date and time.
 * Functionally equivalent to dt.datetime.today() but is considered the preferred syntax.
 * @returns {datetime}
 */
export declare function now(): datetime;
/**
 * Return the current UTC date and time.
 * @returns {datetime}
 */
export declare function utcnow(): datetime;
/**
 * Return the local date and time corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {datetime}
 */
export declare function fromtimestamp(timestamp: number): datetime;
/**
 * Return the UTC datetime corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {datetime}
 */
export declare function utcfromtimestamp(timestamp: number): datetime;
/**
 * Return the localdate and time corresponding to the JS Date object.
 * @param {Date} jsdate
 * @returns {datetime}
 */
export declare function fromjsdate(jsdate: Date): datetime;
/**
 * Return the UTC datetime corresponding to the JS Date object.
 * @param {Date} jsdate
 * @returns {datetime}
 */
export declare function utcfromjsdate(jsdate: Date): datetime;
/**
 * Return the datetime corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has oridinal 1.
 * @param {number} ordinal
 * @returns {datetime}
 */
export declare function fromordinal(ordinal: number): datetime;
/**
 * Return a new datetime object whose date components are equal to the given date object's,
 * and whose time components are equal to the given time object's.
 * If the date argument is a datetime object, its time components are ignored.
 * @param {date | datetime} date
 * @param {time} time
 * @returns {datetime}
 */
export declare function combine(date: date | datetime, time: time): datetime;
/**
 * Return a datetime corresponding to a date_string in any valid ISO 8601 format.
 * @param {string} date_string
 * @returns {datetime}
 */
export declare function fromisoformat(date_string: string): datetime;
/**
 * Return a datetime corresponding to the ISO calendar date specified by the year, week, and day.
 * The non-date components of the datetime are populated with their normal default values.
 * @param {number} year
 * @param {number} week
 * @param {number} day
 * @returns {datetime}
 */
export declare function fromisocalendar(year: number, week: number, day: number): datetime;
/**
 * Return a datetime corresponding to date_string, parsed according to format.
 * @param {string} date_string
 * @param {string} format
 * @param {boolean} [utc=false]
 * @returns {datetime}
 */
export declare function strptime(date_string: string, format: string, utc?: boolean): datetime;
