import * as d3 from 'd3-time-format';
import dt from '..';
import { TimeInterval, TimeParams, toSeconds } from '../models';
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

	str() {
		// we have to set the date to today to avoid any daylight saving nonsense
		const ts = dt.datetime.combine(dt.datetime.now(), this);
		return d3.timeFormat(`%H:%M:%S${this.millisecond ? '.%f' : ''}`)(
			new Date(ts.valueOf() * 1000),
		);
	}

	valueOf() {
		return (
			this.hour * toSeconds.hours +
			this.minute * toSeconds.minutes +
			this.second * toSeconds.seconds +
			this.millisecond * toSeconds.milliseconds
		);
	}
}
