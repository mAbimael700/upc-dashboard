import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import RichTextEditor from '@/components/rich-text-editor'

const EditorDemo: React.FC = () => {
  const [_, setEditorContent] = useState<string>('');

  const handleContentChange = (newContent: string): void => {
    setEditorContent(newContent);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <RichTextEditor
        initialContent="<h1>¡Bienvenido al editor!</h1><p>Prueba todas las funcionalidades disponibles en la barra de herramientas.</p>"
        onChange={handleContentChange}
        className="w-full"
      />

      <div className="space-y-2">
        <h3 className="font-semibold">Funcionalidades disponibles:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Formato de texto:</strong> Negrita, cursiva, subrayado</li>
          <li>• <strong>Encabezados:</strong> H1 y H2</li>
          <li>• <strong>Bloques:</strong> Citas, listas con viñetas y numeradas</li>
          <li>• <strong>Elementos:</strong> Separadores horizontales e imágenes</li>
          <li>• <strong>Subida de imágenes:</strong> Selecciona archivos desde tu dispositivo</li>
        </ul>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/test/')({
  component: EditorDemo,
})


