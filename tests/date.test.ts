import assert from 'assert';
import dt from '../src/index.ts';

describe('str', () => {
	it('dt.date.str()', () => {
		assert.equal(dt.date(2020, 3, 2).str(), '2020-03-02');
	});
});
