export const toMillis: Record<TimeDeltaInterval, number> = {
	milliseconds: 1,
	seconds: 1000,
	minutes: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24,
	weeks: 1000 * 60 * 60 * 24 * 7,
} as const;

export const TimeIntervals = [
	'hour',
	'minute',
	'second',
	'millisecond',
] as const;
export type TimeInterval = (typeof TimeIntervals)[number];

export const DateIntervals = ['year', 'month', 'day'] as const;
export type DateInterval = (typeof DateIntervals)[number];

export const DatetimeIntervals = [...DateIntervals, ...TimeIntervals];
export type DatetimeInterval = DateInterval | TimeInterval;

export const TimeDeltaIntervals = [
	'weeks',
	'days',
	'hours',
	'minutes',
	'seconds',
	'milliseconds',
] as const;
export type TimeDeltaInterval = (typeof TimeDeltaIntervals)[number];
