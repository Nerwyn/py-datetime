export const TimeIntervals = [
	'hour',
	'minute',
	'second',
	'millisecond',
] as const;

export type TimeInterval = (typeof TimeIntervals)[number];

export type TimeParams = Partial<Record<TimeInterval, number>>;
