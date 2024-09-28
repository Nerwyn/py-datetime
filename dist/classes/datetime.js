import * as d3 from 'd3-time-format';
import { date, time } from '.';
import { MAXYEAR, MINYEAR } from '../utils/datetime';
import { isParams } from '../utils/utils';
export class datetime {
    /**
     * A datetime object is a single object containing all the information from a date object and a time object.
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @param {number} [hour=0]
     * @param {number} [minute=0]
     * @param {number} [second=0]
     * @param {number} [millisecond=0]
     * @param {boolean} [utc=false]
     */
    constructor(year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0, utc = false) {
        this.year = 1970;
        this.month = 1;
        this.day = 1;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        this.utc = false;
        const args = {
            year: year,
            month,
            day,
            hour,
            minute,
            second,
            millisecond,
            utc,
        };
        if (isParams(year)) {
            delete args.year;
            Object.assign(args, year);
        }
        for (const arg in args) {
            if (arg != 'utc' &&
                !Number.isInteger(args[arg])) {
                throw TypeError("'float' object cannot be interpreted as an integer");
            }
        }
        if (!args.year || !args.month || !args.day) {
            throw SyntaxError('Missing required argument year, month, or day');
        }
        if (args.year < MINYEAR || args.year > MAXYEAR) {
            throw RangeError(`year ${args.year} is out of range`);
        }
        if (args.month < 1 || args.month > 12) {
            throw RangeError(`month ${args.month} is out of range`);
        }
        if (args.day < 1 ||
            args.day > new Date(args.year, args.month, 0).getDate()) {
            throw RangeError(`day ${day} is out of range for month`);
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
     * Return date object with same year, month, and day.
     * @returns {date}
     */
    date() {
        return new date(this.year, this.month, this.day);
    }
    /**
     * Return time object with same hour, minute, second, and millisecond.
     * @returns {time}
     */
    time() {
        return new time(this.hour, this.minute, this.second, this.millisecond);
    }
    /**
     * Return a datetime with the same attributes,
     * except for those attributes given new values by whichever arguments are specified.
     * @param {number} [year=this.year]
     * @param {number} [month=this.month]
     * @param {number} [day=this.day]
     * @param {number} [hour=this.hour]
     * @param {number} [minute=this.minute]
     * @param {number} [second=this.second]
     * @param {number} [millisecond=this.millisecond]
     * @returns {datetime}
     */
    replace(year = this.year, month = this.month, day = this.day, hour = this.hour, minute = this.minute, second = this.second, millisecond = this.millisecond) {
        const args = {
            year: year,
            month,
            day,
            hour,
            minute,
            second,
            millisecond,
        };
        if (isParams(year)) {
            delete args.year;
            Object.assign(args, year);
        }
        return new datetime({
            year: args.year ?? this.year,
            month: args.month ?? this.month,
            day: args.day ?? this.day,
            hour: args.hour ?? this.hour,
            minute: args.minute ?? this.minute,
            second: args.second ?? this.second,
            millisecond: args.millisecond ?? this.millisecond,
        });
    }
    /**
     * Return the proleptic Gregorian ordinal of the date.
     * @returns {number}
     */
    toordinal() {
        return this.date().toordinal();
    }
    /**
     * Return the POSIX timestamp corresponding to the datetime instance.
     * @returns {number}
     */
    timestamp() {
        let value;
        if (this.utc) {
            value = Date.UTC(this.year, this.month - 1, this.day || 1, this.hour || 0, this.minute || 0, this.second || 0, this.millisecond || 0);
        }
        else {
            value = this.jsDate.getTime();
        }
        return value / 1000;
    }
    /**
     * Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
     * @returns {number}
     */
    weekday() {
        return this.date().weekday();
    }
    /**
     * Return the day of the week as an integer, where Monday is 1 and Sunday is 7.
     * @returns {number}
     */
    isoweekday() {
        return this.weekday() + 1;
    }
    /**
     * Return an array with three components: year, week, and weekday.
     * @returns {[number, number, number]}
     */
    isocalendar() {
        const [year, week, weekday] = d3
            .utcFormat('%G-%V-%u')(this.jsDate)
            .split('-');
        return [Number(year), Number(week), Number(weekday)];
    }
    /**
     * Return a string representing the date and time in ISO 8601 format.
     * @param {string} [sep='T'] A one-character separator, placed between the date and time portions of the result.
     * @param {TimeSpec} [timespec='auto'] Specifies the number of additional components of the time to include.
     * @returns {string}
     */
    isoformat(sep = 'T', timespec = 'auto') {
        const args = {
            sep: sep,
            timespec,
        };
        if (isParams(sep)) {
            delete args.sep;
            Object.assign(args, sep);
        }
        let format;
        switch (args.timespec) {
            case 'hours':
                format = `%Y-%m-%d${args.sep}%H`;
                break;
            case 'minutes':
                format = `%Y-%m-%d${args.sep}%H:%M`;
                break;
            case 'seconds':
                format = `%Y-%m-%d${args.sep}%H:%M:%S`;
                break;
            case 'milliseconds':
                format = `%Y-%m-%d${args.sep}%H:%M:%S.%f`;
                break;
            case 'auto':
            default:
                format = `%Y-%m-%d${args.sep}%H:%M:%S${this.millisecond ? '.%f' : ''}`;
                break;
        }
        return this.strftime(format);
    }
    /**
     * For a datetime instance d, d.valueOf() is equivalent to d.timestamp().
     * @returns {number}
     */
    valueOf() {
        return this.timestamp();
    }
    /**
     * For a datetime instance d, d.toString() is equivalent to d.isoformat(' ').
     * @returns {string}
     */
    toString() {
        return this.isoformat(' ');
    }
    /**
     * Return a string representing the date and time, such as Wed Dec 4 20:30:40 2002.
     * @returns {string}
     */
    ctime() {
        return d3.timeFormat('%a %b %H:%M:%S %Y')(this.jsDate);
    }
    /**
     * Return a string representing the date and time, controlled by an explicit format string
     * @param {string} format
     * @returns {string}
     */
    strftime(format) {
        if (this.utc) {
            return d3.utcFormat(format)(this.jsDate);
        }
        else {
            return d3.timeFormat(format)(this.jsDate);
        }
    }
    /** Return this object as a JS Date object */
    get jsDate() {
        if (this.utc) {
            return new Date(this.valueOf() * 1000);
        }
        else {
            return new Date(this.year, this.month - 1, this.day || 1, this.hour || 0, this.minute || 0, this.second || 0, this.millisecond || 0);
        }
    }
}
/** The earliest representable datetime POSIX timestamp. */
datetime.min = -59011416000;
/** The latest representable datetime POSIX timestamp */
datetime.max = 253402300799.999;
/** The smallest possible difference between non-equal datetime objects, 1 millisecond, in seconds. */
datetime.resolution = 0.001;
