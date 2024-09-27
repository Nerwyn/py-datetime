import assert from 'assert';
import dt from '../src/index.ts';

describe('constructor', () => {
	it('should only allow integers', () => {
		assert.throws(() => dt.time(12, 24, 36, 123.1));
		assert.throws(() => dt.time(12, 24, 36.1, 123));
		assert.throws(() => dt.time(12, 24.1, 36, 123));
		assert.throws(() => dt.time(12.1, 24, 36, 123));
	});

	it('should restrict inputs to ranges', () => {
		assert.throws(() => dt.time(-1, 24, 36, 123));
		assert.throws(() => dt.time(24, 24, 36, 123));
		assert.throws(() => dt.time(12, -1, 36, 123));
		assert.throws(() => dt.time(12, 61, 36, 123));
		assert.throws(() => dt.time(12, 24, -1, 123));
		assert.throws(() => dt.time(12, 24, 61, 123));
		assert.throws(() => dt.time(12, 24, 36, -1));
		assert.throws(() => dt.time(12, 24, 36, 1000));
	});
});

describe('fromisoformat', () => {
	it('HH:mm:ss', () => {
		assert.equal(
			dt.time.fromisoformat('11:10:09').valueOf(),
			dt.time(11, 10, 9).valueOf(),
		);
	});

	it('HH:mm:ss.fff', () => {
		assert.equal(
			dt.time.fromisoformat('11:10:09.123').valueOf(),
			dt.time(11, 10, 9, 123).valueOf(),
		);
	});
});

describe('min, max, and resolution', () => {
	it('should return the min, max, and resolution', () => {
		assert.equal(dt.time.min.valueOf(), 0);
		assert.equal(dt.time.max.valueOf(), 86399.999);
		assert.equal(dt.time.resolution.valueOf(), 0.001);
	});

	it('should restrict inputs to the min and max range', () => {
		assert.throws(() => dt.time(-1, 0, 0));
		assert.throws(() => dt.time(24, 60, 60));
	});
});

describe('replace', () => {
	it('should return a time with values replaced', () => {
		assert.equal(dt.time(12, 24, 36).replace(8), 30276);
		assert.equal(dt.time(12, 24, 36).replace(undefined, 8), 43716);
		assert.equal(dt.time(12, 24, 36).replace({ second: 14 }), 44654);
	});
});

describe('isoformat', () => {
	it('should return a string representing the date in ISO 8601 format', () => {
		it('should use the auto format by default', () => {
			assert.equal(dt.time(5, 6, 7, 8).isoformat(), '05:06:07.008000');
			assert.equal(dt.time(5, 6, 7).isoformat(), '05:06:07');
		});

		it('should allow the user to change the timespec', () => {
			assert.equal(
				dt.time(5, 6, 7, 123).isoformat('seconds'),
				'05:06:07',
			);
			assert.equal(
				dt.time(5, 6, 7).isoformat('milliseconds'),
				'05:06:07.000',
			);
			assert.equal(dt.time(5, 6, 7).isoformat('minutes'), '05:06');
			assert.equal(dt.time(5, 6, 7).isoformat('hours'), '05');
		});
	});
});

describe('str', () => {
	it('should be equivalent to isoformat', () => {
		assert.equal(dt.time(5, 6, 7, 8).str(), '05:06:07.008000');
		assert.equal(dt.time(5, 6, 7).str(), '05:06:07');
	});
});
