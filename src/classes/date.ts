import * as d3TimeFormat from 'd3-time-format';
import { DateParams, DatetimeParams, toSeconds } from '../models';
import { MAXYEAR, MINYEAR } from '../utils/datetime';
import { isParams } from '../utils/utils';
import { base } from './base';

export class date extends base {
	static readonly min = -2177434800;
	static readonly max = 253402232400;
	static readonly resolution = 86400;

	readonly year: number = 1;
	readonly month: number = 1;
	readonly day: number = 1;

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

	replace(
		year: number | DateParams = this.year,
		month: number = this.month,
		day = this.day,
	) {
		let args: DatetimeParams;
		if (isParams(year)) {
			args = year as DatetimeParams;
		} else {
			args = {
				year: year as number,
				month,
				day,
			};
		}
		return new date(
			args.year ?? this.year,
			args.month ?? this.month,
			args.day ?? this.day,
		);
	}

	toordinal() {
		return this.valueOf() / toSeconds.days;
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return (this.jsDate.getDay() + 6) % 7;
	}

	isoweekday() {
		return this.weekday() + 1;
	}

	isocalendar() {
		const [year, week, weekday] = d3TimeFormat
			.utcFormat('%G-%V-%u')(this.jsDate)
			.split('-');
		return [Number(year), Number(week), Number(weekday)];
	}

	ctime() {
		return d3TimeFormat.timeFormat('%a %b 00:00:00 %Y')(this.jsDate);
	}

	strftime(format: string) {
		return d3TimeFormat.timeFormat(format)(this.jsDate);
	}

	valueOf() {
		return this.jsDate.getTime() / 1000;
	}
}
