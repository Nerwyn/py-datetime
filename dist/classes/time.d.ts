import { PyTimeDict } from '../models';
export declare class PyTime {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    constructor(hour?: number | PyTimeDict, minute?: number, second?: number, millisecond?: number);
    str(): string;
    valueOf(): number;
    toString(): string;
    toJSON(): string;
}
