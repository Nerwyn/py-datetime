import { date, datetime, time } from '../classes';
export declare function now(): datetime;
export declare function utcnow(): datetime;
export declare function utc(ts: number | datetime | date | Date): datetime;
export declare function combine(date: date | datetime, time: time): datetime;
export declare function strptime(dateString: string, format: string, isUtc?: boolean): datetime;
