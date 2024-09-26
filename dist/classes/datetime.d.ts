import { date, time } from '.';
import { DatetimeParams } from '../models';
import { base } from './base';
export declare class datetime extends base {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    utc: boolean;
    constructor(year?: number | DatetimeParams | Date, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, utc?: boolean);
    replace(year?: number | DatetimeParams, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): datetime;
    get jsDate(): Date;
    str(): string;
    valueOf(): number;
    strftime(format: string): string;
    time(): time;
    date(): date;
    weekday(): number;
    isoweekday(): number;
    timestamp(): number;
}
