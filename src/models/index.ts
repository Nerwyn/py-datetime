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

export const toSeconds: Record<TimedeltaInterval, number> = {
	weeks: 60 * 60 * 24 * 7,
	days: 60 * 60 * 24,
	hours: 60 * 60,
	minutes: 60,
	seconds: 1,
	milliseconds: 0.001,
} as const;
