export * from './classes';
export * from './models';

import {
	date as pydate,
	datetime as pydatetime,
	time as pytime,
	timedelta as pytimedelta,
} from './classes';
import {
	max as dmax,
	min as dmin,
	resolution as dresolution,
	fromisocalendar,
	fromisoformat,
	fromordinal,
	fromtimestamp,
	today,
} from './utils/date';
import { combine, now, strptime, utc, utcnow } from './utils/datetime';
import {
	max as tdmax,
	min as tdmin,
	resolution as tdresolution,
} from './utils/timedelta';

const date = (...args: ConstructorParameters<typeof pydate>) =>
	new pydate(...args);

date.min = dmin;
date.max = dmax;
date.resolution = dresolution;
date.today = today;
date.fromtimestamp = fromtimestamp;
date.fromordinal = fromordinal;
date.fromisoformat = fromisoformat;
date.fromisocalendar = fromisocalendar;

const time = (...args: ConstructorParameters<typeof pytime>) =>
	new pytime(...args);
const timedelta = (...args: ConstructorParameters<typeof pytimedelta>) =>
	new pytimedelta(...args);

timedelta.min = tdmin;
timedelta.max = tdmax;
timedelta.resolution = tdresolution;

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
