import * as d3TimeFormat from 'd3-time-format';
import { toSeconds } from '../models';
import { MAXYEAR, MINYEAR } from '../utils/datetime';
import { isParams } from '../utils/utils';
import { base } from './base';
export class date extends base {
    constructor(year, month, day) {
        super();
        this.year = 1;
        this.month = 1;
        this.day = 1;
        if (year < MINYEAR || year > MAXYEAR) {
            throw RangeError(`year ${year} is out of range`);
        }
        if (month < 1 || month > 12) {
            throw RangeError(`month ${month} is out of range`);
        }
        if (day < 1 || day > new Date(year, month, 0).getDate()) {
            throw RangeError(`day ${day} is out of range for month`);
        }
        Object.assign(this, { year, month, day });
    }
    get jsDate() {
        return new Date(this.year, this.month - 1, this.day);
    }
    str() {
        return d3TimeFormat.timeFormat('%Y-%m-%d')(this.jsDate);
    }
    replace(year = this.year, month = this.month, day = this.day) {
        let args;
        if (isParams(year)) {
            args = year;
        }
        else {
            args = {
                year: year,
                month,
                day,
            };
        }
        return new date(args.year ?? this.year, args.month ?? this.month, args.day ?? this.day);
    }
    toordinal() {
        return this.valueOf() / toSeconds.days;
    }
    weekday() {
        // javascript week starts on sunday, while python one starts on monday
        return (this.jsDate.getDay() + 6) % 7;
    }
    isoweekday() {
        return this.weekday() + 1;
    }
    isocalendar() {
        const [year, week, weekday] = d3TimeFormat
            .utcFormat('%G-%V-%u')(this.jsDate)
            .split('-');
        return [Number(year), Number(week), Number(weekday)];
    }
    ctime() {
        return d3TimeFormat.timeFormat('%a %b 00:00:00 %Y')(this.jsDate);
    }
    strftime(format) {
        return d3TimeFormat.timeFormat(format)(this.jsDate);
    }
    valueOf() {
        return this.jsDate.getTime() / 1000;
    }
}
date.min = -2177434800;
date.max = 253402232400;
date.resolution = 86400;
