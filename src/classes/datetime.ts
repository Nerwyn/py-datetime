import * as d3TimeFormat from 'd3-time-format';
import { PyDate, PyTime } from '.';
import {
	DateInterval,
	DatetimeInterval,
	DatetimeIntervals,
	PyDatetimeDict,
} from '../models';

export class PyDatetime {
	year: number = 0;
	month: number = 1;
	day: number = 1;
	hour: number = 0;
	minute: number = 0;
	second: number = 0;
	millisecond: number = 0;
	utc: boolean = false;

	constructor(
		year?: number | PyDatetimeDict | Date,
		month?: number,
		day?: number,
		hour?: number,
		minute?: number,
		second?: number,
		millisecond?: number,
		utc?: boolean,
	) {
		let args: PyDatetimeDict = {};
		this.utc = utc ?? false;

		if (typeof year == 'number' && !month && !day) {
			// while a dt.datetime(2020) is perfectly valid, it's quite unlikely.
			// much more unlikely than having gotten an epoch passed in. convert that to date
			year = new Date(year * 1000);
		}

		if (
			(year as PyDatetime)?.year &&
			(year as PyDatetime)?.month &&
			(year as PyDatetime)?.day
		) {
			const ts = year as PyDatetime;
			DatetimeIntervals.forEach((field) => {
				args[field as DatetimeInterval] = ts[field as DateInterval];
			});
			if ((ts as PyDatetime).utc) {
				args.utc = (ts as PyDatetime).utc;
			}
		} else if (year instanceof Date) {
			const ts = year;
			args = {
				year: ts.getFullYear(),
				month: ts.getMonth() + 1,
				day: ts.getDate(),
				hour: ts.getHours(),
				minute: ts.getMinutes(),
				second: ts.getSeconds(),
				millisecond: ts.getMilliseconds(),
			};
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
		Object.assign(this, args);
	}

	replace(
		year?: number,
		month?: number,
		day?: number,
		hour?: number,
		minute?: number,
		second?: number,
		millisecond?: number,
	) {
		// returns new date with updated values
		let args: Record<string, number | undefined> = {};
		if (year && typeof year != 'number') {
			args = year;
		} else {
			args = { year, month, day, hour, minute, second, millisecond };
		}

		const newTs = new PyDatetime(this);
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
		return this.strftime('%Y-%m-%d %H:%M:%S.%f');
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

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}

	strftime(format: string) {
		if (this.utc) {
			return d3TimeFormat.utcFormat(format)(this.jsDate);
		} else {
			return d3TimeFormat.timeFormat(format)(this.jsDate);
		}
	}

	time() {
		return new PyTime(
			this.hour,
			this.minute,
			this.second,
			this.millisecond,
		);
	}

	date() {
		return new PyDate(this.year, this.month, this.day);
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return this.date().weekday();
	}

	isoweekday() {
		return this.weekday() + 1;
	}
}
