import { render, screen, fireEvent } from '@testing-library/react';
import { RecurringDatePicker } from '@/components/date-picker/RecurringDatePicker';

describe('RecurringDatePicker', () => {
  it('renders all main components', () => {
    render(<RecurringDatePicker />);
    
    expect(screen.getByText('Select frequency')).toBeInTheDocument();
    expect(screen.getByText('Every')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('handles recurrence type change', () => {
    render(<RecurringDatePicker />);
    
    const select = screen.getByText('Select frequency');
    fireEvent.click(select);
    fireEvent.click(screen.getByText('Weekly'));
    
    expect(screen.getByText('weeks')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  it('shows end date calendar when enabled', () => {
    render(<RecurringDatePicker />);
    
    const switch = screen.getByRole('switch');
    fireEvent.click(switch);
    
    expect(screen.getByText('End Date')).toBeInTheDocument();
  });
});