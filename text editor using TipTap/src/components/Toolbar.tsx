import React from 'react';
import { Editor } from '@tiptap/react';
import {
  RiBold,
  RiItalic,
  RiH1,
  RiH2,
  RiListUnordered,
  RiListOrdered,
  RiCodeLine,
  RiDoubleQuotesL,
} from 'react-icons/ri';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const buttons = [
    {
      icon: <RiBold className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
      tooltip: 'Bold',
    },
    {
      icon: <RiItalic className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
      tooltip: 'Italic',
    },
    {
      icon: <RiH1 className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
      tooltip: 'Heading 1',
    },
    {
      icon: <RiH2 className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2',
    },
    {
      icon: <RiListUnordered className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
      tooltip: 'Bullet List',
    },
    {
      icon: <RiListOrdered className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
      tooltip: 'Ordered List',
    },
    {
      icon: <RiCodeLine className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
      tooltip: 'Code',
    },
    {
      icon: <RiDoubleQuotesL className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
      tooltip: 'Blockquote',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 border-b">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.action}
          className={`p-2 rounded-lg transition-colors ${
            button.isActive()
              ? 'bg-blue-100 text-blue-800'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          title={button.tooltip}
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;