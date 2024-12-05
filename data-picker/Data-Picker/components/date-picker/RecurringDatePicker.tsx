"use client";

import { Card } from '@/components/ui/card';
import { RecurrenceOptions } from './RecurrenceOptions';
import { DateRangeSelector } from './DateRangeSelector';
import { PreviewCalendar } from './PreviewCalendar';

export function RecurringDatePicker() {
  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="space-y-6">
        <RecurrenceOptions />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DateRangeSelector />
          <PreviewCalendar />
        </div>
      </div>
    </Card>
  );
}