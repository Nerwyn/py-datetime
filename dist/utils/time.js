import * as d3 from 'd3-time-format';
import { time } from '../classes';
/** The earliest representable time. */
export const min = new time(0, 0, 0, 0);
/** The latest representable time. */
export const max = new time(23, 59, 59, 999);
/**
 * Return a time corresponding to a time_string in any valid ISO 8601 format.
 * @param {string} time_string
 * @returns {time}
 */
export function fromisoformat(time_string) {
    const d = d3.isoParse(`1970-01-01T${time_string}`);
    if (d) {
        return new time(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
    }
    throw SyntaxError('Unable to parse date string');
}
