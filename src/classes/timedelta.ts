import { toMillis, TimeDeltaInterval, TimeDeltaIntervals } from '../models';
import * as d3TimeFormat from 'd3-time-format';

export class PyTimedelta {
	days?: number;
	seconds?: number;
	milliseconds?: number;
	minutes?: number;
	hours?: number;
	weeks?: number;

	constructor(
		days?: number | Partial<Record<TimeDeltaInterval, number>>,
		seconds?: number,
		milliseconds?: number,
		minutes?: number,
		hours?: number,
		weeks?: number
	) {
		let args: Record<string, number | undefined> = {
			weeks,
			days: days as number,
			hours,
			minutes,
			seconds,
			milliseconds,
		};
		if (
			Object.keys(days as Partial<Record<TimeDeltaInterval, number>>)
				.length
		) {
			// we have a dict
			args = days as unknown as Record<string, number | undefined>;
		} else if (Math.abs(days as number) > 900) {
			// we have millis, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
			let totalMillis = (days as number) ?? 0;
			args = {};
			TimeDeltaIntervals.forEach((key) => {
				const multiplier = toMillis[key as TimeDeltaInterval];
				const val = Math.floor(totalMillis / multiplier);
				if (val) {
					args[key] = val;
					totalMillis -= val * multiplier;
				}
			});
		}

		TimeDeltaIntervals.forEach((key) => {
			this[key] = args[key] || 0;
		});
	}

	get __totalMillis(): number {
		let millis = TimeDeltaIntervals.map(
			(field) =>
				(this[field as keyof PyTimedelta] as number) *
				toMillis[field as TimeDeltaInterval]
		);
		return millis.reduce((total, current) => total + current);
	}

	str() {
		return d3TimeFormat.timeFormat('%H:%M:%S.%f')(
			new Date(this as unknown as number)
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
