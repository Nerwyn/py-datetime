import { PyDate, PyTime } from '.';
import { PyDatetimeDict } from '../models';
export declare class PyDatetime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    utc: boolean;
    constructor(year?: number | PyDatetimeDict | Date, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, utc?: boolean);
    replace(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): PyDatetime;
    get jsDate(): Date;
    str(): string;
    valueOf(): number;
    toString(): string;
    toJSON(): string;
    strftime(format: string): string;
    time(): PyTime;
    date(): PyDate;
    weekday(): number;
    isoweekday(): number;
}
