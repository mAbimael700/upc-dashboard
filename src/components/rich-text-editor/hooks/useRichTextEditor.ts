import React, { useCallback } from 'react';
import { Content, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'


const useRichTextEditor = (
  initialContent : string = ''  ,
  onChange?: (html : string) => void
) =>
{
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),

      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'editor-table',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'editor-table-header',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'editor-table-cell',
        },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
  })

  const getContent = useCallback(() => {
    return editor?.getHTML() || ''
  }, [editor])

  const setContent = useCallback(
    (content: Content | typeof React.Fragment | Node) => {
      editor?.commands.setContent(content)
    },
    [editor]
  )

  return {
    editor,
    getContent,
    setContent,
  }
}

export default useRichTextEditor;