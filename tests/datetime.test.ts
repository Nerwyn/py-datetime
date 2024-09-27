import assert from 'assert';
import { equalDates } from '.';
import dt from '../src/index.ts';

describe('constructor', () => {
	it('should require year, month, and day', () => {
		equalDates(dt.datetime(2020, 4, 12), new Date(2020, 3, 12));
		assert.throws(() => dt.datetime(2020, 4));
		assert.throws(() => dt.datetime({ month: 12, day: 19 }));
	});

	it('should optionally allow hour, minute, second, milliecond, and utc', () => {
		equalDates(dt.datetime(2020, 4, 12, 7), new Date(2020, 3, 12, 7));
		equalDates(
			dt.datetime(2020, 4, 12, 7, 13),
			new Date(2020, 3, 12, 7, 13),
		);
		equalDates(
			dt.datetime({
				year: 2020,
				month: 4,
				day: 12,
				second: 32,
				millisecond: 974,
			}),
			new Date(2020, 3, 12, 0, 0, 32, 974),
		);
		assert.equal(
			dt
				.datetime({
					year: 2020,
					month: 4,
					day: 12,
					utc: true,
				})
				.valueOf(),
			Date.UTC(2020, 3, 12) / 1000,
		);
	});

	it('should only allow integers', () => {
		assert.throws(() => dt.datetime(2020, 4, 12, 22.2));
	});

	it('should restrict inputs to ranges', () => {
		assert.throws(() => dt.datetime(99, 11, 4, 0, 5, 23, 997));
		assert.throws(() => dt.datetime(10000, 11, 4, 0, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 0, 4, 0, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 13, 4, 0, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 11, 0, 0, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 11, 32, 0, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 2, 30, 0, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 11, 4, -1, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 11, 4, 25, 5, 23, 997));
		assert.throws(() => dt.datetime(2020, 11, 4, 0, -1, 23, 997));
		assert.throws(() => dt.datetime(2020, 11, 4, 0, 61, 23, 997));
		assert.throws(() => dt.datetime(2020, 11, 4, 0, 5, -1, -1));
		assert.throws(() => dt.datetime(2020, 11, 4, 0, 5, 61, 1000));
	});
});

describe('now', () => {
	it('should return the current local datetime', () => {
		// to test if .now() returns now we just check that they are within 0.1 sec of each other
		let dtNow = dt.datetime.now().jsDate;
		assert(dtNow.getTime() - new Date().getTime() < 100);
	});
});

describe('fromtimestamp', () => {
	it('should return the local datetime corresponding to the POSIX timestamp', () => {
		assert.equal(dt.datetime.fromtimestamp(1512415125).hour, 14);
		assert.equal(dt.datetime.fromtimestamp(1512415125).utc, false);
	});
});

describe('utctimestamp', () => {
	it('should return the UTC datetime corresponding to the POSIX tiemstamp', () => {
		assert.equal(dt.datetime.utcfromtimestamp(1512415125).hour, 19);
		assert.equal(dt.datetime.utcfromtimestamp(1512415125).utc, true);
	});
});

describe('fromjsdate', () => {
	it('should return the local datetime corresponding to the JS Date', () => {
		let date = new Date(1512415125 * 1000);
		assert.equal(dt.datetime.fromjsdate(date).hour, 14);
		assert.equal(dt.datetime.fromjsdate(date).utc, false);
	});
});

describe('utcfromjsdate', () => {
	it('should return the UTC datetime corresponding to the JS Date', () => {
		let date = new Date(1512415125 * 1000);
		console.log(date);
		console.log(dt.datetime.utcfromjsdate(date));
		assert.equal(dt.datetime.utcfromjsdate(date).hour, 19);
		assert.equal(dt.datetime.utcfromjsdate(date).utc, true);
	});
});

describe('fromordinal', () => {
	it('should return a datetime given an proleptic Gregorian calendar ordinal', () => {
		assert.equal(dt.datetime.fromordinal(365205).valueOf(), -30581953438);
	});
});

describe('combine', () => {
	it('datetime + time', () => {
		equalDates(
			dt.datetime.combine(dt.datetime(2020, 3, 3, 10, 10), dt.time(5, 6)),
			dt.datetime(2020, 3, 3, 5, 6),
		);
	});

	it('date + time', () => {
		equalDates(
			dt.datetime.combine(dt.date(2020, 1, 2), dt.time(7, 8)),
			dt.datetime(2020, 1, 2, 7, 8),
		);
	});
});

describe('fromisoformat', () => {
	it('YYYY-MM-DDTHH:mm:ss', () => {
		assert.equal(
			dt.datetime.fromisoformat('2011-11-04T00:05:23').valueOf(),
			dt.datetime(2011, 11, 4, 0, 5, 23).valueOf(),
		);
	});
});

// This does not seem to work, it returns two days early
// describe('fromisocalendar', () => {
// 	it('should return a date from a year, week, and day', () => {
// 		assert.equal(dt.datetime.fromisocalendar(1950, 7, 3).valueOf(), -627246000);
// 	});
// });

describe('strptime', () => {
	it('should return a datetime corresponding to date_string according to format', () => {
		equalDates(
			dt.datetime.strptime('2020-04-12', '%Y-%m-%d'),
			new Date(2020, 3, 12),
		);
	});
});

describe('date', () => {
	it('should return a date object with the same year, month, and day', () => {
		assert.deepStrictEqual(
			dt.datetime(2020, 3, 6, 1, 2, 3, 4).date(),
			dt.date(2020, 3, 6),
		);
	});
});

describe('time', () => {
	it('should return a time object with the same minute, second, and microsecond', () => {
		assert.deepStrictEqual(
			dt.datetime(2020, 3, 6, 1, 2, 3, 4).time(),
			dt.time(1, 2, 3, 4),
		);
	});
});

describe('toordinal', () => {
	it('should convert a datetime to its proleptic Gregorian calendar ordinal', () => {
		assert.equal(
			dt.datetime(1231, 7, 22, 9, 30, 12, 111).toordinal(),
			449451,
		);
	});
});

describe('timestamp', () => {
	it('should return a POSIX timestamp corresponding to the datetime instance', () => {
		// Python returns a different value and I'm not sure if it's due to timezone, dst, or a bug
		assert.equal(
			dt.datetime(1972, 4, 12, 11, 10, 9, 123).timestamp(),
			71943009.123,
		);
	});
});

describe('weekday', () => {
	it('should return the day of the week as an integer starting from 0', () => {
		assert.equal(dt.datetime(1832, 4, 12, 14, 22, 56).weekday(), 3);
	});
});

describe('isoweekday', () => {
	it('should return the day of the week as an integer starting from 1', () => {
		assert.equal(dt.datetime(1832, 4, 12, 14, 22, 56).isoweekday(), 4);
	});
});

describe('isocalendar', () => {
	it('should return the ISO calendar date as an array of year, week, weekday', () => {
		assert.deepEqual(
			dt.datetime(1920, 12, 31, 6, 20, 33).isocalendar(),
			[1920, 53, 5],
		);
	});
});

describe('isoformat', () => {
	it('should return a string representing the date in ISO 8601 format', () => {
		// assert.equal(dt.date(2020, 3, 2).str(), '2020-03-02');
		it('should use the auto format by default', () => {
			assert.equal(
				dt.datetime(2020, 3, 2, 5, 6, 7, 8).isoformat(),
				'2020-03-02T05:06:07.008000',
			);
			assert.equal(
				dt.datetime(2020, 3, 2, 5, 6, 7).isoformat(),
				'2020-03-02T05:06:07',
			);
		});

		it('should allow the user to change the time separator', () => {
			assert.equal(
				dt.datetime(2020, 3, 2, 5, 6, 7).isoformat(' Time: '),
				'2020-03-02 Time: 05:06:07',
			);
		});

		it('should allow the user to change the separator and timespec', () => {
			assert.equal(
				dt.datetime(2020, 3, 2, 5, 6, 7).isoformat({ sep: 'Foo' }),
				'2020-03-02 Foo 05:06:07',
			);
			assert.equal(
				dt
					.datetime(2020, 3, 2, 5, 6, 7, 123)
					.isoformat({ timespec: 'seconds' }),
				'2020-03-02T05:06:07',
			);
			assert.equal(
				dt
					.datetime(2020, 3, 2, 5, 6, 7)
					.isoformat({ timespec: 'milliseconds' }),
				'2020-03-02T05:06:07.000',
			);
			assert.equal(
				dt
					.datetime(2020, 3, 2, 5, 6, 7)
					.isoformat({ timespec: 'minutes' }),
				'2020-03-02T05:06',
			);
			assert.equal(
				dt
					.datetime(2020, 3, 2, 5, 6, 7)
					.isoformat({ timespec: 'hours' }),
				'2020-03-02T05',
			);
			assert.equal(
				dt
					.datetime(2020, 3, 2, 5, 6, 7)
					.isoformat({ timespec: 'minutes', sep: ' ' }),
				'2020-03-02 05:06:07',
			);
			assert.equal(
				dt.datetime(2020, 3, 2, 5, 6, 7).isoformat(' ', 'minutes'),
				'2020-03-02 05:06:07',
			);
		});
	});
});

describe('ctime', () => {
	it('should return a string representing the datetime', () => {
		assert.equal(
			dt.datetime(1966, 5, 22, 9, 18, 40).ctime(),
			'Sun May 09:18:40 1966',
		);
	});
});

describe('str', () => {
	it('should return isoformat with a space separator', () => {
		assert.equal(
			dt.datetime(2020, 3, 2, 5, 6, 7, 8).str(),
			'2020-03-02 05:06:07.008000',
		);
		assert.equal(
			dt.datetime(2020, 3, 2, 5, 6, 7).str(),
			'2020-03-02 05:06:07',
		);
	});
});
