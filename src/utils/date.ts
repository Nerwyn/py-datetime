import * as d3 from 'd3-time-format';

import dt from '..';
import { date, timedelta } from '../classes';
import { MAXYEAR, MAXYEAR_ORDINAL, MINYEAR, MINYEAR_ORDINAL } from './datetime';

export const min = new date(MINYEAR, 1, 1);
export const max = new date(MAXYEAR, 12, 31);
export const resolution = new timedelta({ days: 1 });

export function today() {
	const today = dt.datetime.now();
	return dt.date(today.year, today.month, today.day);
}

export function fromtimestamp(timestamp: number) {
	const d = dt.datetime.fromtimestamp(timestamp);
	return dt.date(d.year, d.month, d.day);
}

export function fromordinal(ordinal: number) {
	if (ordinal < MINYEAR_ORDINAL || ordinal > MAXYEAR_ORDINAL) {
		throw RangeError(`ordinal ${ordinal} is out of range`);
	}
	return dt.date.fromtimestamp(
		dt.date.min.valueOf() +
			dt.timedelta({ days: ordinal - MINYEAR_ORDINAL }).valueOf(),
	);
}

export function fromisoformat(date_string: string) {
	// const formats = ['%Y-%m-%d', '%Y%m%d', '%G-W%V-%u'];
	// let d: Date | null = null;
	// for (const format of formats) {
	// 	d = d3TimeFormat.utcParse(format)(date_string);
	// 	if (d) {
	// 		break;
	// 	}
	// }
	const d = d3.isoParse(date_string);
	if (d) {
		return dt.date(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
	}
	throw SyntaxError('Unable to parse date string');
}

export function fromisocalendar(year: number, week: number, day: number) {
	const d = dt.datetime.strptime(`${year}-${week}-${day}`, '%G-%V-%u');
	return dt.date(Number(d.year), Number(d.month), Number(d.day));
}
