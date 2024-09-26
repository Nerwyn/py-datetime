import assert from 'assert';
import { equalDates } from '.';
import dt from '../src/index.ts';

describe('datetime math', () => {
	it('dt.datetime - dt.timedelta(days) = dt.datetime', () => {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12).valueOf() - dt.timedelta(3).valueOf(),
			),
			dt.datetime(2020, 3, 9),
		);
	});

	it('dt.datetime - dt.timedelta(days, seconds, milliseconds, minutes, hours)', () => {
		// dt.datetime is year, month, day, hour, minute, second, milli
		// dt.timedelta is day, sec, milli, minute, hour
		// the argument order in timedelta is not random - days + seconds is the main usecase
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12, 10, 10, 10, 10).valueOf() -
					dt.timedelta(1, 2, 3, 4, 5).valueOf(),
			),
			dt.datetime(2020, 3, 11, 5, 6, 8, 7),
		);
	});

	it('dt.datetime - dt.timedelta({seconds: 10})', () => {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12, 10, 10, 10, 10).valueOf() -
					dt.timedelta({ seconds: 10 }).valueOf(),
			),
			dt.datetime(2020, 3, 12, 10, 10, 0, 10),
		);
	});

	it('dt.datetime - dt.timedelta({hours: 2.4})', () => {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12, 10, 10, 10, 10).valueOf() -
					dt.timedelta({ hours: 2.4 }).valueOf(),
			),
			dt.datetime(2020, 3, 12, 7, 46, 10, 10),
		);
	});

	it('dt.datetime - dt.timedelta({seconds: 2.4})', () => {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12, 10, 10, 10, 10).valueOf() -
					dt.timedelta({ seconds: 2.4 }).valueOf(),
			),
			dt.datetime(2020, 3, 12, 10, 10, 7, 610),
		);
	});

	it('dt.datetime - dt.timedelta({weeks: 2})', () => {
		// Avoid testing time differences that cross over daylight savings start/end to save American developers a lot of headache
		equalDates(
			dt.datetime(
				dt.datetime(2020, 4, 15).valueOf() -
					dt.timedelta({ weeks: 2 }).valueOf(),
			),
			dt.datetime(2020, 4, 1),
		);
	});
});

describe('datetime and date math', () => {
	it('dt.datetime - dt.date', () => {
		assert.equal(
			dt.datetime(2020, 1, 11, 12).valueOf() -
				dt.date(2020, 1, 1).valueOf(),
			dt.timedelta({ days: 10, hours: 12 }),
		);
	});
});

describe('float input', () => {
	it('dt.timedelta float input', () => {
		const td = dt.timedelta({ seconds: 2.4 });
		assert.equal(td.seconds, 2);
		assert.equal(td.milliseconds, 400);
	});
});

describe('min, max, resolution', () => {
	it('should return the min, max, and resolution as attributes', () => {
		assert.equal(dt.timedelta.min.valueOf(), -86399999913600);
		assert.equal(dt.timedelta.max.valueOf(), 86400000000000);
		assert.equal(dt.timedelta.resolution.valueOf(), 0.001);
	});
});

describe('str', () => {
	it('should include days if more than one day', () => {
		assert.equal(dt.timedelta({ weeks: 2 }).str(), '14 days, 0:00:00');
		assert.equal(dt.timedelta({ hours: 25 }).str(), '1 day, 1:00:00');
	});

	it('should not include days if less than one day', () => {
		assert.equal(
			dt.timedelta({ hours: 12, seconds: 24, milliseconds: 13 }).str(),
			'12:00:24.013000',
		);
		assert.equal(
			dt
				.timedelta({
					hours: 23,
					minutes: 22,
					seconds: 21,
					milliseconds: 120,
				})
				.str(),
			'23:22:21.120000',
		);
	});

	it('should work with decimal values', () => {
		assert.equal(dt.timedelta({ seconds: 2.4 }).str(), '0:00:02.400000');
		assert.equal(dt.timedelta({ days: 2.2 }).str(), '2 days, 4:48:00');
	});
});
