import { useAtom } from 'jotai';
import { recurrenceSettingsAtom } from '@/lib/store/date-picker';
import { RecurrenceSettings } from '@/lib/types/date-picker';

export function useDatePickerState() {
  const [settings, setSettings] = useAtom(recurrenceSettingsAtom);

  const updateSettings = (updates: Partial<RecurrenceSettings>) => {
    setSettings(current => ({
      ...current,
      ...updates,
    }));
  };

  const updateDateRange = (startDate?: Date, endDate?: Date) => {
    setSettings(current => ({
      ...current,
      dateRange: {
        ...current.dateRange,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    }));
  };

  return {
    settings,
    updateSettings,
    updateDateRange,
  };
}