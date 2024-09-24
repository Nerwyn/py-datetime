import assert from 'assert';
import { equalDates } from '.';
import dt from '../src/index.ts';

describe('construction', () => {
	it('via dt.datetime.now()', () => {
		// to test if .now() returns now we just check that they are within 0.1 sec of each other
		let dtNow = dt.datetime.now().jsDate;
		assert.ok(dtNow.getTime() - new Date().getTime() < 100);
	});

	it('via strptime()', () => {
		equalDates(
			dt.datetime.strptime('2020-04-12', '%Y-%m-%d'),
			new Date(2020, 3, 12),
		);
	});

	it('via dt.datetime(year, month, day)', () => {
		equalDates(dt.datetime(2020, 4, 12), new Date(2020, 3, 12));
	});

	it('via dt.datetime(new Date())', () => {
		let date = new Date();
		equalDates(dt.datetime(date), date);
	});

	it('via dt.datetime(seconds)', () => {
		let date = new Date();
		equalDates(dt.datetime(date.getTime() / 1000), date);
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

describe('combine', () => {
	it('datetime.time', () => {
		assert.deepStrictEqual(
			dt.datetime(2020, 3, 6, 1, 2, 3, 4).time(),
			dt.time(1, 2, 3, 4),
		);
	});

	it('datetime.date', () => {
		assert.deepStrictEqual(
			dt.datetime(2020, 3, 6, 1, 2, 3, 4).date(),
			dt.date(2020, 3, 6),
		);
	});
});

describe('str', () => {
	it('dt.datetime.str()', () => {
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
