import * as d3 from 'd3-time-format';
import dt from '..';
import { TimeIntervals, TimeParams, toSeconds } from '../models';
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

		TimeIntervals.forEach((field) => {
			args[field] = args[field] || 0;
		});

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
