export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type RecurrenceInterval = {
  type: RecurrenceType;
  interval: number;
  weeklyDays?: number[];
  monthlyDay?: number;
  monthlyWeekDay?: {
    week: number;
    day: number;
  };
};

export type DateRange = {
  startDate: Date;
  endDate?: Date;
};

export type RecurrenceSettings = {
  recurrenceType: RecurrenceType;
  interval: number;
  weeklyDays: number[];
  monthlyDay?: number;
  monthlyWeekDay?: {
    week: number;
    day: number;
  };
  dateRange: DateRange;
};