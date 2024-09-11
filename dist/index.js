import { PyTime, PyDate, PyTimedelta, PyDatetime } from './classes';
import { combine, now, strptime, utc, utcnow } from './functions';
const date = (...args) => new PyDate(...args);
const time = (...args) => new PyTime(...args);
const timedelta = (...args) => new PyTimedelta(...args);
const datetime = (...args) => new PyDatetime(...args);
datetime.now = () => now();
datetime.utcnow = () => utcnow();
datetime.utc = (...args) => utc(...args);
datetime.combine = (...args) => combine(...args);
datetime.strptime = (...args) => strptime(...args);
const dt = {
    date,
    time,
    timedelta,
    datetime,
};
export default dt;
