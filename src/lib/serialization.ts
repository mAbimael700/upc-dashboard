import TurndownService from 'turndown'
import { marked } from 'marked'

// Configurar Turndown para conversión HTML → MD
const turndownService = new TurndownService({
  headingStyle: 'atx', // # ## ### style
  codeBlockStyle: 'fenced', // ``` style
  bulletListMarker: '-',
  emDelimiter: '_',
  strongDelimiter: '**',
})

// Configurar reglas personalizadas si es necesario
turndownService.addRule('strikethrough', {
  filter: ['del', 's',],
  replacement: (content) => `~~${content}~~`
})

// Configurar Marked para conversión MD → HTML
marked.setOptions({
  breaks: true, // Convertir saltos de línea a <br>
  gfm: true, // GitHub Flavored Markdown
})

/**
 * Convierte HTML a Markdown
 */
export function htmlToMarkdown(html: string): string {
  if (!html || html.trim() === '') return ''

  try {
    // Limpiar HTML antes de convertir
    const cleanHtml = html
      .replace(/<p><\/p>/g, '') // Remover párrafos vacíos
      .replace(/&nbsp;/g, ' ') // Reemplazar espacios no separables

    return turndownService.turndown(cleanHtml)
  } catch (error) {
    console.error('Error convirtiendo HTML a Markdown:', error)
    return html // Devolver HTML original en caso de error
  }
}

/**
 * Convierte Markdown a HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown || markdown.trim() === '') return ''

  try {
    return marked(markdown) as string
  } catch (error) {
    console.error('Error convirtiendo Markdown a HTML:', error)
    return markdown // Devolver Markdown original en caso de error
  }
}


// Función de utilidad para limpiar contenido
export function cleanContent(content: string): string {
  return content
    .trim()
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Múltiples saltos de línea → doble salto
    .replace(/^\s+|\s+$/g, '') // Espacios al inicio y final
}

// Función para detectar si el contenido es HTML o Markdown
export function isHtml(content: string): boolean {
  const htmlRegex = /<[^>]*>/
  return htmlRegex.test(content)
}

// Función inteligente que detecta el formato y convierte según sea necesario
export function smartConversion(content: string, targetFormat: 'html' | 'md'): string {
  if (!content) return ''

  const isContentHtml = isHtml(content)

  if (targetFormat === 'html' && !isContentHtml) {
    // Contenido es MD, convertir a HTML
    return markdownToHtml(content)
  } else if (targetFormat === 'md' && isContentHtml) {
    // Contenido es HTML, convertir a MD
    return htmlToMarkdown(content)
  }

  // Ya está en el formato correcto
  return content
}