import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button.tsx'
import { Minus, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input.tsx'
import React from 'react'

interface UtilityControlsProps {
  editor: Editor | null
  onImageUpload?: (file: File, editor: Editor) => void | Promise<void>
}

const UtilityControls: React.FC<UtilityControlsProps> = ({
  editor,
  onImageUpload,
}) => {
  if (!editor) return null

  const addHorizontalRule = (): void => {
    editor.chain().focus().setHorizontalRule().run()
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0]
    if (file && onImageUpload) {
      onImageUpload(file, editor)
    }
  }

  const triggerImageUpload = (): void => {
    const input = document.getElementById('image-upload') as HTMLInputElement
    input?.click()
  }

  return (
    <div className='flex gap-1'>
      <Button
        variant='outline'
        size='sm'
        onClick={addHorizontalRule}
        aria-label='Separador'
      >
        <Minus className='h-4 w-4' />
      </Button>

      <Button
        variant='outline'
        size='sm'
        onClick={triggerImageUpload}
        aria-label='Subir imagen'
      >
        <Upload className='h-4 w-4' />
      </Button>

      <Input
        id='image-upload'
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        className='hidden'
      />
    </div>
  )
}

export default UtilityControls