import { base } from './base';
export declare class date extends base {
    year: number;
    month: number;
    day: number;
    constructor(year?: number, month?: number, day?: number);
    get jsDate(): Date;
    str(): string;
    weekday(): number;
    isoweekday(): number;
    valueOf(): number;
}
