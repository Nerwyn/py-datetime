import { timedelta } from '../classes';

/** The most negative timedelta object */
export const min = new timedelta({ days: -999999999 });

/** The most positive timedelta object */
export const max = new timedelta({
	days: 999999999,
	hours: 23,
	minutes: 59,
	seconds: 59,
	milliseconds: 999,
});

/** The smallest possible difference between non-equal timedelta, datetime, or time objects */
export const resolution = new timedelta({ milliseconds: 1 });
