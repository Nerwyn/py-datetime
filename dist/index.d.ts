export * from './classes';
export * from './models';
import { date as pydate, datetime as pydatetime, time as pytime, timedelta as pytimedelta } from './classes';
import { combine, now, strptime, utc, utcnow } from './functions';
declare const dt: {
    date: (year?: number | undefined, month?: number | undefined, day?: number | undefined) => pydate;
    time: (hour?: number | Partial<Record<"hour" | "minute" | "second" | "millisecond", number>> | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined) => pytime;
    timedelta: (days?: number | Partial<Record<"weeks" | "days" | "hours" | "minutes" | "seconds" | "milliseconds", number>> | undefined, seconds?: number | undefined, milliseconds?: number | undefined, minutes?: number | undefined, hours?: number | undefined, weeks?: number | undefined) => pytimedelta;
    datetime: {
        (year?: number | Date | Partial<Record<"year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond", number> & {
            utc: boolean;
        }> | undefined, month?: number | undefined, day?: number | undefined, hour?: number | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined, utc?: boolean | undefined): pydatetime;
        now: typeof now;
        utcnow: typeof utcnow;
        utc: typeof utc;
        combine: typeof combine;
        strptime: typeof strptime;
    };
};
export default dt;
