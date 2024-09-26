import { timedelta } from '../classes';

export const min = new timedelta({ days: -999999999 });

export const max = new timedelta({
	days: 999999999,
	hours: 23,
	minutes: 59,
	seconds: 59,
	milliseconds: 999,
});

export const resolution = new timedelta({ milliseconds: 1 });
