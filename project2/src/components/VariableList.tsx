import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Variable } from '../types/variables';

interface VariableListProps {
  items: Variable[];
  command: (item: Variable) => void;
}

export default forwardRef((props: VariableListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }

      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  return (
    <div className="variable-list bg-white rounded-lg shadow-lg border border-gray-200 p-2 max-h-[300px] overflow-y-auto">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            key={item.id}
            onClick={() => selectItem(index)}
          >
            <span className="font-medium">{item.label}</span>
            <span className="text-gray-500 text-sm ml-2">{item.value}</span>
          </button>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No variables found</div>
      )}
    </div>
  );
});