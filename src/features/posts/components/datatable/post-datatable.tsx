import PostsColumnDef from '@/features/posts/components/datatable/column-def.tsx'
import React from 'react'

import { PaginatedDataTable } from '@/components/paginated-datatable/PaginatedDataTable.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { usePostsCRUD } from '@/features/posts/hooks/usePosts.ts'
import CreatePostQuickButton from '@/features/posts/components/create-post-quick-button.tsx'



const PostsTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = React.useState<string>();
  const { queryKey, queryFn } = usePostsCRUD()


  return (
    <PaginatedDataTable
      columns={PostsColumnDef}
      queryKey={queryKey}
      queryFn={queryFn}
      initialPaginationOptions={{
        page: 0,
        size: 10,
        sortDirection: 'desc'
      }}
      header={(_, query) => (
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
              <p className="text-muted-foreground">
                Gestiona tus posts con filtros avanzados
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => query.refetch()} disabled={query.isFetching}>
                {query.isFetching ? 'Actualizando...' : 'Actualizar'}
              </Button>
              <CreatePostQuickButton/>
            </div>
          </div>

          {/* Filtros personalizados */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="status-filter" className="text-sm font-medium">
                Estado:
              </label>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="archived">Archivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    />
  )
}

export default PostsTable