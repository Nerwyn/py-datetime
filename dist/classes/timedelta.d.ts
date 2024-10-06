import { TimedeltaParams } from '../models/timedelta';
export declare class timedelta {
    readonly days: number;
    readonly seconds: number;
    readonly milliseconds: number;
    /**
     * A timedelta object represents a duration, the difference betwee two datetime or date instances.
     * @param {number} [days=0]
     * @param {number} [seconds=0]
     * @param {number} [milliseconds=0]
     * @param {number} [minutes=0]
     * @param {number} [hours=0]
     * @param {number} [weeks=0]
     */
    constructor(days?: number | TimedeltaParams, seconds?: number, milliseconds?: number, minutes?: number, hours?: number, weeks?: number);
    /**
     * Return the total number of seconds contained in the duration.
     * @returns {number}
     */
    total_seconds(): number;
    /**
     * For a timedelta delta, delta.valueOf() is equivalent to delta.total_seconds().
     * @returns {number}
     */
    valueOf(): number;
    /**
     * Return the days, hours, minutes, seconds, and milliseconds of the timedelta in a string format.
     * If the timedelta is less than one day then days is not included.
     * If the timedelta does not have a millisecond component then it is also not included.
     * @returns {string}
     */
    toString(): string;
    /** The most negative timedelta object, equal to -8640000000000 seconds */
    static get min(): timedelta;
    private get minSeconds();
    /** The most positive timedelta object, equal to 8640000000000 seconds */
    static get max(): timedelta;
    private get maxSeconds();
    /** The smallest possible difference between non-equal timedelta objects, equal to 0.001 seconds  */
    static get resolution(): timedelta;
}
