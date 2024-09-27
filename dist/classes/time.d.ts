import { TimeParams } from '../models';
import { base } from './base';
export declare class time extends base {
    static readonly min: number;
    static readonly max: number;
    static readonly resolution: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    constructor(hour?: number | TimeParams, minute?: number, second?: number, millisecond?: number);
    str(): string;
    valueOf(): number;
}
