import * as d3 from 'd3-time-format';
import { DateParams, DatetimeParams, toSeconds } from '../models';
import { MAXYEAR, MINYEAR } from '../utils/datetime';
import { isParams } from '../utils/utils';
import { timedelta } from './timedelta';

export class date {
	static readonly min: number = -2177434800;
	static readonly max: number = 253402232400;
	static readonly resolution: number = 86400;

	readonly year: number = 1970;
	readonly month: number = 1;
	readonly day: number = 1;

	constructor(year: number, month: number, day: number) {
		if (!Number.isInteger(year) || year < MINYEAR || year > MAXYEAR) {
			throw RangeError(`year ${year} is out of range`);
		}
		if (!Number.isInteger(month) || month < 1 || month > 12) {
			throw RangeError(`month ${month} is out of range`);
		}
		if (
			!Number.isInteger(day) ||
			day < 1 ||
			day > new Date(year, month, 0).getDate()
		) {
			throw RangeError(`day ${day} is out of range for month`);
		}
		Object.assign(this, { year, month, day });
	}

	replace(
		year: number | DateParams = this.year,
		month: number = this.month,
		day = this.day,
	) {
		const args: DatetimeParams = {
			year: year as number,
			month,
			day,
		};
		if (isParams(year)) {
			delete args.year;
			Object.assign(args, year);
		}
		return new date(
			args.year ?? this.year,
			args.month ?? this.month,
			args.day ?? this.day,
		);
	}

	toordinal() {
		return Math.trunc(
			(this.valueOf() + new timedelta({ days: 719163 }).total_seconds()) /
				toSeconds.days,
		);
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return (this.jsDate.getDay() + 6) % 7;
	}

	isoweekday() {
		return this.weekday() + 1;
	}

	isocalendar() {
		const [year, week, weekday] = d3
			.utcFormat('%G-%V-%u')(this.jsDate)
			.split('-');
		return [Number(year), Number(week), Number(weekday)];
	}

	isoformat() {
		return d3.utcFormat('%Y-%m-%d')(this.jsDate);
	}

	toString() {
		return this.isoformat();
	}

	ctime() {
		return d3.timeFormat('%a %b 00:00:00 %Y')(this.jsDate);
	}

	strftime(format: string) {
		return d3.timeFormat(format)(this.jsDate);
	}

	valueOf() {
		return this.jsDate.getTime() / 1000;
	}

	get jsDate() {
		return new Date(this.year!, this.month! - 1, this.day);
	}
}
