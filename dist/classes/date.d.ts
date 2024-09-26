import { base } from './base';
export declare class date extends base {
    static readonly min = -2177434800;
    static readonly max = 253402232400;
    static readonly resolution = 86400;
    readonly year: number;
    readonly month: number;
    readonly day: number;
    constructor(year: number, month: number, day: number);
    get jsDate(): Date;
    str(): string;
    weekday(): number;
    isoweekday(): number;
    valueOf(): number;
}
