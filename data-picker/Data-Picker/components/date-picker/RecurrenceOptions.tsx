"use client";

import { useAtom } from 'jotai';
import { recurrenceSettingsAtom } from '@/lib/store/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

const weekDays = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
];

export function RecurrenceOptions() {
  const [settings, setSettings] = useAtom(recurrenceSettingsAtom);

  const handleIntervalChange = (value: string) => {
    const interval = parseInt(value, 10);
    if (!isNaN(interval) && interval > 0) {
      setSettings({ ...settings, interval });
    }
  };

  const handleWeekDayToggle = (dayValue: number, checked: boolean) => {
    const newDays = checked
      ? [...settings.weeklyDays, dayValue].sort((a, b) => a - b)
      : settings.weeklyDays.filter((d) => d !== dayValue);
    
    // Ensure at least one day is selected
    if (newDays.length > 0) {
      setSettings({ ...settings, weeklyDays: newDays });
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Select
            value={settings.recurrenceType}
            onValueChange={(value: any) =>
              setSettings({
                ...settings,
                recurrenceType: value,
                // Reset interval to 1 when changing type
                interval: 1,
                // Initialize weeklyDays if switching to weekly
                weeklyDays: value === 'weekly' && settings.weeklyDays.length === 0 ? [1] : settings.weeklyDays,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Label htmlFor="interval">Every</Label>
            <Input
              id="interval"
              type="number"
              min={1}
              value={settings.interval}
              onChange={(e) => handleIntervalChange(e.target.value)}
              className="w-20"
            />
            <Label>
              {settings.recurrenceType === 'daily' && 'days'}
              {settings.recurrenceType === 'weekly' && 'weeks'}
              {settings.recurrenceType === 'monthly' && 'months'}
              {settings.recurrenceType === 'yearly' && 'years'}
            </Label>
          </div>
        </div>

        {settings.recurrenceType === 'weekly' && (
          <div className="space-y-2">
            <Label className="block text-sm font-medium">Repeat on</Label>
            <div className="flex flex-wrap gap-4">
              {weekDays.map(({ label, value }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${value}`}
                    checked={settings.weeklyDays.includes(value)}
                    onCheckedChange={(checked) => handleWeekDayToggle(value, checked === true)}
                    disabled={settings.weeklyDays.length === 1 && settings.weeklyDays.includes(value)}
                  />
                  <Label
                    htmlFor={`day-${value}`}
                    className="text-sm cursor-pointer select-none"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}