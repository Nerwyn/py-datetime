import * as d3 from 'd3-time-format';
import { date, time } from '.';
import {
	DatetimeInterval,
	DatetimeIntervals,
	DatetimeParams,
	ISOFormatParams,
	TimeSpec,
} from '../models';
import { isParams } from '../utils/utils';
import { base } from './base';

export class datetime extends base {
	static readonly min: number = -59011416000;
	static readonly max: number = 253402300799.999;
	static readonly resolution: number = 0.001;

	readonly year: number = 0;
	readonly month: number = 1;
	readonly day: number = 1;
	readonly hour: number = 0;
	readonly minute: number = 0;
	readonly second: number = 0;
	readonly millisecond: number = 0;
	readonly utc: boolean = false;

	constructor(
		year?: number | DatetimeParams,
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

		if (isParams(year)) {
			args = year as datetime;
			this.utc = args.utc ?? false;
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
			this.utc = utc ?? false;
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
		year: number | DatetimeParams = this.year,
		month: number = this.month,
		day: number = this.day,
		hour: number = this.hour,
		minute: number = this.minute,
		second: number = this.second,
		millisecond: number = this.millisecond,
	) {
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

		return new datetime({
			year: args.year ?? this.year,
			month: args.month ?? this.month,
			day: args.day ?? this.day,
			hour: args.hour ?? this.hour,
			minute: args.minute ?? this.minute,
			second: args.second ?? this.second,
			millisecond: args.millisecond ?? this.millisecond,
		});
	}

	date() {
		return new date(this.year, this.month, this.day);
	}

	time() {
		return new time(this.hour, this.minute, this.second, this.millisecond);
	}

	toordinal() {
		return this.date().toordinal();
	}

	timestamp() {
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

	weekday() {
		return this.date().weekday();
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

	isoformat(
		sep: string | ISOFormatParams = 'T',
		timespec: TimeSpec = 'auto',
	) {
		let args: ISOFormatParams;
		if (isParams(sep)) {
			// args = sep as ISOFormatParams;
			args = {
				sep: 'T',
				timespec: 'auto',
				...(sep as ISOFormatParams),
			};
		} else {
			args = {
				sep: sep as string,
				timespec,
			};
		}
		let format: string;
		switch (args.timespec) {
			case 'hours':
				format = `%Y-%m-%d${args.sep}%H`;
				break;
			case 'minutes':
				format = `%Y-%m-%d${args.sep}%H:%M`;
				break;
			case 'seconds':
				format = `%Y-%m-%d${args.sep}%H:%M:%S`;
				break;
			case 'milliseconds':
				format = `%Y-%m-%d${args.sep}%H:%M:%S.%f`;
				break;
			case 'auto':
			default:
				format = `%Y-%m-%d${args.sep}%H:%M:%S${this.millisecond ? '.%f' : ''}`;
				break;
		}
		return this.strftime(format);
	}

	str() {
		// TODO change all instances of this to toString() and test
		return this.isoformat(' ');
	}

	ctime() {
		return d3.timeFormat('%a %b %H:%M:%S %Y')(this.jsDate);
	}

	strftime(format: string) {
		if (this.utc) {
			return d3.utcFormat(format)(this.jsDate);
		} else {
			return d3.timeFormat(format)(this.jsDate);
		}
	}

	valueOf() {
		return this.timestamp();
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
}
