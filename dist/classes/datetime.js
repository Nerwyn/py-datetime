import * as d3 from 'd3-time-format';
import { date, time } from '.';
import { DatetimeIntervals, } from '../models';
import { isParams } from '../utils/utils';
import { base } from './base';
export class datetime extends base {
    constructor(year, month, day, hour, minute, second, millisecond, utc) {
        super();
        this.year = 0;
        this.month = 1;
        this.day = 1;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        this.utc = false;
        let args = {};
        if (isParams(year)) {
            args = year;
            this.utc = args.utc ?? false;
        }
        else {
            args = {
                year: year,
                month,
                day,
                hour,
                minute,
                second,
                millisecond,
            };
            this.utc = utc ?? false;
        }
        if (!args.year || !args.month || !args.day) {
            throw SyntaxError('Missing required argument year, month, or day');
        }
        for (const arg in DatetimeIntervals) {
            if (args[arg] ?? 0 % 1 != 0) {
                throw TypeError('Float cannot be interpreted as an integer');
            }
        }
        Object.assign(this, args);
    }
    replace(year = this.year, month = this.month, day = this.day, hour = this.hour, minute = this.minute, second = this.second, millisecond = this.millisecond) {
        let args = {};
        if (isParams(year)) {
            args = year;
        }
        else {
            args = {
                year: year,
                month,
                day,
                hour,
                minute,
                second,
                millisecond,
            };
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
        let args;
        if (isParams(sep)) {
            // args = sep as ISOFormatParams;
            args = {
                sep: 'T',
                timespec: 'auto',
                ...sep,
            };
        }
        else {
            args = {
                sep: sep,
                timespec,
            };
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
