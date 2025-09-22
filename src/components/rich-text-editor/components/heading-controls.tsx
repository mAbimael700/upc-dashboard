import React from 'react'
import { Editor } from '@tiptap/react'
import { Heading1, Heading2 } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle.tsx'

interface EditorControlsProps {
  editor: Editor | null
}

const HeadingControls: React.FC<EditorControlsProps> = ({ editor }) => {
  if (!editor) return null

  return (
    <div className='flex gap-1'>
      <Toggle
        size='sm'
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        aria-label='Encabezado 1'
      >
        <Heading1 className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        aria-label='Encabezado 2'
      >
        <Heading2 className='h-4 w-4' />
      </Toggle>
    </div>
  )
}

export default HeadingControls