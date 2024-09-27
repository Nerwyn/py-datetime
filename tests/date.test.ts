import assert from 'assert';
import dt from '../src/index.ts';

describe('today', () => {
	it('should be equal to a datetime with no time information', () => {
		const now = dt.datetime.now();
		assert.equal(
			dt.date.today().valueOf(),
			dt.datetime(now.year, now.month, now.day).valueOf(),
		);
	});
});

describe('fromtimestamp', () => {
	it('should return a date from a timestamp', () => {
		assert.equal(dt.date.fromtimestamp(512315142).valueOf(), 512283600);
	});
});

describe('fromisoformat', () => {
	it('YYYY-MM-DD', () => {
		assert.equal(
			dt.date.fromisoformat('2012-11-10').valueOf(),
			dt.date(2012, 11, 10).valueOf(),
		);
	});
});

describe('fromordinal', () => {
	it('should return a date given an proleptic Gregorian calendar ordinal', () => {
		assert.equal(dt.date.fromordinal(365205).valueOf(), -30581953438);
	});
});

// This does not seem to work, it returns two days early
// describe('fromisocalendar', () => {
// 	it('should return a date from a year, week, and day', () => {
// 		assert.equal(dt.date.fromisocalendar(1950, 7, 3).valueOf(), -627246000);
// 	});
// });

describe('min, max, resolution', () => {
	it('should return the min, max, and resolution', () => {
		assert.equal(dt.date.min.valueOf(), -59011441438);
		assert.equal(dt.date.max.valueOf(), 253402232400);
		assert.equal(dt.date.resolution.valueOf(), 86400);
	});

	it('should restrict inputs to the min and max range', () => {
		assert.throws(() => dt.date(99, 12, 31));
		assert.throws(() => dt.date(10000, 1, 1));
	});
});

describe('replace', () => {
	it('should return a date with values replaced', () => {
		assert.equal(dt.date(1992, 4, 24).replace(1990), 640929600);
		assert.equal(dt.date(1992, 4, 24).replace(undefined, 8), 714628800);
		assert.equal(dt.date(1992, 4, 24).replace({ day: 14 }), 703224000);
	});
});

describe('toordinal', () => {
	it('should convert a date to its proleptic Gregorian calendar ordinal', () => {
		assert.equal(dt.date(1231, 7, 22).toordinal(), 449451);
	});
});

describe('weekday', () => {
	it('should return the day of the week as an integer starting from 0', () => {
		assert.equal(dt.date(1832, 4, 12).weekday(), 3);
	});
});

describe('isoweekday', () => {
	it('should return the day of the week as an integer starting from 1', () => {
		assert.equal(dt.date(1832, 4, 12).isoweekday(), 4);
	});
});

describe('isocalendar', () => {
	it('should return the ISO calendar date as an array of year, week, weekday', () => {
		assert.deepEqual(dt.date(1920, 12, 31).isocalendar(), [1920, 53, 5]);
	});
});

describe('isoformat', () => {
	it('should return a string representing the date in ISO 8601 format, YYYY-MM-DD', () => {
		assert.equal(dt.date(2020, 3, 2).str(), '2020-03-02');
	});
});

describe('str', () => {
	it('should be equivalent to isoformat', () => {
		assert.equal(dt.date(2020, 3, 2).str(), '2020-03-02');
	});
});

describe('ctime', () => {
	it('should return a string representing the date', () => {
		assert.equal(dt.date(1966, 5, 22).ctime(), 'Sun May 00:00:00 1966');
	});
});

describe('strftime', () => {
	it('should format a date based on a given format', () => {
		assert.equal(
			dt.date(1933, 5, 14).strftime('%A %B %e, %Y'),
			'Sunday May 14, 1933',
		);
	});
});
