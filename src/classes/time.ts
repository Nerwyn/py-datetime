import * as d3 from 'd3-time-format';
import { TimeInterval, TimeParams, TimeSpec, toSeconds } from '../models';
import { isParams } from '../utils/utils';
import { base } from './base';

export class time extends base {
	static readonly min: number = 0;
	static readonly max: number = 86399.999;
	static readonly resolution: number = 0.001;

	readonly hour: number = 0;
	readonly minute: number = 0;
	readonly second: number = 0;
	readonly millisecond: number = 0;

	constructor(
		hour: number | TimeParams = 0,
		minute: number = 0,
		second: number = 0,
		millisecond: number = 0,
	) {
		super();
		let args: TimeParams = {
			hour: hour as number,
			minute,
			second,
			millisecond,
		};
		if (isParams(hour)) {
			delete args.hour;
			Object.assign(args, hour);
		}

		for (const arg in args) {
			if (!Number.isInteger(args[arg as TimeInterval])) {
				throw TypeError(
					"'float' object cannot be interpreted as an integer",
				);
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

	replace(
		hour: number | TimeParams = this.hour,
		minute: number = this.minute,
		second: number = this.second,
		millisecond: number = this.millisecond,
	) {
		let args: TimeParams = {
			hour: hour as number,
			minute,
			second,
			millisecond,
		};
		if (isParams(hour)) {
			delete args.hour;
			Object.assign(args, hour);
		}
		return new time(
			args.hour ?? this.hour,
			args.minute ?? this.minute,
			args.second ?? this.second,
			args.millisecond ?? this.millisecond,
		);
	}

	isoformat(timespec: TimeSpec = 'auto') {
		let format: string;
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

	toString() {
		return this.isoformat();
	}

	strftime(format: string) {
		return d3.utcFormat(format)(this.jsDate);
	}

	valueOf() {
		return (
			this.hour * toSeconds.hours +
			this.minute * toSeconds.minutes +
			this.second * toSeconds.seconds +
			this.millisecond * toSeconds.milliseconds
		);
	}

	get jsDate(): Date {
		return new Date(this.valueOf() * 1000);
	}
}
