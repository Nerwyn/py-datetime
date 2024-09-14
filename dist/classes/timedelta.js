import * as d3TimeFormat from 'd3-time-format';
import { TimedeltaIntervals, toMillis, } from '../models';
export class PyTimedelta {
    constructor(days, seconds, milliseconds, minutes, hours, weeks) {
        let args = {
            days: days,
            seconds,
            milliseconds,
            minutes,
            hours,
            weeks,
        };
        if (days != null && typeof days != 'number') {
            // we have a dict
            args = days;
        }
        else if (Math.abs(days) > 900) {
            // we have millis, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
            let totalMillis = days ?? 0;
            args = {};
            TimedeltaIntervals.forEach((key) => {
                const multiplier = toMillis[key];
                const val = Math.floor(totalMillis / multiplier);
                if (val) {
                    args[key] = val;
                    totalMillis -= val * multiplier;
                }
            });
        }
        TimedeltaIntervals.forEach((key) => {
            this[key] = args[key] || 0;
        });
    }
    get __totalMillis() {
        let millis = TimedeltaIntervals.map((field) => this[field] *
            toMillis[field]);
        return millis.reduce((total, current) => total + current);
    }
    str() {
        const ONE_DAY = 86400000;
        const days = Math.floor(this.valueOf() / ONE_DAY);
        const dayString = days > 0 ? `${days} day${days > 1 ? 's,' : ','}` : '';
        return `${dayString} ${d3TimeFormat.utcFormat('%-H:%M:%S.%f')(new Date(this.valueOf()))}`.trim();
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
