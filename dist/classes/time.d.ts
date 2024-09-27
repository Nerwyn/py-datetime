import { TimeParams, TimeSpec } from '../models';
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
    replace(hour?: number | TimeParams, minute?: number, second?: number, millisecond?: number): time;
    isoformat(timespec?: TimeSpec): string;
    str(): string;
    strftime(format: string): string;
    valueOf(): number;
    get jsDate(): Date;
}
