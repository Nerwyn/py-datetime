export * from './classes';
export * from './models';

import {
	date as pydate,
	datetime as pydatetime,
	time as pytime,
	timedelta as pytimedelta,
} from './classes';
import {
	fromordinal as dfromordinal,
	fromtimestamp as dfromtimestamp,
	max as dmax,
	min as dmin,
	resolution as dresolution,
	fromisocalendar,
	fromisoformat,
	today,
} from './utils/date';
import {
	combine,
	fromisocalendar as dtfromisocalendar,
	fromisoformat as dtfromisoformat,
	fromordinal as dtfromordinal,
	fromtimestamp as dtfromtimestamp,
	max as dtmax,
	min as dtmin,
	fromjsdate,
	now,
	strptime,
	utcfromjsdate,
	utcfromtimestamp,
	utcnow,
} from './utils/datetime';
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
date.fromtimestamp = dfromtimestamp;
date.fromordinal = dfromordinal;
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

const dt = {
	date,
	time,
	timedelta,
	datetime,
};
export default dt;
