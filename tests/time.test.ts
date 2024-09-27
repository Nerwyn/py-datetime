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

describe('str', () => {
	it('dt.time.str()', () => {
		assert.equal(dt.time(5, 6, 7, 8).str(), '05:06:07.008000');
		assert.equal(dt.time(5, 6, 7).str(), '05:06:07');
	});
});
