export const toMillis = {
    milliseconds: 1,
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
};
export const TimeIntervals = [
    'hour',
    'minute',
    'second',
    'millisecond',
];
export const DateIntervals = ['year', 'month', 'day'];
export const DatetimeIntervals = [...DateIntervals, ...TimeIntervals];
export const TimeDeltaIntervals = [
    'seconds',
    'milliseconds',
    'minutes',
    'hours',
    'days',
    'weeks',
];
