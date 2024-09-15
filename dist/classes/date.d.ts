export declare class PyDate {
    year: number;
    month: number;
    day: number;
    constructor(year?: number, month?: number, day?: number);
    get jsDate(): Date;
    str(): string;
    weekday(): number;
    isoweekday(): number;
    valueOf(): number;
    toString(): string;
    toJSON(): string;
}
