import { TimeParams, TimeSpec } from '../models';
export declare class time {
    /** The earliest representable time in seconds. */
    static readonly min: number;
    /** The latest representable time in seconds. */
    static readonly max: number;
    /** The smallest possible difference between non-equal time objects, 1ms, in seconds. */
    static readonly resolution: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    /**
     * A time object represents a (local) time of day, independent of any particular day.
     * @param {number} [hour=0]
     * @param {number} [minute=0]
     * @param {number} [second=0]
     * @param {number} [millisecond=0]
     */
    constructor(hour?: number | TimeParams, minute?: number, second?: number, millisecond?: number);
    /**
     * Return a time with the ame value,
     * except for those attributes given new values by whichever arguments are specified.
     * @param {number} [hour=this.hour]
     * @param {number} [minute=this.minute]
     * @param {number} [second=this.second]
     * @param {number} [millisecond=this.millisecond]
     * @returns {time}
     */
    replace(hour?: number | TimeParams, minute?: number, second?: number, millisecond?: number): time;
    /**
     * Return a string representing the time in ISO 8601 format.
     * @param {TimeSpec} [timespec='auto'] Specifies the number of additional components of the time to include
     * @returns {time}
     */
    isoformat(timespec?: TimeSpec): string;
    /**
     * Return the time in seconds.
     * @returns {number}
     */
    valueOf(): number;
    /**
     * For a time t, t.valueOf() is equivalent to t.isoformat().
     * @returns {string}
     */
    toString(): string;
    /**
     * Return a string representing the time, controlled by an explicit format string.
     * @param {string} format
     * @returns {string}
     */
    strftime(format: string): string;
    /** Return this object as a JS Date object */
    get jsDate(): Date;
}
