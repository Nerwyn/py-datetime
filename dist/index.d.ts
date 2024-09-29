export * from './classes';
import { date, datetime, time, timedelta } from './classes';
/**
 * The datetime module supplies classes for manipulating dates and times.
 * This convenience class exists for more pythonic instantiation
 */
declare const dt: {
    MINYEAR: number;
    MAXYEAR: number;
    MINYEAR_ORDINAL: number;
    MAXYEAR_ORDINAL: number;
    timedelta: {
        (days?: number | Partial<Record<"hours" | "minutes" | "seconds" | "milliseconds" | "weeks" | "days", number>> | undefined, seconds?: number | undefined, milliseconds?: number | undefined, minutes?: number | undefined, hours?: number | undefined, weeks?: number | undefined): timedelta;
        min: timedelta;
        max: timedelta;
        resolution: timedelta;
    };
    date: {
        (year: number, month: number, day: number): date;
        min: date;
        max: date;
        resolution: timedelta;
        today: typeof date.today;
        fromtimestamp: typeof date.fromtimestamp;
        fromordinal: typeof date.fromordinal;
        fromisoformat: typeof date.fromisoformat;
        fromisocalendar: typeof date.fromisocalendar;
    };
    datetime: {
        (year?: number | Partial<Record<"year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond", number> & {
            utc: boolean;
        }> | undefined, month?: number | undefined, day?: number | undefined, hour?: number | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined, utc?: boolean | undefined): datetime;
        min: datetime;
        max: datetime;
        resolution: timedelta;
        today: typeof datetime.today;
        now: typeof datetime.now;
        utcnow: typeof datetime.utcnow;
        fromtimestamp: typeof datetime.fromtimestamp;
        utcfromtimestamp: typeof datetime.utcfromtimestamp;
        fromjsdate: typeof datetime.fromjsdate;
        utcfromjsdate: typeof datetime.utcfromjsdate;
        fromordinal: typeof datetime.fromordinal;
        combine: typeof datetime.combine;
        fromisoformat: typeof datetime.fromisoformat;
        fromisocalendar: typeof datetime.fromisocalendar;
        strptime: typeof datetime.strptime;
    };
    time: {
        (hour?: number | Partial<Record<"hour" | "minute" | "second" | "millisecond", number>> | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined): time;
        min: time;
        max: time;
        resolution: timedelta;
        fromisoformat: typeof time.fromisoformat;
    };
};
export default dt;
