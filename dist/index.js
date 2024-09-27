export * from './classes';
export * from './models';
import { date as pydate, datetime as pydatetime, time as pytime, timedelta as pytimedelta, } from './classes';
import { fromordinal as dfromordinal, fromtimestamp as dfromtimestamp, max as dmax, min as dmin, resolution as dresolution, fromisocalendar, fromisoformat, today, } from './utils/date';
import { combine, fromisocalendar as dtfromisocalendar, fromisoformat as dtfromisoformat, fromordinal as dtfromordinal, fromtimestamp as dtfromtimestamp, max as dtmax, min as dtmin, fromjsdate, now, strptime, utcfromjsdate, utcfromtimestamp, utcnow, } from './utils/datetime';
import { fromisoformat as tfromisoformat, max as tmax, min as tmin, } from './utils/time';
import { max as tdmax, min as tdmin, resolution as tdresolution, } from './utils/timedelta';
const timedelta = (...args) => new pytimedelta(...args);
timedelta.min = tdmin;
timedelta.max = tdmax;
timedelta.resolution = tdresolution;
const date = (...args) => new pydate(...args);
date.min = dmin;
date.max = dmax;
date.resolution = dresolution;
date.today = today;
date.fromtimestamp = dfromtimestamp;
date.fromordinal = dfromordinal;
date.fromisoformat = fromisoformat;
date.fromisocalendar = fromisocalendar;
const datetime = (...args) => new pydatetime(...args);
datetime.min = dtmin;
datetime.max = dtmax;
datetime.resolution = tdresolution;
datetime.today = today;
datetime.now = now;
datetime.utcnow = utcnow;
datetime.fromtimestamp = dtfromtimestamp;
datetime.utcfromtimestamp = utcfromtimestamp;
datetime.fromjsdate = fromjsdate;
datetime.utcfromjsdate = utcfromjsdate;
datetime.fromordinal = dtfromordinal;
datetime.combine = combine;
datetime.fromisoformat = dtfromisoformat;
datetime.fromisocalendar = dtfromisocalendar;
datetime.strptime = strptime;
const time = (...args) => new pytime(...args);
time.min = tmin;
time.max = tmax;
time.resolution = tdresolution;
time.fromisoformat = tfromisoformat;
const dt = {
    timedelta,
    date,
    datetime,
    time,
};
export default dt;
