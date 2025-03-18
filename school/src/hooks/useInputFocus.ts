import { useCallback, useRef } from 'react';

export function useInputFocus() {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  ) => {
    onChange(e);
  }, []);

  return {
    inputRef,
    handleChange
  };
}