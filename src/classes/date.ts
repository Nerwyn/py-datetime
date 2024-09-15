import * as d3TimeFormat from 'd3-time-format';

export class PyDate {
	year: number = 0;
	month: number = 1;
	day: number = 1;

	constructor(year?: number, month?: number, day?: number) {
		Object.assign(this, { year, month, day });
	}

	get jsDate() {
		return new Date(this.year!, this.month! - 1, this.day);
	}

	str() {
		return d3TimeFormat.timeFormat('%Y-%m-%d')(this.jsDate);
	}

	weekday() {
		// javascript week starts on sunday, while python one starts on monday
		return (this.jsDate.getDay() + 6) % 7;
	}

	isoweekday() {
		return this.weekday() + 1;
	}

	valueOf() {
		return this.jsDate.getTime() / 1000;
	}

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}
}
