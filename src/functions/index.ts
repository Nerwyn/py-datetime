import * as d3TimeFormat from 'd3-time-format';
import { date, datetime, time } from '../classes';

export function now() {
	return new datetime(new Date());
}

export function utcnow() {
	return utc(new Date());
}

export function utc(ts: number | datetime | date | Date) {
	if (typeof ts == 'number') {
		// while a dt.datetime(2020) is perfectly valid, it's quite unlikely.
		// much more unlikely than having gotten an epoch passed in. convert that to date
		ts = new Date(ts * 1000);
	} else if (ts instanceof datetime || ts instanceof date) {
		ts = ts.jsDate;
	}
	return new datetime(
		ts.getUTCFullYear(),
		ts.getUTCMonth() + 1,
		ts.getUTCDate(),
		ts.getUTCHours(),
		ts.getUTCMinutes(),
		ts.getUTCSeconds(),
		ts.getUTCMilliseconds(),
		true,
	);
}

export function combine(date: date | datetime, time: time) {
	const dt = new datetime(date);
	Object.assign(dt, time);
	return dt;
}

export function strptime(
	dateString: string,
	format: string,
	isUtc: boolean = false,
) {
	const parser = isUtc ? d3TimeFormat.utcParse : d3TimeFormat.timeParse;
	const parsed = parser(format)(dateString);
	if (!parsed) {
		throw `ValueError: time data '${dateString}' does not match format '${format}'`;
	}
	return isUtc ? utc(parsed) : new datetime(parsed);
}
