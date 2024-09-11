import * as d3TimeFormat from 'd3-time-format';
import dt from '..';
import { PyTimeDict, TimeIntervals, toMillis } from '../models';

export class PyTime {
	hour: number = 0;
	minute: number = 0;
	second: number = 0;
	millisecond: number = 0;

	constructor(
		hour?: number | PyTimeDict,
		minute?: number,
		second?: number,
		millisecond?: number,
	) {
		let args: PyTimeDict | number = {
			hour: hour as number,
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
		return d3TimeFormat.timeFormat('%H:%M:%S.%f')(
			new Date(ts as unknown as number),
		);
	}

	get __totalMillis() {
		return (
			this.hour * toMillis.hours +
			this.minute * toMillis.minutes +
			this.second * toMillis.seconds +
			this.millisecond
		);
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
