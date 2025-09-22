import React from 'react'
import { Toggle } from '@/components/ui/toggle.tsx'
import { Editor } from '@tiptap/react'
import { ListOrdered, Quote, List } from 'lucide-react'

interface EditorControlsProps {
  editor: Editor | null
}

const BlockControls: React.FC<EditorControlsProps> = ({ editor }) => {
  if (!editor) return null

  return (
    <div className='flex gap-1'>
      <Toggle
        size='sm'
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label='Cita'
      >
        <Quote className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label='Lista con viñetas'
      >
        <List className='h-4 w-4' />
      </Toggle>

      <Toggle
        size='sm'
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label='Lista numerada'
      >
        <ListOrdered className='h-4 w-4' />
      </Toggle>
    </div>
  )
}

export default BlockControls