import * as d3 from 'd3-time-format';
import { date, time } from '.';
import { MAXYEAR, MINYEAR } from '../utils/datetime';
import { isParams } from '../utils/utils';
import { base } from './base';
export class datetime extends base {
    constructor(year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0, utc = false) {
        super();
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
                !Number.isInteger(args[arg] ?? 0)) {
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
    date() {
        return new date(this.year, this.month, this.day);
    }
    time() {
        return new time(this.hour, this.minute, this.second, this.millisecond);
    }
    toordinal() {
        return this.date().toordinal();
    }
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
    weekday() {
        return this.date().weekday();
    }
    isoweekday() {
        return this.weekday() + 1;
    }
    isocalendar() {
        const [year, week, weekday] = d3
            .utcFormat('%G-%V-%u')(this.jsDate)
            .split('-');
        return [Number(year), Number(week), Number(weekday)];
    }
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
    str() {
        // TODO change all instances of this to toString() and test
        return this.isoformat(' ');
    }
    ctime() {
        return d3.timeFormat('%a %b %H:%M:%S %Y')(this.jsDate);
    }
    strftime(format) {
        if (this.utc) {
            return d3.utcFormat(format)(this.jsDate);
        }
        else {
            return d3.timeFormat(format)(this.jsDate);
        }
    }
    valueOf() {
        return this.timestamp();
    }
    get jsDate() {
        if (this.utc) {
            return new Date(this.valueOf() * 1000);
        }
        else {
            return new Date(this.year, this.month - 1, this.day || 1, this.hour || 0, this.minute || 0, this.second || 0, this.millisecond || 0);
        }
    }
}
datetime.min = -59011416000;
datetime.max = 253402300799.999;
datetime.resolution = 0.001;
