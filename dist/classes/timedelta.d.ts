import { PyTimedeltaDict } from '../models';
export declare class PyTimedelta {
    days: number;
    seconds: number;
    milliseconds: number;
    minutes: number;
    hours: number;
    weeks: number;
    constructor(days?: number | PyTimedeltaDict, seconds?: number, milliseconds?: number, minutes?: number, hours?: number, weeks?: number);
    str(): string;
    valueOf(): number;
    totalSeconds(): number;
    toString(): string;
    toJSON(): string;
}
