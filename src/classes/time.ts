import * as d3TimeFormat from 'd3-time-format';
import dt from '..';
import { isParams } from '../functions';
import { TimeIntervals, TimeParams, toSeconds } from '../models';
import { base } from './base';

export class time extends base {
	hour: number = 0;
	minute: number = 0;
	second: number = 0;
	millisecond: number = 0;

	constructor(
		hour?: number | TimeParams,
		minute?: number,
		second?: number,
		millisecond?: number,
	) {
		super();
		let args: TimeParams = {
			hour: hour as number,
			minute,
			second,
			millisecond,
		};
		if (isParams(hour)) {
			args = hour as TimeParams;
		}
		TimeIntervals.forEach((field) => {
			args[field] = args[field] || 0;
		});
		Object.assign(this, args);
	}

	str() {
		// we have to set the date to today to avoid any daylight saving nonsense
		const ts = dt.datetime.combine(dt.datetime.now(), this);
		return d3TimeFormat.timeFormat(
			`%H:%M:%S${this.millisecond ? '.%f' : ''}`,
		)(new Date(ts.valueOf() * 1000));
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
