export const DateIntervals = ['year', 'month', 'day'] as const;

export type DateInterval = (typeof DateIntervals)[number];

export type DateParams = Partial<Record<DateInterval, number>>;
