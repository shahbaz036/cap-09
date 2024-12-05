"use client";

import { useState } from 'react';
import { useAtom } from 'jotai';
import { recurrenceSettingsAtom } from '@/lib/store/date-picker';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';

export function DateRangeSelector() {
  const [settings, setSettings] = useAtom(recurrenceSettingsAtom);
  const [hasEndDate, setHasEndDate] = useState(!!settings.dateRange.endDate);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label className="block mb-2 text-sm font-medium">Start Date</Label>
          <Calendar
            mode="single"
            selected={settings.dateRange.startDate}
            onSelect={(date) =>
              setSettings({
                ...settings,
                dateRange: { ...settings.dateRange, startDate: date || new Date() },
              })
            }
            className="rounded-md border bg-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={hasEndDate}
            onCheckedChange={(checked) => {
              setHasEndDate(checked);
              if (!checked) {
                setSettings({
                  ...settings,
                  dateRange: { startDate: settings.dateRange.startDate },
                });
              }
            }}
          />
          <Label className="text-sm font-medium">Set end date</Label>
        </div>

        {hasEndDate && (
          <div>
            <Label className="block mb-2 text-sm font-medium">End Date</Label>
            <Calendar
              mode="single"
              selected={settings.dateRange.endDate}
              onSelect={(date) =>
                setSettings({
                  ...settings,
                  dateRange: { ...settings.dateRange, endDate: date || undefined },
                })
              }
              className="rounded-md border bg-white"
              disabled={(date) =>
                date < settings.dateRange.startDate
              }
            />
          </div>
        )}
      </div>
    </Card>
  );
}