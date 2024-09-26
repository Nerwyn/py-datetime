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

	it('YYYYMMDD', () => {
		assert.equal(
			dt.date.fromisoformat('19920508').valueOf(),
			dt.date(1992, 5, 8).valueOf(),
		);
	});

	it('YYYY-W-w', () => {
		assert.equal(
			dt.date.fromisoformat('2002-W04-2').valueOf(),
			dt.date(2002, 1, 29).valueOf(),
		);
	});

	it('YYYYWw', () => {
		assert.equal(
			dt.date.fromisoformat('2016-W42-5').valueOf(),
			dt.date(2016, 10, 21).valueOf(),
		);
	});
});

describe('fromisocalendar', () => {
	it('should return a date from a year, week, and day', () => {
		assert.equal(dt.date.fromisocalendar(1950, 7, 3).valueOf(), -627246000);
	});
});

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

describe('str', () => {
	it('dt.date.str()', () => {
		assert.equal(dt.date(2020, 3, 2).str(), '2020-03-02');
	});
});
