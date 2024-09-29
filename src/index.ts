export * from './classes';

import { date, datetime, time, timedelta } from './classes';
import {
	MAXYEAR,
	MAXYEAR_ORDINAL,
	MINYEAR,
	MINYEAR_ORDINAL,
} from './constants';

const pytimedelta = (...args: ConstructorParameters<typeof timedelta>) =>
	new timedelta(...args);
pytimedelta.min = timedelta.min;
pytimedelta.max = timedelta.max;
pytimedelta.resolution = timedelta.resolution;

const pydate = (...args: ConstructorParameters<typeof date>) =>
	new date(...args);
pydate.min = date.min;
pydate.max = date.max;
pydate.resolution = date.resolution;
pydate.today = date.today;
pydate.fromtimestamp = date.fromtimestamp;
pydate.fromordinal = date.fromordinal;
pydate.fromisoformat = date.fromisoformat;
pydate.fromisocalendar = date.fromisocalendar;

const pydatetime = (...args: ConstructorParameters<typeof datetime>) =>
	new datetime(...args);
pydatetime.min = datetime.min;
pydatetime.max = datetime.max;
pydatetime.resolution = datetime.resolution;
pydatetime.today = datetime.today;
pydatetime.now = datetime.now;
pydatetime.utcnow = datetime.utcnow;
pydatetime.fromtimestamp = datetime.fromtimestamp;
pydatetime.utcfromtimestamp = datetime.utcfromtimestamp;
pydatetime.fromjsdate = datetime.fromjsdate;
pydatetime.utcfromjsdate = datetime.utcfromjsdate;
pydatetime.fromordinal = datetime.fromordinal;
pydatetime.combine = datetime.combine;
pydatetime.fromisoformat = datetime.fromisoformat;
pydatetime.fromisocalendar = datetime.fromisocalendar;
pydatetime.strptime = datetime.strptime;

const pytime = (...args: ConstructorParameters<typeof time>) =>
	new time(...args);
pytime.min = time.min;
pytime.max = time.max;
pytime.resolution = time.resolution;
pytime.fromisoformat = time.fromisoformat;

/**
 * The datetime module supplies classes for manipulating dates and times.
 * This convenience class exists for more pythonic instantiation
 */
const dt = {
	MINYEAR,
	MAXYEAR,
	MINYEAR_ORDINAL,
	MAXYEAR_ORDINAL,
	timedelta: pytimedelta,
	date: pydate,
	datetime: pydatetime,
	time: pytime,
};

export default dt;
