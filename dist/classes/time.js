import { toMillis, TimeIntervals } from '../models';
import dt from '..';
import * as d3TimeFormat from 'd3-time-format';
export class PyTime {
    constructor(hour, minute, second, millisecond) {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        let args = {
            hour,
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
        return d3TimeFormat.timeFormat('%H:%M:%S.%f')(new Date(ts));
    }
    get __totalMillis() {
        return (this.hour * toMillis.hours +
            this.minute * toMillis.minutes +
            this.second * toMillis.seconds +
            this.millisecond);
    }
    valueOf() {
        return this.__totalMillis;
    }
    toString() {
        return this.str();
    }
    toJSON() {
        return this.str();
    }
}
