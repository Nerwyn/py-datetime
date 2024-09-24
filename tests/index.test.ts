import assert from 'assert';
import { datetime } from '../src/classes';
import dt from '../src/index.ts';

function equalDates(...args: (Date | datetime)[]) {
	const toTest: number[] = [];
	args.forEach((arg) => {
		if (arg instanceof Date) {
			toTest.push(arg.getTime());
		} else {
			toTest.push(arg.jsDate.getTime());
		}
	});

	assert.deepStrictEqual(toTest[0], toTest[1]);
}

describe('dt.datetime', function () {
	describe('construction', function () {
		it('via dt.datetime.now()', function () {
			// to test if .now() returns now we just check that they are within 0.1 sec of each other
			let dtNow = dt.datetime.now().jsDate;
			assert.ok(dtNow.getTime() - new Date().getTime() < 100);
		});

		it('via strptime()', function () {
			equalDates(
				dt.datetime.strptime('2020-04-12', '%Y-%m-%d'),
				new Date(2020, 3, 12),
			);
		});

		it('via dt.datetime(year, month, day)', function () {
			equalDates(dt.datetime(2020, 4, 12), new Date(2020, 3, 12));
		});

		it('via dt.datetime(new Date())', function () {
			let date = new Date();
			equalDates(dt.datetime(date), date);
		});

		it('via dt.datetime(seconds)', function () {
			let date = new Date();
			equalDates(dt.datetime(date.getTime() / 1000), date);
		});
	});
	describe('combine', function () {
		it('datetime + time', function () {
			equalDates(
				dt.datetime.combine(
					dt.datetime(2020, 3, 3, 10, 10),
					dt.time(5, 6),
				),
				dt.datetime(2020, 3, 3, 5, 6),
			);
		});

		it('date + time', function () {
			equalDates(
				dt.datetime.combine(dt.date(2020, 1, 2), dt.time(7, 8)),
				dt.datetime(2020, 1, 2, 7, 8),
			);
		});
	});

	describe('combine', function () {
		it('datetime.time', function () {
			assert.deepStrictEqual(
				dt.datetime(2020, 3, 6, 1, 2, 3, 4).time(),
				dt.time(1, 2, 3, 4),
			);
		});

		it('datetime.date', function () {
			assert.deepStrictEqual(
				dt.datetime(2020, 3, 6, 1, 2, 3, 4).date(),
				dt.date(2020, 3, 6),
			);
		});
	});
});

describe('dt.timedelta', function () {
	it('dt.datetime - dt.timedelta(days) = dt.datetime', function () {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12).valueOf() - dt.timedelta(3).valueOf(),
			),
			dt.datetime(2020, 3, 9),
		);
	});

	it('dt.datetime - dt.timedelta(days, seconds, milliseconds, minutes, hours)', function () {
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

	it('dt.datetime - dt.timedelta({seconds: 10})', function () {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12, 10, 10, 10, 10).valueOf() -
					dt.timedelta({ seconds: 10 }).valueOf(),
			),
			dt.datetime(2020, 3, 12, 10, 10, 0, 10),
		);
	});

	it('dt.datetime - dt.timedelta({hours: 2.4})', function () {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12, 10, 10, 10, 10).valueOf() -
					dt.timedelta({ hours: 2.4 }).valueOf(),
			),
			dt.datetime(2020, 3, 12, 7, 46, 10, 10),
		);
	});

	it('dt.datetime - dt.timedelta({seconds: 2.4})', function () {
		equalDates(
			dt.datetime(
				dt.datetime(2020, 3, 12, 10, 10, 10, 10).valueOf() -
					dt.timedelta({ seconds: 2.4 }).valueOf(),
			),
			dt.datetime(2020, 3, 12, 10, 10, 7, 610),
		);
	});

	it('dt.datetime - dt.timedelta({weeks: 2})', function () {
		// Avoid testing time differences that cross over daylight savings start/end to save American developers a lot of headache
		equalDates(
			dt.datetime(
				dt.datetime(2020, 4, 15).valueOf() -
					dt.timedelta({ weeks: 2 }).valueOf(),
			),
			dt.datetime(2020, 4, 1),
		);
	});

	it('dt.datetime - dt.date', function () {
		assert.equal(
			dt.datetime(2020, 1, 11, 12).valueOf() -
				dt.date(2020, 1, 1).valueOf(),
			dt.timedelta({ days: 10, hours: 12 }),
		);
	});

	it('dt.timedelta float input', function () {
		const td = dt.timedelta({ seconds: 2.4 });
		assert.equal(td.seconds, 2);
		assert.equal(td.milliseconds, 400);
	});
});

describe('str', function () {
	it('dt.datetime.str()', function () {
		assert.equal(
			dt.datetime(2020, 3, 2, 5, 6, 7, 8).str(),
			'2020-03-02 05:06:07.008000',
		);
		assert.equal(
			dt.datetime(2020, 3, 2, 5, 6, 7).str(),
			'2020-03-02 05:06:07',
		);
	});

	it('dt.date.str()', function () {
		assert.equal(dt.date(2020, 3, 2).str(), '2020-03-02');
	});

	it('dt.time.str()', function () {
		assert.equal(dt.time(5, 6, 7, 8).str(), '05:06:07.008000');
		assert.equal(dt.time(5, 6, 7).str(), '05:06:07');
	});

	it('dt.timedelta().str()', function () {
		assert.equal(dt.timedelta({ weeks: 2 }).str(), '14 days, 0:00:00');
		assert.equal(dt.timedelta({ hours: 25 }).str(), '1 day, 1:00:00');
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
		assert.equal(dt.timedelta({ seconds: 2.4 }).str(), '0:00:02.400000');
	});
});
