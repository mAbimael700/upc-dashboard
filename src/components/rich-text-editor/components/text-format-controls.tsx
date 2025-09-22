import { Editor } from '@tiptap/react'
import { Bold, Italic, Underline } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle.tsx'
import React from 'react'

interface Props {
  editor: Editor | null
}

const TextFormatControls : React.FC<Props> = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div className="flex gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Negrita"
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Cursiva"
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Subrayado"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default TextFormatControls;