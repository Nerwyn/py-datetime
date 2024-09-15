import * as d3TimeFormat from 'd3-time-format';
import { TimedeltaIntervals, toSeconds, } from '../models';
export class PyTimedelta {
    constructor(days, seconds, milliseconds, minutes, hours, weeks) {
        this.days = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.weeks = 0;
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
            // we have seconds, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
            let totalSeconds = days ?? 0;
            args = {};
            TimedeltaIntervals.forEach((key) => {
                const multiplier = toSeconds[key];
                const value = Math.floor(totalSeconds / multiplier);
                args[key] = value;
                totalSeconds -= value * multiplier;
            });
        }
        TimedeltaIntervals.forEach((key) => {
            this[key] = args[key] || 0;
        });
    }
    str() {
        const days = Math.floor(this.valueOf() / toSeconds.days);
        const dayString = days > 0 ? `${days} day${days > 1 ? 's,' : ','}` : '';
        const timeString = d3TimeFormat.utcFormat(`%-H:%M:%S${this.milliseconds ? '.%f' : ''}`)(new Date(this.valueOf() * 1000));
        return `${dayString} ${timeString}`.trim();
    }
    valueOf() {
        let seconds = TimedeltaIntervals.map((field) => this[field] *
            toSeconds[field]);
        return seconds.reduce((total, current) => total + current);
    }
    toString() {
        return this.str();
    }
    toJSON() {
        return this.str();
    }
}
