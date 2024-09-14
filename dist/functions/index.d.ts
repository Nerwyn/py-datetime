import { PyDate, PyDatetime, PyTime } from '../classes';
export declare function now(): PyDatetime;
export declare function utcnow(): PyDatetime;
export declare function utc(ts: number | PyDatetime | PyDate | Date): PyDatetime;
export declare function combine(date: PyDate | PyDatetime, time: PyTime): PyDatetime;
export declare function strptime(dateString: string, format: string, isUtc?: boolean): PyDatetime;
