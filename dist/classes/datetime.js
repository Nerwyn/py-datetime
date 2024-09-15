import * as d3TimeFormat from 'd3-time-format';
import { PyDate, PyTime } from '.';
import { DatetimeIntervals, } from '../models';
export class PyDatetime {
    constructor(year, month, day, hour, minute, second, millisecond, utc) {
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
        if (year?.year &&
            year?.month &&
            year?.day) {
            const ts = year;
            DatetimeIntervals.forEach((field) => {
                args[field] = ts[field];
            });
            if (ts.utc) {
                args.utc = ts.utc;
            }
        }
        else if (year instanceof Date) {
            const ts = year;
            args = {
                year: ts.getFullYear(),
                month: ts.getMonth() + 1,
                day: ts.getDate(),
                hour: ts.getHours(),
                minute: ts.getMinutes(),
                second: ts.getSeconds(),
                millisecond: ts.getMilliseconds(),
            };
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
        Object.assign(this, args);
    }
    replace(year, month, day, hour, minute, second, millisecond) {
        // returns new date with updated values
        let args = {};
        if (year && typeof year != 'number') {
            args = year;
        }
        else {
            args = { year, month, day, hour, minute, second, millisecond };
        }
        const newTs = new PyDatetime(this);
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
    toString() {
        return this.str();
    }
    toJSON() {
        return this.str();
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
        return new PyTime(this.hour, this.minute, this.second, this.millisecond);
    }
    date() {
        return new PyDate(this.year, this.month, this.day);
    }
    weekday() {
        // javascript week starts on sunday, while python one starts on monday
        return this.date().weekday();
    }
    isoweekday() {
        return this.weekday() + 1;
    }
}
