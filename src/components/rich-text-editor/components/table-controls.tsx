import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button.tsx'
import {
  Table,
  Plus,
  Minus,
  RotateCcw,
  Columns,
  Rows,
  Trash2
} from 'lucide-react'
import React from 'react'

interface TableControlsProps {
  editor: Editor | null
}

const TableControls: React.FC<TableControlsProps> = ({ editor }) => {
  if (!editor) return null

  const isTableActive = editor.isActive('table')

  // Crear una tabla nueva
  const insertTable = (): void => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run()
  }

  // Agregar columna después de la actual
  const addColumnAfter = (): void => {
    editor.chain().focus().addColumnAfter().run()
  }

  // Agregar columna antes de la actual
  const addColumnBefore = (): void => {
    editor.chain().focus().addColumnBefore().run()
  }

  // Eliminar columna actual
  const deleteColumn = (): void => {
    editor.chain().focus().deleteColumn().run()
  }

  // Agregar fila después de la actual
  const addRowAfter = (): void => {
    editor.chain().focus().addRowAfter().run()
  }

  // Agregar fila antes de la actual
  const addRowBefore = (): void => {
    editor.chain().focus().addRowBefore().run()
  }

  // Eliminar fila actual
  const deleteRow = (): void => {
    editor.chain().focus().deleteRow().run()
  }

  // Eliminar toda la tabla
  const deleteTable = (): void => {
    editor.chain().focus().deleteTable().run()
  }

  // Alternar fila de encabezado
  const toggleHeaderRow = (): void => {
    editor.chain().focus().toggleHeaderRow().run()
  }

  return (
    <div className='flex gap-1 flex-wrap'>
      {!isTableActive ? (
        // Mostrar solo el botón de insertar tabla si no hay una tabla activa
        <Button
          variant='outline'
          size='sm'
          onClick={insertTable}
          aria-label='Insertar tabla'
        >
          <Table className='h-4 w-4' />
        </Button>
      ) : (
        // Mostrar controles completos cuando hay una tabla activa
        <>
          {/* Controles de columnas */}
          <div className='flex gap-1 border-r pr-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={addColumnBefore}
              aria-label='Agregar columna antes'
              title='Agregar columna antes'
            >
              <Columns className='h-4 w-4' />
              <Plus className='h-3 w-3' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={addColumnAfter}
              aria-label='Agregar columna después'
              title='Agregar columna después'
            >
              <Plus className='h-4 w-4' />
              <Columns className='h-3 w-3' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={deleteColumn}
              aria-label='Eliminar columna'
              title='Eliminar columna'
            >
              <Columns className='h-4 w-4' />
              <Minus className='h-3 w-3' />
            </Button>
          </div>

          {/* Controles de filas */}
          <div className='flex gap-1 border-r pr-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={addRowBefore}
              aria-label='Agregar fila antes'
              title='Agregar fila antes'
            >
              <Rows className='h-4 w-4' />
              <Plus className='h-3 w-3' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={addRowAfter}
              aria-label='Agregar fila después'
              title='Agregar fila después'
            >
              <Plus className='h-4 w-4' />
              <Rows className='h-3 w-3' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={deleteRow}
              aria-label='Eliminar fila'
              title='Eliminar fila'
            >
              <Rows className='h-4 w-4' />
              <Minus className='h-3 w-3' />
            </Button>
          </div>

          {/* Otros controles */}
          <div className='flex gap-1'>
            <Button
              variant='outline'
              size='sm'
              onClick={toggleHeaderRow}
              aria-label='Alternar fila de encabezado'
              title='Alternar fila de encabezado'
            >
              <RotateCcw className='h-4 w-4' />
            </Button>
            <Button
              variant='destructive'
              size='sm'
              onClick={deleteTable}
              aria-label='Eliminar tabla'
              title='Eliminar tabla completa'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default TableControls