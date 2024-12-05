import { atom } from 'jotai';
import { RecurrenceSettings, RecurrenceType } from '../types/date-picker';
import { addInterval, isDateInRange } from '../utils/date';

const defaultSettings: RecurrenceSettings = {
  recurrenceType: 'daily',
  interval: 1,
  weeklyDays: [1], // Monday by default
  dateRange: {
    startDate: new Date(),
  },
};

export const recurrenceSettingsAtom = atom<RecurrenceSettings>(defaultSettings);

export const previewDatesAtom = atom((get) => {
  const settings = get(recurrenceSettingsAtom);
  const dates: Date[] = [];
  const { startDate, endDate } = settings.dateRange;
  const maxPreviewDates = 10;

  let currentDate = new Date(startDate);
  
  while (dates.length < maxPreviewDates && (!endDate || currentDate <= endDate)) {
    switch (settings.recurrenceType) {
      case 'daily':
        dates.push(new Date(currentDate));
        currentDate = addInterval(currentDate, 'daily', settings.interval);
        break;
        
      case 'weekly':
        const currentDay = currentDate.getDay();
        if (settings.weeklyDays.includes(currentDay)) {
          dates.push(new Date(currentDate));
        }
        // Move to next day, and if we've gone through all days of the week,
        // jump forward by the interval
        if (currentDay === 6) {
          currentDate = addInterval(currentDate, 'weekly', settings.interval - 1);
        }
        currentDate.setDate(currentDate.getDate() + 1);
        break;
        
      case 'monthly':
        // Get the day of the month from the start date
        const targetDay = startDate.getDate();
        if (currentDate.getDate() === targetDay) {
          dates.push(new Date(currentDate));
          currentDate = addInterval(currentDate, 'monthly', settings.interval);
        } else {
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
        
      case 'yearly':
        // Get the month and day from the start date
        const targetMonth = startDate.getMonth();
        const targetDayOfYear = startDate.getDate();
        if (
          currentDate.getMonth() === targetMonth &&
          currentDate.getDate() === targetDayOfYear
        ) {
          dates.push(new Date(currentDate));
          currentDate = addInterval(currentDate, 'yearly', settings.interval);
        } else {
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
    }

    // Safety check to prevent infinite loops
    if (dates.length === 0 && currentDate > new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 365)) {
      break;
    }
  }

  return dates;
});