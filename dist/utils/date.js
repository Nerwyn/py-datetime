import * as d3TimeFormat from 'd3-time-format';
import dt from '..';
import { date, timedelta } from '../classes';
import { MAXYEAR, MINYEAR } from './datetime';
export const min = new date(MINYEAR, 1, 1);
export const max = new date(MAXYEAR, 12, 31);
export const resolution = new timedelta({ days: 1 });
export function today() {
    const today = dt.datetime.now();
    return dt.date(today.year, today.month, today.day);
}
export function fromtimestamp(timestamp) {
    const d = dt.datetime(timestamp);
    return dt.date(d.year, d.month, d.day);
}
export function fromordinal(ordinal) {
    const MINYEAR_ORDINAL = 36160;
    const MAXYEAR_ORDINAL = 3652059;
    if (ordinal < MINYEAR_ORDINAL || ordinal > MAXYEAR_ORDINAL) {
        // MINYEAR and MAXYEAR
        throw RangeError(`ordinal ${ordinal} is out of range`);
    }
    return dt.date.fromtimestamp(min.valueOf() +
        dt.timedelta({ days: ordinal - MINYEAR_ORDINAL }).valueOf());
}
export function fromisoformat(dateString) {
    const formats = ['%Y-%m-%d', '%Y%m%d', '%G-W%V-%u'];
    let d = null;
    for (const format of formats) {
        d = d3TimeFormat.utcParse(format)(dateString);
        if (d) {
            break;
        }
    }
    if (d) {
        return dt.date(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    }
    throw SyntaxError('Unable to parse date string');
}
export function fromisocalendar(year, week, day) {
    const d = dt.datetime.strptime(`${year}-${week}-${day}`, '%G-%V-%u');
    return dt.date(Number(d.year), Number(d.month), Number(d.day));
}
