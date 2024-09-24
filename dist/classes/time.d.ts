import { TimeParams } from '../models';
export declare class time {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    constructor(hour?: number | TimeParams, minute?: number, second?: number, millisecond?: number);
    str(): string;
    valueOf(): number;
    toString(): string;
    toJSON(): string;
}
