export const TimeIntervals = [
    'hour',
    'minute',
    'second',
    'millisecond',
];
export const DateIntervals = ['year', 'month', 'day'];
export const DatetimeIntervals = [...DateIntervals, ...TimeIntervals];
export const TimedeltaIntervals = [
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
];
export const toSeconds = {
    weeks: 60 * 60 * 24 * 7,
    days: 60 * 60 * 24,
    hours: 60 * 60,
    minutes: 60,
    seconds: 1,
    milliseconds: 0.001,
};
