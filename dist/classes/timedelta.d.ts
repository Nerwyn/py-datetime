import { TimedeltaParams } from '../models';
import { base } from './base';
export declare class timedelta extends base {
    static readonly min: number;
    static readonly max: number;
    static readonly resolution: number;
    readonly days: number;
    readonly seconds: number;
    readonly milliseconds: number;
    constructor(days?: number | TimedeltaParams, seconds?: number, milliseconds?: number, minutes?: number, hours?: number, weeks?: number);
    str(): string;
    abs(): number;
    repr(): string;
    valueOf(): number;
    total_seconds(): number;
}
