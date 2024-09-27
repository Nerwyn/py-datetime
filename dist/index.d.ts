export * from './classes';
export * from './models';
import { date as pydate, datetime as pydatetime, time as pytime, timedelta as pytimedelta } from './classes';
import { fromordinal as dfromordinal, fromtimestamp as dfromtimestamp, fromisocalendar, fromisoformat, today } from './utils/date';
import { combine, fromisocalendar as dtfromisocalendar, fromisoformat as dtfromisoformat, fromordinal as dtfromordinal, fromtimestamp as dtfromtimestamp, fromjsdate, now, strptime, utcfromjsdate, utcfromtimestamp, utcnow } from './utils/datetime';
import { fromisoformat as tfromisoformat } from './utils/time';
declare const dt: {
    timedelta: {
        (days?: number | Partial<Record<"hours" | "minutes" | "seconds" | "milliseconds" | "weeks" | "days", number>> | undefined, seconds?: number | undefined, milliseconds?: number | undefined, minutes?: number | undefined, hours?: number | undefined, weeks?: number | undefined): pytimedelta;
        min: pytimedelta;
        max: pytimedelta;
        resolution: pytimedelta;
    };
    date: {
        (year: number, month: number, day: number): pydate;
        min: pydate;
        max: pydate;
        resolution: pytimedelta;
        today: typeof today;
        fromtimestamp: typeof dfromtimestamp;
        fromordinal: typeof dfromordinal;
        fromisoformat: typeof fromisoformat;
        fromisocalendar: typeof fromisocalendar;
    };
    datetime: {
        (year?: number | Partial<Record<"hour" | "minute" | "second" | "millisecond" | "year" | "month" | "day", number> & {
            utc: boolean;
        }> | undefined, month?: number | undefined, day?: number | undefined, hour?: number | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined, utc?: boolean | undefined): pydatetime;
        min: pydatetime;
        max: pydatetime;
        resolution: pytimedelta;
        today: typeof today;
        now: typeof now;
        utcnow: typeof utcnow;
        fromtimestamp: typeof dtfromtimestamp;
        utcfromtimestamp: typeof utcfromtimestamp;
        fromjsdate: typeof fromjsdate;
        utcfromjsdate: typeof utcfromjsdate;
        fromordinal: typeof dtfromordinal;
        combine: typeof combine;
        fromisoformat: typeof dtfromisoformat;
        fromisocalendar: typeof dtfromisocalendar;
        strptime: typeof strptime;
    };
    time: {
        (hour?: number | Partial<Record<"hour" | "minute" | "second" | "millisecond", number>> | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined): pytime;
        min: pytime;
        max: pytime;
        resolution: pytimedelta;
        fromisoformat: typeof tfromisoformat;
    };
};
export default dt;
