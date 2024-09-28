export * from './classes';
export * from './models';
import { date as pydate, datetime as pydatetime, time as pytime, timedelta as pytimedelta } from './classes';
import { fromordinal as dfromordinal, fromtimestamp as dfromtimestamp, fromisocalendar, fromisoformat, today } from './utils/date';
import { combine, fromisocalendar as dtfromisocalendar, fromisoformat as dtfromisoformat, fromordinal as dtfromordinal, fromtimestamp as dtfromtimestamp, fromjsdate, now, strptime, utcfromjsdate, utcfromtimestamp, utcnow } from './utils/datetime';
import { fromisoformat as tfromisoformat } from './utils/time';
/** The datetime module supplies classes for manipulating dates and times. */
declare const dt: {
    /** The smallest year number allowed in date and datetime objects (100). */
    MINYEAR: number;
    /** The largest year number allowed in date and datetime objects (9999). */
    MAXYEAR: number;
    /**
     * A timedelta object represents a duration, the difference betwee two datetime or date instances.
     * @param {number} [days=0]
     * @param {number} [seconds=0]
     * @param {number} [milliseconds=0]
     * @param {number} [minutes=0]
     * @param {number} [hours=0]
     * @param {number} [weeks=0]
     */
    timedelta: {
        (days?: number | Partial<Record<"hours" | "minutes" | "seconds" | "milliseconds" | "weeks" | "days", number>> | undefined, seconds?: number | undefined, milliseconds?: number | undefined, minutes?: number | undefined, hours?: number | undefined, weeks?: number | undefined): pytimedelta;
        /** The most negative timedelta object */
        min: pytimedelta;
        /** The most positive timedelta object */
        max: pytimedelta;
        /** The smallest possible difference between non-equal timedelta, datetime, or time objects */
        resolution: pytimedelta;
    };
    /**
     * A date object represents a date (year, month, and day) in an idealized calendar,
     * the current Gregorian calendar indefinitely extended in both directions.
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    date: {
        (year: number, month: number, day: number): pydate;
        /** The earliest representable date. */
        min: pydate;
        /** The latest representable date. */
        max: pydate;
        /** The smallest possible difference between non-equal date objects. */
        resolution: pytimedelta;
        /**
         * Return the current local date.
         * @returns {date}
         */
        today: typeof today;
        /**
         * Return the local date corresponding to the POSIX timestamp.
         * @param {number} timestamp
         * @returns {date}
         */
        fromtimestamp: typeof dfromtimestamp;
        /**
         * Return the date corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has ordinal 1.
         * @param {number} ordinal
         * @returns {date}
         */
        fromordinal: typeof dfromordinal;
        /**
         * Return a date corresponding to a date_string given in the ISO 8601 format YYYY-MM-DD.
         * @param {string} date_string
         * @returns {date}
         */
        fromisoformat: typeof fromisoformat;
        /**
         * Return a date corresponding to the ISO calendar date specified by year, week, and day.
         * @param {number} year
         * @param {number} week
         * @param {number} day
         * @returns {date}
         */
        fromisocalendar: typeof fromisocalendar;
    };
    /**
     * A datetime object is a single object containing all the information from a date object and a time object.
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @param {number} [hour=0]
     * @param {number} [minute=0]
     * @param {number} [second=0]
     * @param {number} [millisecond=0]
     * @param {boolean} [utc=false]
     */
    datetime: {
        (year?: number | Partial<Record<"hour" | "minute" | "second" | "millisecond" | "year" | "month" | "day", number> & {
            utc: boolean;
        }> | undefined, month?: number | undefined, day?: number | undefined, hour?: number | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined, utc?: boolean | undefined): pydatetime;
        /** The earliest representable datetime. */
        min: pydatetime;
        /** The latest representable datetime. */
        max: pydatetime;
        /** The smallest possible difference between non-equal timedelta, datetime, or time objects */
        resolution: pytimedelta;
        /**
         * Return the current local date and time.
         * @returns {datetime}
         */
        today: typeof today;
        /**
         * Return the current local date and time.
         * Functionally equivalent to dt.datetime.today() but is considered the preferred syntax.
         * @returns {datetime}
         */
        now: typeof now;
        /**
         * Return the current UTC date and time.
         * @returns {datetime}
         */
        utcnow: typeof utcnow;
        /**
         * Return the local date and time corresponding to the POSIX timestamp.
         * @param {number} timestamp
         * @returns {datetime}
         */
        fromtimestamp: typeof dtfromtimestamp;
        /**
         * Return the UTC datetime corresponding to the POSIX timestamp.
         * @param {number} timestamp
         * @returns {datetime}
         */
        utcfromtimestamp: typeof utcfromtimestamp;
        /**
         * Return the local date and time corresponding to the JS Date object.
         * @param {Date} jsdate
         * @returns {datetime}
         */
        fromjsdate: typeof fromjsdate;
        /**
         * Return the UTC datetime corresponding to the JS Date object.
         * @param {Date} jsdate
         * @returns {datetime}
         */
        utcfromjsdate: typeof utcfromjsdate;
        /**
         * Return the datetime corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has oridinal 1.
         * @param {number} ordinal
         * @returns {datetime}
         */
        fromordinal: typeof dtfromordinal;
        /**
         * Return a new datetime object whose date components are equal to the given date object's,
         * and whose time components are equal to the given time object's.
         * If the date argument is a datetime object, its time components are ignored.
         * @param {date | datetime} date
         * @param {time} time
         * @returns {datetime}
         */
        combine: typeof combine;
        /**
         * Return a datetime corresponding to a date_string in any valid ISO 8601 format.
         * @param {string} date_string
         * @returns {datetime}
         */
        fromisoformat: typeof dtfromisoformat;
        /**
         * Return a datetime corresponding to the ISO calendar date specified by the year, week, and day.
         * The non-date components of the datetime are populated with their normal default values.
         * @param {number} year
         * @param {number} week
         * @param {number} day
         * @returns {datetime}
         */
        fromisocalendar: typeof dtfromisocalendar;
        /**
         * Return a datetime corresponding to date_string, parsed according to format.
         * @param {string} date_string
         * @param {string} format
         * @param {boolean} [utc=false]
         * @returns {datetime}
         */
        strptime: typeof strptime;
    };
    /**
     * A time object represents a (local) time of day, independent of any particular day.
     * @param {number} [hour=0]
     * @param {number} [minute=0]
     * @param {number} [second=0]
     * @param {number} [millisecond=0]
     */
    time: {
        (hour?: number | Partial<Record<"hour" | "minute" | "second" | "millisecond", number>> | undefined, minute?: number | undefined, second?: number | undefined, millisecond?: number | undefined): pytime;
        /** The earliest representable time. */
        min: pytime;
        /** The latest representable time. */
        max: pytime;
        /** The smallest possible difference between non-equal timedelta, datetime, or time objects */
        resolution: pytimedelta;
        /**
         * Return a time corresponding to a time_string in any valid ISO 8601 format.
         * @param {string} time_string
         * @returns {time}
         */
        fromisoformat: typeof tfromisoformat;
    };
};
export default dt;
