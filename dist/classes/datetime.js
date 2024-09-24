import * as d3TimeFormat from 'd3-time-format';
import { date, time } from '.';
import { DatetimeIntervals } from '../models';
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
        this.utc = utc ?? false;
        if (typeof year == 'number' && !month && !day) {
            // while a dt.datetime(2020) is perfectly valid, it's quite unlikely.
            // much more unlikely than having gotten an epoch passed in. convert that to date
            year = new Date(year * 1000);
        }
        if (year instanceof Date) {
            // JS Date
            args = {
                year: year.getFullYear(),
                month: year.getMonth() + 1,
                day: year.getDate(),
                hour: year.getHours(),
                minute: year.getMinutes(),
                second: year.getSeconds(),
                millisecond: year.getMilliseconds(),
            };
        }
        else if (isParams(year)) {
            // datetime or date
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
    replace(year, month, day, hour, minute, second, millisecond) {
        // returns new date with updated values
        let args = {};
        if (isParams(year)) {
            args = year;
        }
        else {
            args = { year, month, day, hour, minute, second, millisecond };
        }
        const newTs = new datetime(this);
        Object.entries(args).forEach(([key, val]) => {
            if (val) {
                newTs[key] = val;
            }
        });
        return newTs;
    }
    get jsDate() {
        if (this.utc) {
            return new Date(this.valueOf() * 1000);
        }
        else {
            return new Date(this.year, this.month - 1, this.day || 1, this.hour || 0, this.minute || 0, this.second || 0, this.millisecond || 0);
        }
    }
    str() {
        return this.strftime(`%Y-%m-%d %H:%M:%S${this.millisecond ? '.%f' : ''}`);
    }
    valueOf() {
        let value;
        if (this.utc) {
            value = Date.UTC(this.year, this.month - 1, this.day || 1, this.hour || 0, this.minute || 0, this.second || 0, this.millisecond || 0);
        }
        else {
            value = this.jsDate.getTime();
        }
        return value / 1000;
    }
    strftime(format) {
        if (this.utc) {
            return d3TimeFormat.utcFormat(format)(this.jsDate);
        }
        else {
            return d3TimeFormat.timeFormat(format)(this.jsDate);
        }
    }
    time() {
        return new time(this.hour, this.minute, this.second, this.millisecond);
    }
    date() {
        return new date(this.year, this.month, this.day);
    }
    weekday() {
        // javascript week starts on sunday, while python one starts on monday
        return this.date().weekday();
    }
    isoweekday() {
        return this.weekday() + 1;
    }
}
