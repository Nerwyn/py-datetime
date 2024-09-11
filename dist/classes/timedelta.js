import { toMillis, TimeDeltaIntervals } from '../models';
import * as d3TimeFormat from 'd3-time-format';
export class PyTimedelta {
    constructor(days, seconds, milliseconds, minutes, hours, weeks) {
        let args = {
            weeks,
            days,
            hours,
            minutes,
            seconds,
            milliseconds,
        };
        if (typeof days != 'number') {
            // we have a dict
            args = days;
        }
        else if (Math.abs(days) > 900) {
            // we have millis, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
            let totalMillis = days;
            args = {};
            TimeDeltaIntervals.forEach((key) => {
                const multiplier = toMillis[key];
                const val = Math.floor(totalMillis / multiplier);
                if (val) {
                    args[key] = val;
                    totalMillis -= val * multiplier;
                }
            });
        }
        TimeDeltaIntervals.forEach((key) => {
            this[key] = args[key] || 0;
        });
    }
    get __totalMillis() {
        let millis = TimeDeltaIntervals.map((field) => this[field] *
            toMillis[field]);
        return millis.reduce((total, current) => total + current);
    }
    str() {
        return d3TimeFormat.timeFormat('%H:%M:%S.%f')(new Date(this));
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
    totalSeconds() {
        return this.__totalMillis / 1000;
    }
}
