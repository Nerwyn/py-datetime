export declare const toMillis: Record<TimeDeltaInterval, number>;
export declare const TimeIntervals: readonly ["hour", "minute", "second", "millisecond"];
export type TimeInterval = (typeof TimeIntervals)[number];
export declare const DateIntervals: readonly ["year", "month", "day"];
export type DateInterval = (typeof DateIntervals)[number];
export declare const DatetimeIntervals: ("hour" | "minute" | "second" | "millisecond" | "year" | "month" | "day")[];
export type DatetimeInterval = DateInterval | TimeInterval;
export declare const TimeDeltaIntervals: readonly ["weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
export type TimeDeltaInterval = (typeof TimeDeltaIntervals)[number];
