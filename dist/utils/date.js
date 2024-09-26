import * as d3TimeFormat from 'd3-time-format';
import dt from '..';
export function today() {
    const today = dt.datetime.now();
    return dt.date(today.year, today.month, today.day);
}
export function fromtimestamp(timestamp) {
    const d = dt.datetime(timestamp);
    return dt.date(d.year, d.month, d.day);
}
export function fromordinal(ordinal) {
    const d = dt.datetime(dt.datetime(0, 0, 0).valueOf() +
        dt.timedelta({ days: ordinal }).valueOf());
    return dt.date(d.year, d.month, d.day);
}
export function fromisoformat(dateString) {
    const formats = ['%Y-%m-%d', '%Y%m%d', '%Y-W%W-%w', '%YW%W%w'];
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
}
