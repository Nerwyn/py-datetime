import { DateIntervals } from './date';
import { TimeIntervals } from './time';

export const DatetimeIntervals = [...DateIntervals, ...TimeIntervals];

export type DatetimeInterval = (typeof DatetimeIntervals)[number];

export type DatetimeParams = Partial<
	Record<DatetimeInterval, number> & { utc: boolean }
>;

export type TimeSpec =
	| 'auto'
	| 'hours'
	| 'minutes'
	| 'seconds'
	| 'milliseconds';

export type ISOFormatParams = {
	sep?: string;
	timespec?: TimeSpec;
};
