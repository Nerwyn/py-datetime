import { TimeParams } from '../models';
import { base } from './base';
export declare class time extends base {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    constructor(hour?: number | TimeParams, minute?: number, second?: number, millisecond?: number);
    str(): string;
    valueOf(): number;
}
