
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

interface ServerPaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalElements: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  isLoading?: boolean
}

const ServerPagination: React.FC<ServerPaginationProps> = ({
                                                             currentPage,
                                                             totalPages,
                                                             pageSize,
                                                             totalElements,
                                                             onPageChange,
                                                             onPageSizeChange,
                                                             isLoading = false,
                                                           }) => {
  const canPreviousPage = currentPage > 0
  const canNextPage = currentPage < totalPages - 1

  return (
    <div
      className="flex items-center justify-between overflow-clip px-2"
      style={{ overflowClipMargin: 1 }}
    >
      <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
        Mostrando {Math.min(pageSize, totalElements - currentPage * pageSize)} de{' '}
        {totalElements} elementos
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium sm:block">Filas por página</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPageSizeChange(Number(value))
              onPageChange(0) // Reset to first page when changing page size
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {currentPage + 1} de {Math.max(1, totalPages)}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(0)}
            disabled={!canPreviousPage || isLoading}
          >
            <span className="sr-only">Ir a la primera página</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canPreviousPage || isLoading}
          >
            <span className="sr-only">Ir a la anterior página</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canNextPage || isLoading}
          >
            <span className="sr-only">Ir a la siguiente página</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(totalPages - 1)}
            disabled={!canNextPage || isLoading}
          >
            <span className="sr-only">Ir a la última página</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServerPagination