import * as d3 from 'd3-time-format';
import { TimedeltaIntervals, toSeconds } from '../models';
import { isParams } from '../utils/utils';
export class timedelta {
    /**
     * A timedelta object represents a duration, the difference betwee two datetime or date instances.
     * @param {number} [days=0]
     * @param {number} [seconds=0]
     * @param {number} [milliseconds=0]
     * @param {number} [minutes=0]
     * @param {number} [hours=0]
     * @param {number} [weeks=0]
     */
    constructor(days = 0, seconds = 0, milliseconds = 0, minutes = 0, hours = 0, weeks = 0) {
        this.days = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        let args = {
            days: days,
            seconds,
            milliseconds,
            minutes,
            hours,
            weeks,
        };
        if (isParams(days)) {
            delete args.days;
            Object.assign(args, days);
        }
        // Get total seconds from args and then deconstruct into days, seconds, milliseconds
        // Python does days, seconds, microseconds but JS does not support microsecond precision for Date
        let totalSeconds = 0;
        TimedeltaIntervals.forEach((key) => {
            totalSeconds += (args[key] ?? 0) * toSeconds[key];
        });
        if (totalSeconds < timedelta.min || totalSeconds > timedelta.max) {
            throw RangeError('value out of range, must have magnitude less than 999999999 days');
        }
        if (totalSeconds.toString().includes('.')) {
            // To avoid floating point imprecision errors
            const totalSecondsString = totalSeconds.toString();
            this.milliseconds = Math.trunc(parseFloat(`0.${totalSecondsString.split('.')[1]}`) /
                toSeconds.milliseconds);
            if (totalSecondsString.startsWith('-')) {
                this.milliseconds *= -1;
            }
            totalSeconds = Math.trunc(totalSeconds);
        }
        this.days = Math.trunc(totalSeconds / toSeconds.days);
        this.days = this.days || 0;
        this.seconds = totalSeconds - this.days * toSeconds.days;
        this.seconds = this.seconds || 0;
    }
    /**
     * Return the total number of seconds contained in the duration.
     * @returns {number}
     */
    total_seconds() {
        return (this.days * toSeconds.days +
            this.seconds +
            this.milliseconds * toSeconds.milliseconds);
    }
    /**
     * For a timedelta delta, delta.valueOf() is equivalent to delta.total_seconds().
     * @returns {number}
     */
    valueOf() {
        return this.total_seconds();
    }
    /**
     * Return the days, hours, minutes, seconds, and milliseconds of the timedelta in a string format.
     * If the timedelta is less than one day then days is not included.
     * If the timedelta does not have a millisecond component then it is also not included.
     * @returns {string}
     */
    toString() {
        const dayString = this.days > 0
            ? `${this.days} day${this.days > 1 ? 's,' : ','}`
            : '';
        const timeString = d3.utcFormat(`%-H:%M:%S${this.milliseconds ? '.%f' : ''}`)(new Date(this.valueOf() * 1000));
        return `${dayString} ${timeString}`.trim();
    }
}
/** The most negative timedelta object */
timedelta.min = -86399999913600;
/** The most positive timedelta object */
timedelta.max = 86399999999999.999;
/** The smallest possible difference between non-equal timedelta objects */
timedelta.resolution = 0.001;
