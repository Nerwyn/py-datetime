export declare class PyTime {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    constructor(hour?: number, minute?: number, second?: number, millisecond?: number);
    str(): string;
    get __totalMillis(): number;
    valueOf(): number;
    toString(): string;
    toJSON(): string;
}
