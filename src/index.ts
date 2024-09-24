export * from './classes';
export * from './models';

import {
	date as pydate,
	datetime as pydatetime,
	time as pytime,
	timedelta as pytimedelta,
} from './classes';
import { combine, now, strptime, utc, utcnow } from './utils/datetime';
import { resolution, max as tdmax, min as tdmin } from './utils/timedelta';

const date = (...args: ConstructorParameters<typeof pydate>) =>
	new pydate(...args);
const time = (...args: ConstructorParameters<typeof pytime>) =>
	new pytime(...args);
const timedelta = (...args: ConstructorParameters<typeof pytimedelta>) =>
	new pytimedelta(...args);

timedelta.min = tdmin;
timedelta.max = tdmax;
timedelta.resolution = resolution;

const datetime = (...args: ConstructorParameters<typeof pydatetime>) =>
	new pydatetime(...args);

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
