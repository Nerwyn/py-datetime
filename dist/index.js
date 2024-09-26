export * from './classes';
export * from './models';
import { date as pydate, datetime as pydatetime, time as pytime, timedelta as pytimedelta, } from './classes';
import { fromisoformat, fromordinal, fromtimestamp, today } from './utils/date';
import { combine, MAXYEAR, MINYEAR, now, strptime, utc, utcnow, } from './utils/datetime';
import { resolution, max as tdmax, min as tdmin } from './utils/timedelta';
const date = (...args) => new pydate(...args);
date.MINYEAR = MINYEAR;
date.MAXYEAR = MAXYEAR;
date.today = today;
date.fromtimestamp = fromtimestamp;
date.fromordinal = fromordinal;
date.fromisoformat = fromisoformat;
const time = (...args) => new pytime(...args);
const timedelta = (...args) => new pytimedelta(...args);
timedelta.min = tdmin;
timedelta.max = tdmax;
timedelta.resolution = resolution;
const datetime = (...args) => new pydatetime(...args);
datetime.now = now;
datetime.utcnow = utcnow;
datetime.utc = utc;
datetime.combine = combine;
datetime.strptime = strptime;
const dt = {
    date,
    time,
    timedelta,
    datetime,
};
export default dt;
