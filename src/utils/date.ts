import * as d3 from 'd3-time-format';

import dt from '..';
import { date, timedelta } from '../classes';
import { MAXYEAR, MAXYEAR_ORDINAL, MINYEAR, MINYEAR_ORDINAL } from './datetime';

/** The earliest representable date. */
export const min = new date(MINYEAR, 1, 1);
/** The latest representable date. */
export const max = new date(MAXYEAR, 12, 31);
/** The smallest possible difference between non-equal date objects. */
export const resolution = new timedelta({ days: 1 });

/**
 * Return the current local date.
 * @returns {date}
 */
export function today() {
	const today = dt.datetime.now();
	return new date(today.year, today.month, today.day);
}

/**
 * Return the local date corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {date}
 */
export function fromtimestamp(timestamp: number) {
	const d = dt.datetime.fromtimestamp(timestamp);
	return new date(d.year, d.month, d.day);
}

/**
 * Return the date corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has ordinal 1.
 * @param {number} ordinal
 * @returns {date}
 */
export function fromordinal(ordinal: number) {
	if (ordinal < MINYEAR_ORDINAL || ordinal > MAXYEAR_ORDINAL) {
		throw RangeError(`ordinal ${ordinal} is out of range`);
	}
	return dt.date.fromtimestamp(
		min.valueOf() +
			dt.timedelta({ days: ordinal - MINYEAR_ORDINAL }).valueOf(),
	);
}

/**
 * Return a date corresponding to a date_string given in the ISO 8601 format YYYY-MM-DD.
 * @param {string} date_string
 * @returns {date}
 */
export function fromisoformat(date_string: string) {
	const d = d3.isoParse(date_string);
	if (d) {
		return new date(
			d.getUTCFullYear(),
			d.getUTCMonth() + 1,
			d.getUTCDate(),
		);
	}
	throw SyntaxError('Unable to parse date string');
}

/**
 * Return a date corresponding to the ISO calendar date specified by year, week, and day.
 * @param {number} year
 * @param {number} week
 * @param {number} day
 * @returns {date}
 */
export function fromisocalendar(year: number, week: number, day: number) {
	const d = dt.datetime.strptime(`${year}-${week}-${day}`, '%G-%V-%u');
	return dt.date(Number(d.year), Number(d.month), Number(d.day));
}
