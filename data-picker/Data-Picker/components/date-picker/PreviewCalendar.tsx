"use client";

import { useAtomValue } from 'jotai';
import { format } from 'date-fns';
import { previewDatesAtom } from '@/lib/store/date-picker';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PreviewCalendar() {
  const previewDates = useAtomValue(previewDatesAtom);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <Label className="block text-sm font-medium">Preview</Label>
        <Calendar
          mode="multiple"
          selected={previewDates}
          className="rounded-md border bg-white"
          disabled
        />
        <ScrollArea className="h-32 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Upcoming Dates</h4>
            {previewDates.map((date, index) => (
              <div key={date.getTime()} className="text-sm">
                {index + 1}. {format(date, 'PPP')}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}