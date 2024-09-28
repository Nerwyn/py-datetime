import * as d3 from 'd3-time-format';
import { toSeconds } from '../models';
import { isParams } from '../utils/utils';
export class time {
    /**
     * A time object represents a (local) time of day, independent of any particular day.
     * @param {number} [hour=0]
     * @param {number} [minute=0]
     * @param {number} [second=0]
     * @param {number} [millisecond=0]
     */
    constructor(hour = 0, minute = 0, second = 0, millisecond = 0) {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        let args = {
            hour: hour,
            minute,
            second,
            millisecond,
        };
        if (isParams(hour)) {
            delete args.hour;
            Object.assign(args, hour);
        }
        for (const arg in args) {
            if (!Number.isInteger(args[arg])) {
                throw TypeError("'float' object cannot be interpreted as an integer");
            }
        }
        if ((args.hour ?? 0) < 0 || (args.hour ?? 0) > 23) {
            throw RangeError('hour must be in 0..23');
        }
        if ((args.minute ?? 0) < 0 || (args.minute ?? 0) > 59) {
            throw RangeError('minute must be in 0..59');
        }
        if ((args.second ?? 0) < 0 || (args.second ?? 0) > 59) {
            throw RangeError('second must be in 0..59');
        }
        if ((args.millisecond ?? 0) < 0 || (args.millisecond ?? 0) > 999) {
            throw RangeError('millisecond must be in 0..999');
        }
        Object.assign(this, args);
    }
    /**
     * Return a time with the ame value,
     * except for those attributes given new values by whichever arguments are specified.
     * @param {number} [hour=this.hour]
     * @param {number} [minute=this.minute]
     * @param {number} [second=this.second]
     * @param {number} [millisecond=this.millisecond]
     * @returns {time}
     */
    replace(hour = this.hour, minute = this.minute, second = this.second, millisecond = this.millisecond) {
        let args = {
            hour: hour,
            minute,
            second,
            millisecond,
        };
        if (isParams(hour)) {
            delete args.hour;
            Object.assign(args, hour);
        }
        return new time(args.hour ?? this.hour, args.minute ?? this.minute, args.second ?? this.second, args.millisecond ?? this.millisecond);
    }
    /**
     * Return a string representing the time in ISO 8601 format.
     * @param {TimeSpec} [timespec='auto'] Specifies the number of additional components of the time to include
     * @returns {time}
     */
    isoformat(timespec = 'auto') {
        let format;
        switch (timespec) {
            case 'hours':
                format = `%H`;
                break;
            case 'minutes':
                format = `%H:%M`;
                break;
            case 'seconds':
                format = `%H:%M:%S`;
                break;
            case 'milliseconds':
                format = `%H:%M:%S.%f`;
                break;
            case 'auto':
            default:
                format = `%H:%M:%S${this.millisecond ? '.%f' : ''}`;
                break;
        }
        return this.strftime(format);
    }
    /**
     * Return the time in seconds.
     * @returns {number}
     */
    valueOf() {
        return (this.hour * toSeconds.hours +
            this.minute * toSeconds.minutes +
            this.second * toSeconds.seconds +
            this.millisecond * toSeconds.milliseconds);
    }
    /**
     * For a time t, t.valueOf() is equivalent to t.isoformat().
     * @returns {string}
     */
    toString() {
        return this.isoformat();
    }
    /**
     * Return a string representing the time, controlled by an explicit format string.
     * @param {string} format
     * @returns {string}
     */
    strftime(format) {
        return d3.utcFormat(format)(this.jsDate);
    }
    /** Return this object as a JS Date object */
    get jsDate() {
        return new Date(this.valueOf() * 1000);
    }
}
/** The earliest representable time in seconds. */
time.min = 0;
/** The latest representable time in seconds. */
time.max = 86399.999;
/** The smallest possible difference between non-equal time objects, 1ms, in seconds. */
time.resolution = 0.001;
