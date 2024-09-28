import { DateParams } from '../models';
export declare class date {
    static readonly min: number;
    static readonly max: number;
    static readonly resolution: number;
    readonly year: number;
    readonly month: number;
    readonly day: number;
    constructor(year: number, month: number, day: number);
    replace(year?: number | DateParams, month?: number, day?: number): date;
    toordinal(): number;
    weekday(): number;
    isoweekday(): number;
    isocalendar(): number[];
    isoformat(): string;
    toString(): string;
    ctime(): string;
    strftime(format: string): string;
    valueOf(): number;
    get jsDate(): Date;
}
