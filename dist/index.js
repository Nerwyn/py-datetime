export * from './classes';
export * from './models';
import { date as pydate, datetime as pydatetime, time as pytime, timedelta as pytimedelta, } from './classes';
import { fromordinal as dfromordinal, fromtimestamp as dfromtimestamp, max as dmax, min as dmin, resolution as dresolution, fromisocalendar, fromisoformat, today, } from './utils/date';
import { combine, fromisocalendar as dtfromisocalendar, fromisoformat as dtfromisoformat, fromordinal as dtfromordinal, fromtimestamp as dtfromtimestamp, max as dtmax, min as dtmin, fromjsdate, MAXYEAR, MINYEAR, now, strptime, utcfromjsdate, utcfromtimestamp, utcnow, } from './utils/datetime';
import { fromisoformat as tfromisoformat, max as tmax, min as tmin, } from './utils/time';
import { max as tdmax, min as tdmin, resolution as tdresolution, } from './utils/timedelta';
const timedelta = (...args) => new pytimedelta(...args);
/** The most negative timedelta object */
timedelta.min = tdmin;
/** The most positive timedelta object */
timedelta.max = tdmax;
/** The smallest possible difference between non-equal timedelta, datetime, or time objects */
timedelta.resolution = tdresolution;
const date = (...args) => new pydate(...args);
/** The earliest representable date. */
date.min = dmin;
/** The latest representable date. */
date.max = dmax;
/** The smallest possible difference between non-equal date objects. */
date.resolution = dresolution;
/**
 * Return the current local date.
 * @returns {date}
 */
date.today = today;
/**
 * Return the local date corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {date}
 */
date.fromtimestamp = dfromtimestamp;
/**
 * Return the date corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has ordinal 1.
 * @param {number} ordinal
 * @returns {date}
 */
date.fromordinal = dfromordinal;
/**
 * Return a date corresponding to a date_string given in the ISO 8601 format YYYY-MM-DD.
 * @param {string} date_string
 * @returns {date}
 */
date.fromisoformat = fromisoformat;
/**
 * Return a date corresponding to the ISO calendar date specified by year, week, and day.
 * @param {number} year
 * @param {number} week
 * @param {number} day
 * @returns {date}
 */
date.fromisocalendar = fromisocalendar;
const datetime = (...args) => new pydatetime(...args);
/** The earliest representable datetime. */
datetime.min = dtmin;
/** The latest representable datetime. */
datetime.max = dtmax;
/** The smallest possible difference between non-equal timedelta, datetime, or time objects */
datetime.resolution = tdresolution;
/**
 * Return the current local date and time.
 * @returns {datetime}
 */
datetime.today = today;
/**
 * Return the current local date and time.
 * Functionally equivalent to dt.datetime.today() but is considered the preferred syntax.
 * @returns {datetime}
 */
datetime.now = now;
/**
 * Return the current UTC date and time.
 * @returns {datetime}
 */
datetime.utcnow = utcnow;
/**
 * Return the local date and time corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {datetime}
 */
datetime.fromtimestamp = dtfromtimestamp;
/**
 * Return the UTC datetime corresponding to the POSIX timestamp.
 * @param {number} timestamp
 * @returns {datetime}
 */
datetime.utcfromtimestamp = utcfromtimestamp;
/**
 * Return the local date and time corresponding to the JS Date object.
 * @param {Date} jsdate
 * @returns {datetime}
 */
datetime.fromjsdate = fromjsdate;
/**
 * Return the UTC datetime corresponding to the JS Date object.
 * @param {Date} jsdate
 * @returns {datetime}
 */
datetime.utcfromjsdate = utcfromjsdate;
/**
 * Return the datetime corresponding to the proleptic Gregorian ordinal, where January 1 of year 1 has oridinal 1.
 * @param {number} ordinal
 * @returns {datetime}
 */
datetime.fromordinal = dtfromordinal;
/**
 * Return a new datetime object whose date components are equal to the given date object's,
 * and whose time components are equal to the given time object's.
 * If the date argument is a datetime object, its time components are ignored.
 * @param {date | datetime} date
 * @param {time} time
 * @returns {datetime}
 */
datetime.combine = combine;
/**
 * Return a datetime corresponding to a date_string in any valid ISO 8601 format.
 * @param {string} date_string
 * @returns {datetime}
 */
datetime.fromisoformat = dtfromisoformat;
/**
 * Return a datetime corresponding to the ISO calendar date specified by the year, week, and day.
 * The non-date components of the datetime are populated with their normal default values.
 * @param {number} year
 * @param {number} week
 * @param {number} day
 * @returns {datetime}
 */
datetime.fromisocalendar = dtfromisocalendar;
/**
 * Return a datetime corresponding to date_string, parsed according to format.
 * @param {string} date_string
 * @param {string} format
 * @param {boolean} [utc=false]
 * @returns {datetime}
 */
datetime.strptime = strptime;
const time = (...args) => new pytime(...args);
/** The earliest representable time. */
time.min = tmin;
/** The latest representable time. */
time.max = tmax;
/** The smallest possible difference between non-equal timedelta, datetime, or time objects */
time.resolution = tdresolution;
/**
 * Return a time corresponding to a time_string in any valid ISO 8601 format.
 * @param {string} time_string
 * @returns {time}
 */
time.fromisoformat = tfromisoformat;
/** The datetime module supplies classes for manipulating dates and times. */
const dt = {
    /** The smallest year number allowed in date and datetime objects (100). */
    MINYEAR,
    /** The largest year number allowed in date and datetime objects (9999). */
    MAXYEAR,
    /**
     * A timedelta object represents a duration, the difference betwee two datetime or date instances.
     * @param {number} [days=0]
     * @param {number} [seconds=0]
     * @param {number} [milliseconds=0]
     * @param {number} [minutes=0]
     * @param {number} [hours=0]
     * @param {number} [weeks=0]
     */
    timedelta,
    /**
     * A date object represents a date (year, month, and day) in an idealized calendar,
     * the current Gregorian calendar indefinitely extended in both directions.
     * @param {number} year
     * @param {number} month
     * @param {number} day
     */
    date,
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
    datetime,
    /**
     * A time object represents a (local) time of day, independent of any particular day.
     * @param {number} [hour=0]
     * @param {number} [minute=0]
     * @param {number} [second=0]
     * @param {number} [millisecond=0]
     */
    time,
};
export default dt;
