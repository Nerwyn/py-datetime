import { TimeParams, TimeSpec } from '../models';
export declare class time {
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
    valueOf(): number;
    toString(): string;
    strftime(format: string): string;
    get jsDate(): Date;
}
