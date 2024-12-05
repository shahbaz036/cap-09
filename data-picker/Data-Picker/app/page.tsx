import { RecurringDatePicker } from '@/components/date-picker/RecurringDatePicker';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Recurring Date Picker
        </h1>
        <RecurringDatePicker />
      </div>
    </div>
  );
}