import * as d3 from 'd3-time-format';
import { TimedeltaIntervals, TimedeltaParams, toSeconds } from '../models';
import { isParams } from '../utils/utils';
import { base } from './base';

export class timedelta extends base {
	static readonly min: number = -86399999913600;
	static readonly max: number = 86399999999999.999;
	static readonly resolution: number = 0.001;

	readonly days: number = 0;
	readonly seconds: number = 0;
	readonly milliseconds: number = 0;

	constructor(
		days: number | TimedeltaParams = 0,
		seconds: number = 0,
		milliseconds: number = 0,
		minutes: number = 0,
		hours: number = 0,
		weeks: number = 0,
	) {
		super();
		let args: TimedeltaParams = {
			days: days as number,
			seconds,
			milliseconds,
			minutes,
			hours,
			weeks,
		};
		if (isParams(days)) {
			delete args.days;
			Object.assign(args, days);
		}

		// Get total seconds from args and then deconstruct into days, seconds, milliseconds
		// Python does days, seconds, microseconds but JS does not support microsecond precision for Date
		let totalSeconds = 0;
		TimedeltaIntervals.forEach((key) => {
			totalSeconds += (args[key] ?? 0) * toSeconds[key];
		});

		if (totalSeconds < timedelta.min || totalSeconds > timedelta.max) {
			throw RangeError(
				'value out of range, must have magnitude less than 999999999 days',
			);
		}

		if (totalSeconds.toString().includes('.')) {
			// To avoid floating point imprecision errors
			this.milliseconds = Math.floor(
				parseFloat(`0.${totalSeconds.toString().split('.')[1]}`) /
					toSeconds.milliseconds,
			);
			totalSeconds = Math.floor(totalSeconds);
		}
		this.days = Math.floor(totalSeconds / toSeconds.days);
		this.seconds = totalSeconds - this.days * toSeconds.days;
	}

	total_seconds() {
		return (
			this.days * toSeconds.days +
			this.seconds +
			this.milliseconds * toSeconds.milliseconds
		);
	}

	valueOf() {
		return this.total_seconds();
	}

	toString() {
		const dayString =
			this.days > 0
				? `${this.days} day${this.days > 1 ? 's,' : ','}`
				: '';
		const timeString = d3.utcFormat(
			`%-H:%M:%S${this.milliseconds ? '.%f' : ''}`,
		)(new Date(this.valueOf() * 1000));
		return `${dayString} ${timeString}`.trim();
	}
}
