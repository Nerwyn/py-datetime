import { time } from '../classes';
/** The earliest representable time. */
export declare const min: time;
/** The latest representable time. */
export declare const max: time;
/**
 * Return a time corresponding to a time_string in any valid ISO 8601 format.
 * @param {string} time_string
 * @returns {time}
 */
export declare function fromisoformat(time_string: string): time;
