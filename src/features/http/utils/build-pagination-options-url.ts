import { PaginationOptions } from '@/features/http/types/PaginationOptions.type.ts'

export const buildPaginationOptionsUrl = (
  url: string,
  options: PaginationOptions = {
    page: 0,
    size: 10,
    sortDirection: 'asc',
  }) => {
  const params = Object.entries(options)
  const paramsUrl = params.map(([key, value]) => `${key}=${value}`).join('&')
  return url.concat('?', paramsUrl)
}