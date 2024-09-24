import assert from 'assert';
import dt from '../src/index.ts';

describe('str', () => {
	it('dt.date.str()', () => {
		assert.equal(dt.date(2020, 3, 2).str(), '2020-03-02');
	});
});

describe('today', () => {
	// TODO
});

describe('fromtimestamp', () => {
	// TODO
});

describe('fromordinal', () => {
	// TODO
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
