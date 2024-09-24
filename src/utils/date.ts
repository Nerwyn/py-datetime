import * as d3TimeFormat from 'd3-time-format';
import dt from '..';

export function today() {
	const today = dt.datetime.now();
	return dt.date(today.year, today.month, today.day);
}

export function fromtimestamp(timestamp: number) {
	const d = dt.datetime(timestamp);
	return dt.date(d.year, d.month, d.day);
}

export function fromordinal(ordinal: number) {
	const d = dt.datetime(
		dt.datetime(0, 0, 0).valueOf() +
			dt.timedelta({ days: ordinal }).valueOf(),
	);
	return dt.date(d.year, d.month, d.day);
}

export function fromisoformat(dateString: string) {
	// const formats = ['%Y-%m-%d', '%Y%m%d', '%Y-W%W-%w'];
	const d = d3TimeFormat.isoParse(dateString);
	if (d) {
		return dt.date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
	}
	throw SyntaxError('Unable to parse date string');
}
