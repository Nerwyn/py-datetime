import { base } from './base';
export declare class date extends base {
    static readonly MINYEAR = 1;
    static readonly MAXYEAR = 9999;
    year: number;
    month: number;
    day: number;
    constructor(year: number, month: number, day: number);
    get jsDate(): Date;
    str(): string;
    weekday(): number;
    isoweekday(): number;
    valueOf(): number;
}
