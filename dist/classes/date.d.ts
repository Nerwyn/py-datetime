import { DateParams } from '../models';
export declare class date {
    /** The earliest representable date POSIX timestamp. */
    static readonly min: number;
    /** The latest representable date  POSIX timestamp. */
    static readonly max: number;
    /** The smallest possible difference between non-equal date objects, 1 day, in seconds. */
    static readonly resolution: number;
    readonly year: number;
    readonly month: number;
    readonly day: number;
    /**
     * A date object represents a date (year, month, and day) in an idealized calendar,
     * the current Gregorian calendar indefinitely extended in both directions.
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    constructor(year: number, month: number, day: number);
    /**
     * Return a date with the same value,
     * except for those parameters given new values by whichever arguments are specified.
     * @param {number} [year=this.year]
     * @param {number} [month=this.month]
     * @param {number} [day=this.day]
     * @returns {date}
     */
    replace(year?: number | DateParams, month?: number, day?: number): date;
    /**
     * Return the proleptic Gregorian ordinal ofthe date, where January 1 of year 1 has ordinal 1.
     * @returns {number}
     */
    toordinal(): number;
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
     * Return a string representing the date in ISO 8601 format, YYYY-MM-DD.
     * @returns {string}
     */
    isoformat(): string;
    /**
     * Return the POSIX timestamp of the date, assuming it's time is midnight.
     * @returns {number}
     */
    valueOf(): number;
    /**
     * For a date d, d.toString() is equivalent to d.isoformat().
     * @returns {string}
     */
    toString(): string;
    /**
     * Return a string representing the date, such as Wed Dec 4 00:00:00 2002.
     * @returns {string}
     */
    ctime(): string;
    /**
     * Return a string representing the date, controlled by an explicit format string.
     * Format codes referring to hours, minutes, or seconds will see 0 values.
     * @param {string} format
     * @returns {string}
     */
    strftime(format: string): string;
    /** Return this object as a JS Date object */
    get jsDate(): Date;
}
