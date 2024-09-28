import * as d3 from 'd3-time-format';
import { toSeconds } from '../models';
import { isParams } from '../utils/utils';
export class time {
    constructor(hour = 0, minute = 0, second = 0, millisecond = 0) {
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
        if (isParams(hour)) {
            delete args.hour;
            Object.assign(args, hour);
        }
        for (const arg in args) {
            if (!Number.isInteger(args[arg])) {
                throw TypeError("'float' object cannot be interpreted as an integer");
            }
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
    replace(hour = this.hour, minute = this.minute, second = this.second, millisecond = this.millisecond) {
        let args = {
            hour: hour,
            minute,
            second,
            millisecond,
        };
        if (isParams(hour)) {
            delete args.hour;
            Object.assign(args, hour);
        }
        return new time(args.hour ?? this.hour, args.minute ?? this.minute, args.second ?? this.second, args.millisecond ?? this.millisecond);
    }
    isoformat(timespec = 'auto') {
        let format;
        switch (timespec) {
            case 'hours':
                format = `%H`;
                break;
            case 'minutes':
                format = `%H:%M`;
                break;
            case 'seconds':
                format = `%H:%M:%S`;
                break;
            case 'milliseconds':
                format = `%H:%M:%S.%f`;
                break;
            case 'auto':
            default:
                format = `%H:%M:%S${this.millisecond ? '.%f' : ''}`;
                break;
        }
        return this.strftime(format);
    }
    valueOf() {
        return (this.hour * toSeconds.hours +
            this.minute * toSeconds.minutes +
            this.second * toSeconds.seconds +
            this.millisecond * toSeconds.milliseconds);
    }
    toString() {
        return this.isoformat();
    }
    strftime(format) {
        return d3.utcFormat(format)(this.jsDate);
    }
    get jsDate() {
        return new Date(this.valueOf() * 1000);
    }
}
time.min = 0;
time.max = 86399.999;
time.resolution = 0.001;
