import assert from 'assert';
import { datetime } from '../src/classes';

export function equalDates(...args: (Date | datetime)[]) {
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
