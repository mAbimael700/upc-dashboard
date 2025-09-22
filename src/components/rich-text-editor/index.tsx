import React, { useCallback, useState, useEffect } from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import EditorToolbar from '@/components/rich-text-editor/components/editor-toolbar.tsx'
import useRichTextEditor from '@/components/rich-text-editor/hooks/useRichTextEditor.ts'
import { toast } from 'sonner'

interface RichTextEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  className?: string
  onImageUpload?: (file: File) => Promise<string> // Función opcional para manejar la subida
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
                                                         initialContent = '',
                                                         onChange,
                                                         className = '',
                                                         onImageUpload,
                                                       }) => {
  const [content, setContent] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const { editor } = useRichTextEditor(
    initialContent,
    (newContent: string) => {
      setContent(newContent)
      onChange?.(newContent)
    }
  )

  // Setup focus/blur event listeners
  useEffect(() => {
    if (!editor) return

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    editor.on('focus', handleFocus)
    editor.on('blur', handleBlur)

    return () => {
      editor.off('focus', handleFocus)
      editor.off('blur', handleBlur)
    }
  }, [editor])

  const handleImageUpload = useCallback(
    async (file: File, editorInstance: Editor): Promise<void> => {
      try {
        let imageUrl: string

        if (onImageUpload) {
          // Si se proporciona una función de upload personalizada, úsala
          imageUrl = await onImageUpload(file)
        } else {
          // Fallback: crear una URL temporal para mostrar la imagen inmediatamente
          imageUrl = URL.createObjectURL(file)
        }

        // Insertar la imagen en el editor en la posición actual del cursor
        editorInstance
          .chain()
          .focus()
          .setImage({
            src: imageUrl,
            alt: file.name,
            title: file.name
          })
          .run()

      } catch  {
        // Aquí podrías mostrar una notificación de error al usuario
        toast('Error al cargar la imagen. Por favor, inténtalo de nuevo.')
      }
    },
    [onImageUpload]
  )

  if (!editor) {
    return <div className='p-4'>Cargando editor...</div>
  }

  return (
    <div className={`overflow-hidden rounded-lg border ${isFocused ? 'border-blue-500 shadow-lg' : 'border-accent'} ${className}`}>
      <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />

      <div className="[&>div]:focus:ring-0 [&>div]:focus:outline-0 [&_.tiptap]:focus:ring-0 [&_.tiptap]:focus:outline-0 [&_.ProseMirror]:focus:ring-0 [&_.ProseMirror]:focus:outline-0 [&_.ProseMirror]:focus:border-0 [&_.tiptap]:focus:border-0 p-4">
        <EditorContent
          className={`prose max-w-none transition-all duration-200 ${
            isFocused
              ? 'prose-blue bg-blue-50/30 rounded-md p-2'
              : 'prose-gray'
          }`}
          editor={editor}
        />
      </div>

      {/* Información de debug (puedes removerla en producción) */}
      <div className='border-t bg-gray-50 p-2 text-sm text-gray-600'>
        <details>
          <summary className='cursor-pointer'>Ver contenido HTML</summary>
          <pre className='mt-2 whitespace-pre-wrap rounded border bg-white p-2 text-xs'>
            {content || 'Contenido vacío'}
          </pre>
        </details>
      </div>
    </div>
  )
}

export default RichTextEditor