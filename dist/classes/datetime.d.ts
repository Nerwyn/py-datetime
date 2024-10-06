import { date, time, timedelta } from '.';
import { DatetimeParams, ISOFormatParams, TimeSpec } from '../models/datetime';
export declare class datetime {
    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly utc: boolean;
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
    constructor(year: number | DatetimeParams, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, utc?: boolean);
    /**
     * Return date object with same year, month, and day.
     * @returns {date}
     */
    date(): date;
    /**
     * Return time object with same hour, minute, second, and millisecond.
     * @returns {time}
     */
    time(): time;
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
    replace(year?: number | DatetimeParams, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): datetime;
    /**
     * Return the proleptic Gregorian ordinal of the date.
     * @returns {number}
     */
    toordinal(): number;
    /**
     * Return the POSIX timestamp corresponding to the datetime instance.
     * @returns {number}
     */
    timestamp(): number;
    /**
     * Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
     * @returns {number}
     */
    weekday(): number;
    /**
     * Return the day of the week as an integer, where Monday is 1 and Sunday is 7.
     * @returns {number}
     */
    isoweekday(): number;
    /**
     * Return an array with three components: year, week, and weekday.
     * @returns {[number, number, number]}
     */
    isocalendar(): number[];
    /**
     * Return a string representing the date and time in ISO 8601 format.
     * @param {string} [sep='T'] A one-character separator, placed between the date and time portions of the result.
     * @param {TimeSpec} [timespec='auto'] Specifies the number of additional components of the time to include.
     * @returns {string}
     */
    isoformat(sep?: string | ISOFormatParams, timespec?: TimeSpec): string;
    /**
     * For a datetime instance d, d.valueOf() is equivalent to d.timestamp().
     * @returns {number}
     */
    valueOf(): number;
    /**
     * For a datetime instance d, d.toString() is equivalent to d.isoformat(' ').
     * @returns {string}
     */
    toString(): string;
    /**
     * Return a string representing the date and time, such as Wed Dec 4 20:30:40 2002.
     * @returns {string}
     */
    ctime(): string;
    /**
     * Return a string representing the date and time, controlled by an explicit format string
     * @param {string} format
     * @returns {string}
     */
    strftime(format: string): string;
    /** Return this object as a JS Date object */
    get jsDate(): Date;
    /** The earliest representable datetime POSIX timestamp, equal to -59011416000 seconds. */
    static get min(): datetime;
    /** The latest representable datetime POSIX timestamp, equal to 253402300799.999 seconds. */
    static get max(): datetime;
    /** The smallest possible difference between non-equal datetime objects, 1 millisecond, in seconds. */
    static get resolution(): timedelta;
    /**
     * Return the current local date and time.
     * @returns {datetime}
     */
    static today(): datetime;
    /**
     * Return the current local date and time.
     * Functionally equivalent to dt.datetime.today() but is considered the preferred syntax.
     * @returns {datetime}
     */
    static now(): datetime;
    /**
     * Return the current UTC date and time.
     * @returns {datetime}
     */
    static utcnow(): datetime;
    /**
     * Return the local date and time corresponding to the POSIX timestamp.
     * @param {number} timestamp
     * @returns {datetime}
     */
    static fromtimestamp(timestamp: number): datetime;
    /**
     * Return the UTC datetime corresponding to the POSIX timestamp.
     * @param {number} timestamp
     * @returns {datetime}
     */
    static utcfromtimestamp(timestamp: number): datetime;
    /**
     * Return the local date and time corresponding to the JS Date object.
     * @param {Date} jsdate
     * @returns {datetime}
     */
    static fromjsdate(jsdate: Date): datetime;
    /**
     * Return the UTC datetime corresponding to the JS Date object.
     * @param {Date} jsdate
     * @returns {datetime}
     */
    static utcfromjsdate(jsdate: Date): datetime;
    /**
     * Return the datetime corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has oridinal 1.
     * @param {number} ordinal
     * @returns {datetime}
     */
    static fromordinal(ordinal: number): datetime;
    /**
     * Return a new datetime object whose date components are equal to the given date object's,
     * and whose time components are equal to the given time object's.
     * If the date argument is a datetime object, its time components are ignored.
     * @param {date | datetime} date
     * @param {time} time
     * @returns {datetime}
     */
    static combine(date: date | datetime, time: time): datetime;
    /**
     * Return a datetime corresponding to a date_string in any valid ISO 8601 format.
     * @param {string} date_string
     * @returns {datetime}
     */
    static fromisoformat(date_string: string): datetime;
    /**
     * Return a datetime corresponding to the ISO calendar date specified by the year, week, and day.
     * The non-date components of the datetime are populated with their normal default values.
     * @param {number} year
     * @param {number} week
     * @param {number} day
     * @returns {datetime}
     */
    static fromisocalendar(year: number, week: number, day: number): datetime;
    /**
     * Return a datetime corresponding to date_string, parsed according to format.
     * @param {string} date_string
     * @param {string} format
     * @param {boolean} [utc=false]
     * @returns {datetime}
     */
    static strptime(date_string: string, format: string, utc?: boolean): datetime;
}
