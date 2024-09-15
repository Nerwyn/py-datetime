export * from './classes';
export * from './models';

import { PyDate, PyDatetime, PyTime, PyTimedelta } from './classes';
import { combine, now, strptime, utc, utcnow } from './functions';

const date = (...args: ConstructorParameters<typeof PyDate>) =>
	new PyDate(...args);
const time = (...args: ConstructorParameters<typeof PyTime>) =>
	new PyTime(...args);
const timedelta = (...args: ConstructorParameters<typeof PyTimedelta>) =>
	new PyTimedelta(...args);
const datetime = (...args: ConstructorParameters<typeof PyDatetime>) =>
	new PyDatetime(...args);

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
