import assert from 'assert';
import dt from '../src/index.ts';

describe('str', () => {
	it('dt.time.str()', () => {
		assert.equal(dt.time(5, 6, 7, 8).str(), '05:06:07.008000');
		assert.equal(dt.time(5, 6, 7).str(), '05:06:07');
	});
});
