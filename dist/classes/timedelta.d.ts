import { TimedeltaParams } from '../models';
export declare class timedelta {
    days: number;
    seconds: number;
    milliseconds: number;
    constructor(days?: number | TimedeltaParams, seconds?: number, milliseconds?: number, minutes?: number, hours?: number, weeks?: number);
    str(): string;
    valueOf(): number;
    totalSeconds(): number;
    toString(): string;
    toJSON(): string;
}
