import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PostService from '@/features/posts/services/PostService'
import { PaginationOptions } from '@/features/http/types/PaginationOptions.type.ts'
import { PostCreationRequest } from '@/features/posts/dto/PostCreationRequest.type.ts'
import { toast } from 'sonner'
import { useAuth } from '@/stores/authStore.ts'
import { PostFormSchemaType } from '@/features/posts/components/form/schema.ts'

// Query Keys
export const POST_QUERY_KEYS = {
  all: ['posts'] as const,
  lists: () => [...POST_QUERY_KEYS.all, 'list'] as const,
  list: (options?: PaginationOptions) => [...POST_QUERY_KEYS.lists(), options] as const,
  details: () => [...POST_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...POST_QUERY_KEYS.details(), id] as const,
}

// Hook para obtener todos los posts (paginados)
export const usePosts = (
  token: string,
  options?: PaginationOptions,
  queryOptions?: {
    enabled?: boolean
    staleTime?: number
    refetchOnWindowFocus?: boolean
  }
) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: POST_QUERY_KEYS.list(options),
    queryFn: () => PostService.getAll(token, options),
    enabled: !!token && (queryOptions?.enabled ?? true),
    staleTime: queryOptions?.staleTime ?? 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: queryOptions?.refetchOnWindowFocus ?? false,
  })
}

// Hook para obtener un post por ID
export const usePostById = (
  id: string,
  queryOptions?: {
    enabled?: boolean
    staleTime?: number
    refetchOnWindowFocus?: boolean
  }
) => {
  const {accessToken: token} = useAuth()

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: POST_QUERY_KEYS.detail(id),
    queryFn: () => PostService.getById(id, token),
    enabled: !!id && !!token && (queryOptions?.enabled ?? true),
    staleTime: queryOptions?.staleTime ?? 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: queryOptions?.refetchOnWindowFocus ?? false,
  })
}

// Hook para crear un post
export const useCreatePost = () => {
  const {accessToken: token, user} = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postData: PostCreationRequest | PostFormSchemaType) => PostService.create({
      ...postData,
      authorId: user?.idUser || 0
    }, token),
    onSuccess: (newPost) => {
      // Invalidar las queries de la lista para refrescar los datos
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.lists() })

      // Opcionalmente, agregar el nuevo post al cache
      queryClient.setQueryData(POST_QUERY_KEYS.detail(newPost.idPost.toString()), newPost)
    },
    onError: () => {
      toast.error('Error creating post')
    },
  })
}

// Hook para actualizar un post
export const useUpdatePost = () => {
  const {accessToken: token} = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, postData }: { id: string; postData: Partial<PostCreationRequest> }) =>
      PostService.update(id, postData, token),
    onSuccess: (updatedPost, variables) => {
      // Actualizar el post específico en el cache
      queryClient.setQueryData(POST_QUERY_KEYS.detail(variables.id), updatedPost)

      // Invalidar las queries de la lista para refrescar los datos
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.lists() })
    },
    onError: () => {
      toast.error('Error updating post')
    },
  })
}

// Hook para eliminar un post
export const useDeletePost = () => {
  const {accessToken: token} = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => PostService.deletePost(id, token),
    onSuccess: (_, deletedId) => {
      // Remover el post del cache
      queryClient.removeQueries({ queryKey: POST_QUERY_KEYS.detail(deletedId) })

      // Invalidar las queries de la lista para refrescar los datos
      queryClient.invalidateQueries({ queryKey: POST_QUERY_KEYS.lists() })
    },
    onError: () => {
      toast.error('Error deleting post')
    },
  })
}

// Funciones helper para usar con PaginatedDataTable
export const createPostsQueryKey = () =>
  (options: PaginationOptions) => POST_QUERY_KEYS.list(options)

export const createPostsQueryFn = (token: string) =>
  (options: PaginationOptions) => PostService.getAll(token, options)

export const usePostsCRUD = () => {
  const {accessToken: token} = useAuth()
  return {
    // Queries
    usePosts: (options?: PaginationOptions, queryOptions?: Parameters<typeof usePosts>[2]) =>
      usePosts(token, options, queryOptions),
    usePost: (id: string, queryOptions?: Parameters<typeof usePostById>[1]) =>
      usePostById(id, queryOptions),

    // Mutations
    createPost: useCreatePost(),
    updatePost: useUpdatePost(),
    deletePost: useDeletePost(),

    // Para PaginatedDataTable
    queryKey: createPostsQueryKey(),
    queryFn: createPostsQueryFn(token),
  }
}