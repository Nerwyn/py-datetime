import { TimedeltaParams } from '../models';
export declare class timedelta {
    static readonly min: number;
    static readonly max: number;
    static readonly resolution: number;
    readonly days: number;
    readonly seconds: number;
    readonly milliseconds: number;
    constructor(days?: number | TimedeltaParams, seconds?: number, milliseconds?: number, minutes?: number, hours?: number, weeks?: number);
    total_seconds(): number;
    valueOf(): number;
    toString(): string;
}
