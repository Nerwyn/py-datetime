import { PyTime, PyDate, PyTimedelta, PyDatetime } from './classes';
declare const dt: {
    date: (year?: number | undefined, month?: number | undefined, day?: number | undefined) => PyDate;
    time: (hour?: number | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined) => PyTime;
    timedelta: (days?: number | undefined, seconds?: number | undefined, milliseconds?: number | undefined, minutes?: number | undefined, hours?: number | undefined, weeks?: number | undefined) => PyTimedelta;
    datetime: {
        (year?: number | PyDate | PyDatetime | Date | undefined, month?: number | undefined, day?: number | undefined, hour?: number | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined, utc?: boolean | undefined): PyDatetime;
        now(): PyDatetime;
        utcnow(): PyDatetime;
        utc(ts: number | PyDatetime | Date): PyDatetime;
        combine(date: PyDate | PyDatetime, time: PyTime): PyDatetime;
        strptime(dateString: string, format: string, is_utc?: boolean | undefined): PyDatetime;
    };
};
export default dt;
