export const TimedeltaIntervals = [
	'weeks',
	'days',
	'hours',
	'minutes',
	'seconds',
	'milliseconds',
] as const;

export type TimedeltaInterval = (typeof TimedeltaIntervals)[number];

export type TimedeltaParams = Partial<Record<TimedeltaInterval, number>>;

export const toSeconds: Record<TimedeltaInterval, number> = {
	weeks: 60 * 60 * 24 * 7,
	days: 60 * 60 * 24,
	hours: 60 * 60,
	minutes: 60,
	seconds: 1,
	milliseconds: 0.001,
} as const;
