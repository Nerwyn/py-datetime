import { PyTime, PyDate, PyTimedelta, PyDatetime } from './classes';
import { combine, now, strptime, utc, utcnow } from './functions';

const date = (...args: ConstructorParameters<typeof PyDate>) =>
	new PyDate(...args);
const time = (...args: ConstructorParameters<typeof PyTime>) =>
	new PyTime(...args);
const timedelta = (...args: ConstructorParameters<typeof PyTimedelta>) =>
	new PyTimedelta(...args);
const datetime = (...args: ConstructorParameters<typeof PyDatetime>) =>
	new PyDatetime(...args);

datetime.now = () => now();
datetime.utcnow = () => utcnow();
datetime.utc = (...args: Parameters<typeof utc>) => utc(...args);
datetime.combine = (...args: Parameters<typeof combine>) => combine(...args);
datetime.strptime = (...args: Parameters<typeof strptime>) => strptime(...args);

const dt = {
	date,
	time,
	timedelta,
	datetime,
};
export default dt;
