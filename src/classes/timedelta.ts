import * as d3TimeFormat from 'd3-time-format';
import {
	PyTimedeltaDict,
	TimedeltaInterval,
	TimedeltaIntervals,
	toMillis,
} from '../models';

export class PyTimedelta {
	days?: number;
	seconds?: number;
	milliseconds?: number;
	minutes?: number;
	hours?: number;
	weeks?: number;

	constructor(
		days?: number | PyTimedeltaDict,
		seconds?: number,
		milliseconds?: number,
		minutes?: number,
		hours?: number,
		weeks?: number,
	) {
		let args: PyTimedeltaDict = {
			days: days as number,
			seconds,
			milliseconds,
			minutes,
			hours,
			weeks,
		};
		if (days != null && typeof days != 'number') {
			// we have a dict
			args = days as PyTimedeltaDict;
		} else if (Math.abs(days as number) > 900) {
			// we have millis, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
			let totalMillis = (days as number) ?? 0;
			args = {};
			TimedeltaIntervals.forEach((key) => {
				const multiplier = toMillis[key as TimedeltaInterval];
				const val = Math.floor(totalMillis / multiplier);
				if (val) {
					args[key] = val;
					totalMillis -= val * multiplier;
				}
			});
		}

		TimedeltaIntervals.forEach((key) => {
			this[key] = args[key] || 0;
		});
	}

	get __totalMillis(): number {
		let millis = TimedeltaIntervals.map(
			(field) =>
				(this[field as keyof PyTimedelta] as number) *
				toMillis[field as TimedeltaInterval],
		);
		return millis.reduce((total, current) => total + current);
	}

	str() {
		return d3TimeFormat.timeFormat('%H:%M:%S.%f')(
			new Date(this as unknown as number),
		);
	}

	valueOf() {
		return this.__totalMillis;
	}

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}

	totalSeconds() {
		return this.__totalMillis / 1000;
	}
}
