"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMillis = exports.TimedeltaIntervals = exports.DatetimeIntervals = exports.DateIntervals = exports.TimeIntervals = void 0;
exports.TimeIntervals = [
    'hour',
    'minute',
    'second',
    'millisecond',
];
exports.DateIntervals = ['year', 'month', 'day'];
exports.DatetimeIntervals = [...exports.DateIntervals, ...exports.TimeIntervals];
exports.TimedeltaIntervals = [
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
];
exports.toMillis = {
    milliseconds: 1,
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
};
