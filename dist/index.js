export * from './classes';
export * from './models';
import { date as pydate, datetime as pydatetime, time as pytime, timedelta as pytimedelta, } from './classes';
import { combine, now, strptime, utc, utcnow } from './functions';
const date = (...args) => new pydate(...args);
const time = (...args) => new pytime(...args);
const timedelta = (...args) => new pytimedelta(...args);
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
