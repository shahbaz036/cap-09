import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { VariableExtension } from '../extensions/VariableExtension';
import { VARIABLES } from '../types/variables';
import Toolbar from './Toolbar';

const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      VariableExtension.configure({
        variables: VARIABLES,
      }),
    ],
    content: '<p>Start typing here... Use {{ to insert variables</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none p-4 min-h-[300px]',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <Toolbar editor={editor} />
      <div className="border-t">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;