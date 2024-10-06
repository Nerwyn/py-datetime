import * as d3 from 'd3-time-format';
import { date, time, timedelta } from '.';
import {
	MAXYEAR,
	MAXYEAR_ORDINAL,
	MINYEAR,
	MINYEAR_ORDINAL,
} from '../constants';
import {
	DatetimeInterval,
	DatetimeIntervals,
	DatetimeParams,
	ISOFormatParams,
	TimeSpec,
} from '../models/datetime';
import { isParams } from '../utils/utils';

export class datetime {
	readonly year: number = 1970;
	readonly month: number = 1;
	readonly day: number = 1;
	readonly hour: number = 0;
	readonly minute: number = 0;
	readonly second: number = 0;
	readonly millisecond: number = 0;
	readonly utc: boolean = false;

	/**
	 * A datetime object is a single object containing all the information from a date object and a time object.
	 * @param {number} year
	 * @param {number} month
	 * @param {number} day
	 * @param {number} [hour=0]
	 * @param {number} [minute=0]
	 * @param {number} [second=0]
	 * @param {number} [millisecond=0]
	 * @param {boolean} [utc=false]
	 */
	constructor(
		year: number | DatetimeParams,
		month?: number,
		day?: number,
		hour: number = 0,
		minute: number = 0,
		second: number = 0,
		millisecond: number = 0,
		utc: boolean = false,
	) {
		const args: DatetimeParams = {
			year: year as number,
			month,
			day,
			hour,
			minute,
			second,
			millisecond,
			utc,
		};
		if (isParams(year)) {
			delete args.year;
			Object.assign(args, year);
		}

		for (const arg in args) {
			if (
				DatetimeIntervals.includes(arg as DatetimeInterval) &&
				!Number.isInteger(args[arg as DatetimeInterval])
			) {
				throw TypeError(
					`Argument ${arg} value ${args[arg as DatetimeInterval]} is not an integer`,
				);
			}
		}

		if (!args.year || !args.month || !args.day) {
			throw SyntaxError('Missing required argument year, month, or day');
		}
		if (args.year < MINYEAR || args.year > MAXYEAR) {
			throw RangeError(`year ${args.year} is out of range`);
		}
		if (args.month < 1 || args.month > 12) {
			throw RangeError(`month ${args.month} is out of range`);
		}
		if (
			args.day < 1 ||
			args.day > new Date(args.year, args.month, 0).getDate()
		) {
			throw RangeError(`day ${day} is out of range for month`);
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

	/**
	 * Return date object with same year, month, and day.
	 * @returns {date}
	 */
	date() {
		return new date(this.year, this.month, this.day);
	}

	/**
	 * Return time object with same hour, minute, second, and millisecond.
	 * @returns {time}
	 */
	time() {
		return new time(this.hour, this.minute, this.second, this.millisecond);
	}

	/**
	 * Return a datetime with the same attributes,
	 * except for those attributes given new values by whichever arguments are specified.
	 * @param {number} [year=this.year]
	 * @param {number} [month=this.month]
	 * @param {number} [day=this.day]
	 * @param {number} [hour=this.hour]
	 * @param {number} [minute=this.minute]
	 * @param {number} [second=this.second]
	 * @param {number} [millisecond=this.millisecond]
	 * @returns {datetime}
	 */
	replace(
		year: number | DatetimeParams = this.year,
		month: number = this.month,
		day: number = this.day,
		hour: number = this.hour,
		minute: number = this.minute,
		second: number = this.second,
		millisecond: number = this.millisecond,
	) {
		const args: DatetimeParams = {
			year: year as number,
			month,
			day,
			hour,
			minute,
			second,
			millisecond,
		};
		if (isParams(year)) {
			delete args.year;
			Object.assign(args, year);
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

	/**
	 * Return the proleptic Gregorian ordinal of the date.
	 * @returns {number}
	 */
	toordinal() {
		return this.date().toordinal();
	}

	/**
	 * Return the POSIX timestamp corresponding to the datetime instance.
	 * @returns {number}
	 */
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

	/**
	 * Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
	 * @returns {number}
	 */
	weekday() {
		return this.date().weekday();
	}

	/**
	 * Return the day of the week as an integer, where Monday is 1 and Sunday is 7.
	 * @returns {number}
	 */
	isoweekday() {
		return this.weekday() + 1;
	}

	/**
	 * Return an array with three components: year, week, and weekday.
	 * @returns {[number, number, number]}
	 */
	isocalendar() {
		const [year, week, weekday] = d3
			.utcFormat('%G-%V-%u')(this.jsDate)
			.split('-');
		return [Number(year), Number(week), Number(weekday)];
	}

	/**
	 * Return a string representing the date and time in ISO 8601 format.
	 * @param {string} [sep='T'] A one-character separator, placed between the date and time portions of the result.
	 * @param {TimeSpec} [timespec='auto'] Specifies the number of additional components of the time to include.
	 * @returns {string}
	 */
	isoformat(
		sep: string | ISOFormatParams = 'T',
		timespec: TimeSpec = 'auto',
	) {
		const args: ISOFormatParams = {
			sep: sep as string,
			timespec,
		};
		if (isParams(sep)) {
			delete args.sep;
			Object.assign(args, sep);
			args.sep = args.sep ?? 'T';
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

	/**
	 * For a datetime instance d, d.valueOf() is equivalent to d.timestamp().
	 * @returns {number}
	 */
	valueOf() {
		return this.timestamp();
	}

	/**
	 * For a datetime instance d, d.toString() is equivalent to d.isoformat(' ').
	 * @returns {string}
	 */
	toString() {
		return this.isoformat(' ');
	}

	/**
	 * Return a string representing the date and time, such as Wed Dec 4 20:30:40 2002.
	 * @returns {string}
	 */
	ctime() {
		return d3.timeFormat('%a %b %-e %H:%M:%S %Y')(this.jsDate);
	}

	/**
	 * Return a string representing the date and time, controlled by an explicit format string
	 * @param {string} format
	 * @returns {string}
	 */
	strftime(format: string) {
		if (this.utc) {
			return d3.utcFormat(format)(this.jsDate);
		} else {
			return d3.timeFormat(format)(this.jsDate);
		}
	}

	/** Return this object as a JS Date object */
	get jsDate(): Date {
		if (this.utc) {
			return new Date(this.valueOf() * 1000);
		} else {
			return new Date(
				this.year,
				this.month - 1,
				this.day || 1,
				this.hour || 0,
				this.minute || 0,
				this.second || 0,
				this.millisecond || 0,
			);
		}
	}

	/** The earliest representable datetime POSIX timestamp, equal to -59011416000 seconds. */
	static get min() {
		return new datetime(MINYEAR, 1, 1);
	}

	/** The latest representable datetime POSIX timestamp, equal to 253402300799.999 seconds. */
	static get max() {
		return new datetime(MAXYEAR, 12, 31, 23, 59, 59, 999);
	}

	/** The smallest possible difference between non-equal datetime objects, 1 millisecond, in seconds. */
	static get resolution() {
		return timedelta.resolution;
	}

	/**
	 * Return the current local date and time.
	 * @returns {datetime}
	 */
	static today() {
		return datetime.now();
	}

	/**
	 * Return the current local date and time.
	 * Functionally equivalent to dt.datetime.today() but is considered the preferred syntax.
	 * @returns {datetime}
	 */
	static now() {
		return datetime.fromjsdate(new Date());
	}

	/**
	 * Return the current UTC date and time.
	 * @returns {datetime}
	 */
	static utcnow() {
		return datetime.utcfromjsdate(new Date());
	}

	/**
	 * Return the local date and time corresponding to the POSIX timestamp.
	 * @param {number} timestamp
	 * @returns {datetime}
	 */
	static fromtimestamp(timestamp: number) {
		const jsdate = new Date(timestamp * 1000);
		return datetime.fromjsdate(jsdate);
	}

	/**
	 * Return the UTC datetime corresponding to the POSIX timestamp.
	 * @param {number} timestamp
	 * @returns {datetime}
	 */
	static utcfromtimestamp(timestamp: number) {
		const jsdate = new Date(timestamp * 1000);
		return datetime.utcfromjsdate(jsdate);
	}

	/**
	 * Return the local date and time corresponding to the JS Date object.
	 * @param {Date} jsdate
	 * @returns {datetime}
	 */
	static fromjsdate(jsdate: Date) {
		return new datetime({
			year: jsdate.getFullYear(),
			month: jsdate.getMonth() + 1,
			day: jsdate.getDate(),
			hour: jsdate.getHours(),
			minute: jsdate.getMinutes(),
			second: jsdate.getSeconds(),
			millisecond: jsdate.getMilliseconds(),
		});
	}

	/**
	 * Return the UTC datetime corresponding to the JS Date object.
	 * @param {Date} jsdate
	 * @returns {datetime}
	 */
	static utcfromjsdate(jsdate: Date) {
		return new datetime({
			year: jsdate.getUTCFullYear(),
			month: jsdate.getUTCMonth() + 1,
			day: jsdate.getUTCDate(),
			hour: jsdate.getUTCHours(),
			minute: jsdate.getUTCMinutes(),
			second: jsdate.getUTCSeconds(),
			millisecond: jsdate.getUTCMilliseconds(),
			utc: true,
		});
	}

	/**
	 * Return the datetime corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has oridinal 1.
	 * @param {number} ordinal
	 * @returns {datetime}
	 */
	static fromordinal(ordinal: number) {
		if (ordinal < MINYEAR_ORDINAL || ordinal > MAXYEAR_ORDINAL) {
			throw RangeError(`ordinal ${ordinal} is out of range`);
		}
		return datetime.fromtimestamp(
			date.min.valueOf() +
				new timedelta({ days: ordinal - MINYEAR_ORDINAL }).valueOf(),
		);
	}

	/**
	 * Return a new datetime object whose date components are equal to the given date object's,
	 * and whose time components are equal to the given time object's.
	 * If the date argument is a datetime object, its time components are ignored.
	 * @param {date | datetime} date
	 * @param {time} time
	 * @returns {datetime}
	 */
	static combine(date: date | datetime, time: time) {
		return new datetime({
			year: date.year,
			month: date.month,
			day: date.day,
			hour: time.hour,
			minute: time.minute,
			second: time.second,
			millisecond: time.millisecond,
		});
	}

	/**
	 * Return a datetime corresponding to a date_string in any valid ISO 8601 format.
	 * @param {string} date_string
	 * @returns {datetime}
	 */
	static fromisoformat(date_string: string) {
		const d = d3.isoParse(date_string);
		if (d) {
			return datetime.fromjsdate(d);
		}
		throw SyntaxError('Unable to parse date string');
	}

	/**
	 * Return a datetime corresponding to the ISO calendar date specified by the year, week, and day.
	 * The non-date components of the datetime are populated with their normal default values.
	 * @param {number} year
	 * @param {number} week
	 * @param {number} day
	 * @returns {datetime}
	 */
	static fromisocalendar(year: number, week: number, day: number) {
		return datetime.strptime(`${year}-${week}-${day}`, '%G-%V-%u');
	}

	/**
	 * Return a datetime corresponding to date_string, parsed according to format.
	 * @param {string} date_string
	 * @param {string} format
	 * @param {boolean} [utc=false]
	 * @returns {datetime}
	 */
	static strptime(date_string: string, format: string, utc: boolean = false) {
		const parser = utc ? d3.utcParse : d3.timeParse;
		const parsed = parser(format)(date_string);
		if (!parsed) {
			throw Error(`'${date_string}' does not match format '${format}'`);
		}
		return utc
			? datetime.utcfromjsdate(parsed)
			: datetime.fromjsdate(parsed);
	}
}
