import { PyDate, PyTime, PyDatetime } from '../classes';
export declare function now(): PyDatetime;
export declare function utcnow(): PyDatetime;
export declare function utc(ts: number | PyDatetime | Date): PyDatetime;
export declare function combine(date: PyDate | PyDatetime, time: PyTime): PyDatetime;
export declare function strptime(dateString: string, format: string, is_utc?: boolean): PyDatetime;
