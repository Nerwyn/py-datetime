import { date, timedelta } from '../classes';
export declare const min: date;
export declare const max: date;
export declare const resolution: timedelta;
export declare function today(): date;
export declare function fromtimestamp(timestamp: number): date;
export declare function fromordinal(ordinal: number): date;
export declare function fromisoformat(dateString: string): date;
export declare function fromisocalendar(year: number, week: number, day: number): date;
