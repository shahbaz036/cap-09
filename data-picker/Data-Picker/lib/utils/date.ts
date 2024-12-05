import { RecurrenceType } from '../types/date-picker';

export function addInterval(date: Date, type: RecurrenceType, interval: number): Date {
  const newDate = new Date(date);
  
  switch (type) {
    case 'daily':
      newDate.setDate(newDate.getDate() + interval);
      break;
    case 'weekly':
      newDate.setDate(newDate.getDate() + (interval * 7));
      break;
    case 'monthly':
      newDate.setMonth(newDate.getMonth() + interval);
      break;
    case 'yearly':
      newDate.setFullYear(newDate.getFullYear() + interval);
      break;
  }
  
  return newDate;
}

export function isDateInRange(date: Date, startDate: Date, endDate?: Date): boolean {
  return endDate ? date >= startDate && date <= endDate : date >= startDate;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}