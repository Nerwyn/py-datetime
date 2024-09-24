import { date, time } from '.';
import { DatetimeParams } from '../models';
export declare class datetime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    utc: boolean;
    constructor(year?: number | DatetimeParams | Date, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, utc?: boolean);
    replace(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): datetime;
    get jsDate(): Date;
    str(): string;
    valueOf(): number;
    toString(): string;
    toJSON(): string;
    strftime(format: string): string;
    time(): time;
    date(): date;
    weekday(): number;
    isoweekday(): number;
}
