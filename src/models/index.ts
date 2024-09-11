export const TimeIntervals = [
	'hour',
	'minute',
	'second',
	'millisecond',
] as const;
export type TimeInterval = (typeof TimeIntervals)[number];
export type PyTimeDict = Partial<Record<TimeInterval, number>>;

export const DateIntervals = ['year', 'month', 'day'] as const;
export type DateInterval = (typeof DateIntervals)[number];
export type PyDateDict = Partial<Record<DateInterval, number>>;

export const DatetimeIntervals = [...DateIntervals, ...TimeIntervals];
export type DatetimeInterval = (typeof DatetimeIntervals)[number];
export type PyDatetimeDict = Partial<
	Record<DatetimeInterval, number> & { utc: boolean }
>;

export const TimedeltaIntervals = [
	'weeks',
	'days',
	'hours',
	'minutes',
	'seconds',
	'milliseconds',
] as const;
export type TimedeltaInterval = (typeof TimedeltaIntervals)[number];
export type PyTimedeltaDict = Partial<Record<TimedeltaInterval, number>>;

export const toMillis: Record<TimedeltaInterval, number> = {
	milliseconds: 1,
	seconds: 1000,
	minutes: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24,
	weeks: 1000 * 60 * 60 * 24 * 7,
} as const;
