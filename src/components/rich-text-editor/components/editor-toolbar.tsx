import React from 'react';
import BlockControls from '@/components/rich-text-editor/components/block-controls.tsx';
import HeadingControls from '@/components/rich-text-editor/components/heading-controls.tsx';
import TextFormatControls from '@/components/rich-text-editor/components/text-format-controls.tsx';
import UtilityControls from '@/components/rich-text-editor/components/utility-controls.tsx'
import { Editor } from '@tiptap/react'
import TableControls from '@/components/rich-text-editor/components/table-controls.tsx'

interface EditorToolbarProps {
  editor: Editor | null
  onImageUpload: (file: File, editor: Editor) => void | Promise<void>
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, onImageUpload }) => {
  if (!editor) return null;

  return (
    <div className="border-b border-gray-200 p-2">
      <div className="flex flex-wrap gap-4 items-center">
        <TextFormatControls editor={editor} />
        <div className="w-px h-6 bg-gray-300" />
        <HeadingControls editor={editor} />
        <div className="w-px h-6 bg-gray-300" />
        <BlockControls editor={editor} />
        <div className="w-px h-6 bg-gray-300" />
        <TableControls editor={editor} />
        <div className="w-px h-6 bg-gray-300" />
        <UtilityControls editor={editor} onImageUpload={onImageUpload} />
      </div>
    </div>
  );
};

export default EditorToolbar;