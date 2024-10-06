import * as d3 from 'd3-time-format';
import { MAXYEAR, MAXYEAR_ORDINAL, MINYEAR, MINYEAR_ORDINAL, } from '../constants';
import { toSeconds } from '../models/timedelta';
import { isParams } from '../utils/utils';
import { datetime } from './datetime';
import { timedelta } from './timedelta';
export class date {
    /**
     * A date object represents a date (year, month, and day) in an idealized calendar,
     * the current Gregorian calendar indefinitely extended in both directions.
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    constructor(year, month, day) {
        this.year = 1970;
        this.month = 1;
        this.day = 1;
        if (!Number.isInteger(year) || year < MINYEAR || year > MAXYEAR) {
            throw RangeError(`year ${year} is out of range`);
        }
        if (!Number.isInteger(month) || month < 1 || month > 12) {
            throw RangeError(`month ${month} is out of range`);
        }
        if (!Number.isInteger(day) ||
            day < 1 ||
            day > new Date(year, month, 0).getDate()) {
            throw RangeError(`day ${day} is out of range for month`);
        }
        Object.assign(this, { year, month, day });
    }
    /**
     * Return a date with the same value,
     * except for those parameters given new values by whichever arguments are specified.
     * @param {number} [year=this.year]
     * @param {number} [month=this.month]
     * @param {number} [day=this.day]
     * @returns {date}
     */
    replace(year = this.year, month = this.month, day = this.day) {
        const args = {
            year: year,
            month,
            day,
        };
        if (isParams(year)) {
            delete args.year;
            Object.assign(args, year);
        }
        return new date(args.year ?? this.year, args.month ?? this.month, args.day ?? this.day);
    }
    /**
     * Return the proleptic Gregorian ordinal ofthe date, where January 1 of year 1 has ordinal 1.
     * @returns {number}
     */
    toordinal() {
        return Math.trunc((this.valueOf() + new timedelta({ days: 719163 }).total_seconds()) /
            toSeconds.days);
    }
    /**
     * Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
     * @returns {number}
     */
    weekday() {
        // javascript week starts on sunday, while python one starts on monday
        return (this.jsDate.getDay() + 6) % 7;
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
     * Return a string representing the date in ISO 8601 format, YYYY-MM-DD.
     * @returns {string}
     */
    isoformat() {
        return d3.utcFormat('%Y-%m-%d')(this.jsDate);
    }
    /**
     * Return the POSIX timestamp of the date, assuming it's time is midnight.
     * @returns {number}
     */
    valueOf() {
        return this.jsDate.getTime() / 1000;
    }
    /**
     * For a date d, d.toString() is equivalent to d.isoformat().
     * @returns {string}
     */
    toString() {
        return this.isoformat();
    }
    /**
     * Return a string representing the date, such as Wed Dec 4 00:00:00 2002.
     * @returns {string}
     */
    ctime() {
        return d3.timeFormat('%a %b %-e 00:00:00 %Y')(this.jsDate);
    }
    /**
     * Return a string representing the date, controlled by an explicit format string.
     * Format codes referring to hours, minutes, or seconds will see 0 values.
     * @param {string} format
     * @returns {string}
     */
    strftime(format) {
        return d3.timeFormat(format)(this.jsDate);
    }
    /** Return this object as a JS Date object */
    get jsDate() {
        return new Date(this.year, this.month - 1, this.day);
    }
    /** The earliest representable date POSIX timestamp, equal to -2177434800. */
    static get min() {
        return new date(MINYEAR, 1, 1);
    }
    /** The latest representable date  POSIX timestamp, equal to 253402232400. */
    static get max() {
        return new date(MAXYEAR, 12, 31);
    }
    /** The smallest possible difference between non-equal date objects, 1 day, in seconds. */
    static get resolution() {
        return new timedelta({ days: 1 });
    }
    /**
     * Return the current local date.
     * @returns {date}
     */
    static today() {
        const today = datetime.now();
        return new date(today.year, today.month, today.day);
    }
    /**
     * Return the local date corresponding to the POSIX timestamp.
     * @param {number} timestamp
     * @returns {date}
     */
    static fromtimestamp(timestamp) {
        const d = datetime.fromtimestamp(timestamp);
        return new date(d.year, d.month, d.day);
    }
    /**
     * Return the date corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has ordinal 1.
     * @param {number} ordinal
     * @returns {date}
     */
    static fromordinal(ordinal) {
        if (ordinal < MINYEAR_ORDINAL || ordinal > MAXYEAR_ORDINAL) {
            throw RangeError(`ordinal ${ordinal} is out of range`);
        }
        return date.fromtimestamp(date.min.valueOf() +
            new timedelta({ days: ordinal - MINYEAR_ORDINAL }).valueOf());
    }
    /**
     * Return a date corresponding to a date_string given in the ISO 8601 format YYYY-MM-DD.
     * @param {string} date_string
     * @returns {date}
     */
    static fromisoformat(date_string) {
        const d = d3.isoParse(date_string);
        if (d) {
            return new date(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
        }
        throw SyntaxError('Unable to parse date string');
    }
    /**
     * Return a date corresponding to the ISO calendar date specified by year, week, and day.
     * @param {number} year
     * @param {number} week
     * @param {number} day
     * @returns {date}
     */
    static fromisocalendar(year, week, day) {
        const d = datetime.strptime(`${year}-${week}-${day}`, '%G-%V-%u');
        return new date(Number(d.year), Number(d.month), Number(d.day));
    }
}
