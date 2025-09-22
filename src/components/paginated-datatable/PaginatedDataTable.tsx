import React, { useState, useEffect, useMemo } from 'react'
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  Table as ITable,
  TableOptions,
  flexRender,
} from '@tanstack/react-table'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { PaginationOptions } from '@/features/http/types/PaginationOptions.type.ts'
import { PageResponse } from '@/features/http/types/PageResponse.type.ts'
import ServerPagination from '@/components/paginated-datatable/components/ServerPagination.tsx'

// Componente de paginación personalizada para server-side pagination


// Props del componente principal
interface PaginatedDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  queryKey: (options: PaginationOptions) => readonly unknown[]
  queryFn: (options: PaginationOptions) => Promise<PageResponse<TData>>
  header?: (table: ITable<TData>, query: UseQueryResult<PageResponse<TData>>) => React.ReactNode
  footer?: (table: ITable<TData>, query: UseQueryResult<PageResponse<TData>>) => React.ReactNode
  initialPaginationOptions?: Partial<PaginationOptions>
  tableOptions?: Partial<TableOptions<TData>>
  queryOptions?: {
    enabled?: boolean
    staleTime?: number
    refetchOnWindowFocus?: boolean
  }
  emptyMessage?: string
  loadingMessage?: string
}

export function PaginatedDataTable<TData, TValue>({
                                                    columns,
                                                    queryKey,
                                                    queryFn,
                                                    header,
                                                    footer,
                                                    initialPaginationOptions = {},
                                                    tableOptions = {},
                                                    queryOptions = {},
                                                    emptyMessage = 'No hay datos disponibles',
                                                    loadingMessage = 'Cargando...',
                                                  }: PaginatedDataTableProps<TData, TValue>) {
  // Estados para la paginación del servidor
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    page: 0,
    size: 10,
    sortDirection: 'asc',
    ...initialPaginationOptions,
  })

  // Estados para la tabla
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  // Query para obtener los datos
  const query = useQuery({
    queryKey: queryKey(paginationOptions),
    queryFn: () => queryFn(paginationOptions),
    enabled: queryOptions.enabled ?? true,
    staleTime: queryOptions.staleTime ?? 5 * 60 * 1000,
    refetchOnWindowFocus: queryOptions.refetchOnWindowFocus ?? false,
  })

  // Sincronizar el sorting de la tabla con las opciones de paginación
  useEffect(() => {
    if (sorting.length > 0) {
      const sort = sorting[0]
      setPaginationOptions(prev => ({
        ...prev,
        page: 0, // Reset to first page when sorting changes
        sortDirection: sort.desc ? 'desc' : 'asc',
      }))
    } else {
      setPaginationOptions(prev => ({
        ...prev,
        sortDirection: 'asc',
      }))
    }
  }, [sorting])

  // Datos para la tabla (solo los de la página actual)
  const tableData = useMemo(() => {
    return query.data?.content || []
  }, [query.data])

  // Configuración de la tabla
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    pageCount: query.data?.totalPages || 0,
    manualPagination: true, // Importante: le dice a la tabla que la paginación es manual
    manualSorting: true, // Importante: le dice a la tabla que el sorting es manual
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...tableOptions,
  })

  // Handlers para la paginación del servidor
  const handlePageChange = (newPage: number) => {
    setPaginationOptions(prev => ({
      ...prev,
      page: newPage,
    }))
  }

  const handlePageSizeChange = (newSize: number) => {
    setPaginationOptions(prev => ({
      ...prev,
      size: newSize,
      page: 0, // Reset to first page when changing page size
    }))
  }

  // Renderizado condicional para loading y error
  if (query.isLoading) {
    return (
      <div className="space-y-4">
        {header && header(table, query)}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {loadingMessage}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {!footer && (
          <ServerPagination
            currentPage={0}
            totalPages={1}
            pageSize={paginationOptions.size || 10}
            totalElements={0}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            isLoading={true}
          />
        )}
      </div>
    )
  }

  if (query.error) {
    return (
      <div className="space-y-4">
        {header && header(table, query)}
        <div className="rounded-md border">
          <div className="p-8 text-center text-red-500">
            Error al cargar los datos: {(query.error as Error).message}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {header && header(table, query)}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableData.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {footer ? (
        <div className="footer">{footer(table, query)}</div>
      ) : (
        <ServerPagination
          currentPage={paginationOptions.page || 0}
          totalPages={query.data?.totalPages || 0}
          pageSize={paginationOptions.size || 10}
          totalElements={query.data?.totalElements || 0}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          isLoading={query.isFetching}
        />
      )}
    </div>
  )
}