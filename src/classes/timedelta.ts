import * as d3TimeFormat from 'd3-time-format';
import {
	PyTimedeltaDict,
	TimedeltaInterval,
	TimedeltaIntervals,
	toSeconds,
} from '../models';

export class PyTimedelta {
	days: number = 0;
	seconds: number = 0;
	milliseconds: number = 0;
	minutes: number = 0;
	hours: number = 0;
	weeks: number = 0;

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
			// we have seconds, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
			let totalSeconds = (days as number) ?? 0;
			args = {};
			TimedeltaIntervals.forEach((key) => {
				const multiplier = toSeconds[key as TimedeltaInterval];
				const value = Math.floor(totalSeconds / multiplier);
				args[key] = value;
				totalSeconds -= value * multiplier;
			});
		}

		TimedeltaIntervals.forEach((key) => {
			this[key] = args[key] || 0;
		});
	}

	str() {
		const days = Math.floor(this.valueOf() / toSeconds.days);
		const dayString = days > 0 ? `${days} day${days > 1 ? 's,' : ','}` : '';
		const timeString = d3TimeFormat.utcFormat('%-H:%M:%S.%f')(
			new Date(this.valueOf() * 1000),
		);
		return `${dayString} ${timeString}`.trim();
	}

	valueOf() {
		let seconds = TimedeltaIntervals.map(
			(field) =>
				(this[field as keyof PyTimedelta] as number) *
				toSeconds[field as TimedeltaInterval],
		);
		return seconds.reduce((total, current) => total + current);
	}

	toString() {
		return this.str();
	}

	toJSON() {
		return this.str();
	}
}
