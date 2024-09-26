import * as d3TimeFormat from 'd3-time-format';
import { MAXYEAR, MINYEAR } from '../utils/datetime';
import { base } from './base';

export class date extends base {
	static readonly MINYEAR = MINYEAR;
	static readonly MAXYEAR = MAXYEAR;

	year: number = 0;
	month: number = 1;
	day: number = 1;

	constructor(year: number, month: number, day: number) {
		super();
		if (year < MINYEAR || year > MAXYEAR) {
			throw RangeError(`year ${year} is out of range`);
		}
		if (month < 1 || month > 12) {
			throw RangeError(`month ${month} is out of range`);
		}
		if (day < 1 || day > new Date(year, month, 0).getDate()) {
			throw RangeError(`day ${day} is out of range for month`);
		}
		Object.assign(this, { year, month, day });
	}

	get jsDate() {
		return new Date(this.year!, this.month! - 1, this.day);
	}

	str() {
		return d3TimeFormat.timeFormat('%Y-%m-%d')(this.jsDate);
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return (this.jsDate.getDay() + 6) % 7;
	}

	isoweekday() {
		return this.weekday() + 1;
	}

	valueOf() {
		return this.jsDate.getTime() / 1000;
	}
}
