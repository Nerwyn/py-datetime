import * as d3TimeFormat from 'd3-time-format';
import { date, time } from '.';
import { DatetimeInterval, DatetimeIntervals, DatetimeParams } from '../models';
import { isParams } from '../utils/utils';
import { base } from './base';

export class datetime extends base {
	year: number = 0;
	month: number = 1;
	day: number = 1;
	hour: number = 0;
	minute: number = 0;
	second: number = 0;
	millisecond: number = 0;
	utc: boolean = false;

	constructor(
		year?: number | DatetimeParams | Date,
		month?: number,
		day?: number,
		hour?: number,
		minute?: number,
		second?: number,
		millisecond?: number,
		utc?: boolean,
	) {
		super();
		let args: DatetimeParams = {};
		this.utc = utc ?? false;

		if (typeof year == 'number' && !month && !day) {
			// while a dt.datetime(2020) is perfectly valid, it's quite unlikely.
			// much more unlikely than having gotten an epoch passed in. convert that to date
			year = new Date(year * 1000);
		}

		if (year instanceof Date) {
			// JS Date
			args = {
				year: year.getFullYear(),
				month: year.getMonth() + 1,
				day: year.getDate(),
				hour: year.getHours(),
				minute: year.getMinutes(),
				second: year.getSeconds(),
				millisecond: year.getMilliseconds(),
			};
		} else if (isParams(year)) {
			// datetime or date
			args = year as datetime;
		} else {
			args = {
				year: year as number,
				month,
				day,
				hour,
				minute,
				second,
				millisecond,
			};
		}

		if (!args.year || !args.month || !args.day) {
			throw SyntaxError('Missing required argument year, month, or day');
		}
		for (const arg in DatetimeIntervals) {
			if (args[arg as DatetimeInterval] ?? 0 % 1 != 0) {
				throw TypeError('Float cannot be interpreted as an integer');
			}
		}

		Object.assign(this, args);
	}

	replace(
		year?: number | DatetimeParams,
		month?: number,
		day?: number,
		hour?: number,
		minute?: number,
		second?: number,
		millisecond?: number,
	) {
		// returns new date with updated values
		let args: DatetimeParams = {};
		if (isParams(year)) {
			args = year as DatetimeParams;
		} else {
			args = {
				year: year as number,
				month,
				day,
				hour,
				minute,
				second,
				millisecond,
			};
		}

		const newTs = new datetime(this);
		Object.entries(args).forEach(([key, val]) => {
			if (val) {
				newTs[key as DatetimeInterval] = val as number;
			}
		});
		return newTs;
	}

	get jsDate(): Date {
		if (this.utc) {
			return new Date(this.valueOf() * 1000);
		} else {
			return new Date(
				this.year!,
				this.month! - 1,
				this.day || 1,
				this.hour || 0,
				this.minute || 0,
				this.second || 0,
				this.millisecond || 0,
			);
		}
	}

	str() {
		return this.strftime(
			`%Y-%m-%d %H:%M:%S${this.millisecond ? '.%f' : ''}`,
		);
	}

	valueOf() {
		let value: number;
		if (this.utc) {
			value = Date.UTC(
				this.year!,
				this.month! - 1,
				this.day || 1,
				this.hour || 0,
				this.minute || 0,
				this.second || 0,
				this.millisecond || 0,
			);
		} else {
			value = this.jsDate.getTime();
		}
		return value / 1000;
	}

	strftime(format: string) {
		if (this.utc) {
			return d3TimeFormat.utcFormat(format)(this.jsDate);
		} else {
			return d3TimeFormat.timeFormat(format)(this.jsDate);
		}
	}

	time() {
		return new time(this.hour, this.minute, this.second, this.millisecond);
	}

	date() {
		return new date(this.year, this.month, this.day);
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return this.date().weekday();
	}

	isoweekday() {
		return this.weekday() + 1;
	}

	timestamp() {
		return this.valueOf();
	}
}
