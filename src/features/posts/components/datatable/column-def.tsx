import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { PostResponse } from '@/features/posts/dto/PostResponse.type.ts'
import { useDeletePost } from '@/features/posts/hooks/usePosts.ts'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'


const PostsColumnDef: ColumnDef<PostResponse>[] = [
  {
    accessorKey: 'title',
    header: 'Titulo',
  },
  {
    accessorKey: 'content',
    header: 'Contenido',
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue('content')}
        </div>
    ),
  },
  {
    accessorKey: 'authorName',
    header: 'Autor',
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue('authorName')}</Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge variant={status === 'published' ? 'default' : 'secondary'}>
      {status}
      </Badge>
    )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de Creación',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return <div>{format(date, "PPpp", {locale: es})}</div>
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const post = row.original
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deletePostMutation = useDeletePost()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Abrir menú</span>
      <MoreHorizontal className="h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => console.log('Ver', post.idPost)}>
      <Eye className="mr-2 h-4 w-4" />
        Ver
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('Editar', post.idPost)}>
      <Edit className="mr-2 h-4 w-4" />
        Editar
        </DropdownMenuItem>
        <DropdownMenuItem
      onClick={() => deletePostMutation.mutate(post.idPost.toString())}
      className="text-red-600"
      >
      <Trash2 className="mr-2 h-4 w-4" />
        Eliminar
        </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
    },
  },
]

export default PostsColumnDef;