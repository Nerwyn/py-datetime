import * as d3 from 'd3-time-format';
import { time } from '../classes';
export const min = new time(0, 0, 0, 0);
export const max = new time(23, 59, 59, 999);
export function fromisoformat(time_string) {
    const d = d3.isoParse(`1970-01-01T${time_string}`);
    if (d) {
        return new time(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
    }
    throw SyntaxError('Unable to parse date string');
}
