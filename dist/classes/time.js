import * as d3TimeFormat from 'd3-time-format';
import dt from '..';
import { TimeIntervals, toSeconds } from '../models';
export class PyTime {
    constructor(hour, minute, second, millisecond) {
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
        if (hour != null && typeof hour != 'number') {
            // we have a dict
            args = hour;
        }
        TimeIntervals.forEach((field) => {
            args[field] = args[field] || 0;
        });
        Object.assign(this, args);
    }
    str() {
        // we have to set the date to today to avoid any daylight saving nonsense
        const ts = dt.datetime.combine(dt.datetime.now(), this);
        return d3TimeFormat.timeFormat(`%H:%M:%S${this.millisecond ? '.%f' : ''}`)(new Date(ts.valueOf() * 1000));
    }
    valueOf() {
        return (this.hour * toSeconds.hours +
            this.minute * toSeconds.minutes +
            this.second * toSeconds.seconds +
            this.millisecond * toSeconds.milliseconds);
    }
    toString() {
        return this.str();
    }
    toJSON() {
        return this.str();
    }
}
