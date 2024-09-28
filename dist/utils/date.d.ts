import { date, timedelta } from '../classes';
/** The earliest representable date. */
export declare const min: date;
/** The latest representable date. */
export declare const max: date;
/** The smallest possible difference between non-equal date objects. */
export declare const resolution: timedelta;
/**
 * Return the current local date.
 * @returns {date}
 */
export declare function today(): date;
/**
 * Return the local date corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {date}
 */
export declare function fromtimestamp(timestamp: number): date;
/**
 * Return the date corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has ordinal 1.
 * @param {number} ordinal
 * @returns {date}
 */
export declare function fromordinal(ordinal: number): date;
/**
 * Return a date corresponding to a date_string given in the ISO 8601 format YYYY-MM-DD.
 * @param {string} date_string
 * @returns {date}
 */
export declare function fromisoformat(date_string: string): date;
/**
 * Return a date corresponding to the ISO calendar date specified by year, week, and day.
 * @param {number} year
 * @param {number} week
 * @param {number} day
 * @returns {date}
 */
export declare function fromisocalendar(year: number, week: number, day: number): date;
