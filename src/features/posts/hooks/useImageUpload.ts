import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import PostService, { ImageUploadResponse } from '@/features/posts/services/PostService.ts'
import { useAuth } from '@/stores/authStore.ts'
import { usePostContext } from '@/features/posts/context/usePostContext.ts'


// Tipo para los parámetros de subida
interface ImageUploadParams {
  postId: string
  file: File
  token: string
}

// Hook básico para subir una imagen
export const useImageUpload = () => {
  return useMutation<ImageUploadResponse, Error, ImageUploadParams>({
    mutationFn: async ({ postId, file, token }) => {
      return await PostService.uploadImage(postId, file, token)
    },
    onSuccess: () => {
      toast.success('Imagen subida exitosamente')
    },
    onError: (error) => {
      toast.error(error.message || 'Error al subir la imagen')
    },
  })
}

// Hook optimizado para el editor de texto enriquecido
export const useImageUploadForEditor = () => {
  const { accessToken: token } = useAuth()
  const {currentPost} = usePostContext()

  const mutation = useMutation<ImageUploadResponse, Error, File>({
    mutationFn: async (file: File) => {
      return await PostService.uploadImage(currentPost?.idPost.toString() ?? '1', file, token)
    },
    onError: (error) => {
      toast.error(error.message || 'Error al subir la imagen')
    },
  })

  // Función optimizada que devuelve la URL de la imagen
  const uploadImage = async (file: File): Promise<string> => {
    const result = await mutation.mutateAsync(file)
    return result.url
  }

  return {
    uploadImage,
    isUploading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  }
}

// Hook con retry automático y progreso visual
export const useImageUploadWithRetry = () => {
  return useMutation<ImageUploadResponse, Error, ImageUploadParams>({
    mutationFn: async ({ postId, file, token }) => {
      return await PostService.uploadImage(postId, file, token)
    },
    retry: 3, // Reintentar 3 veces en caso de error
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
    onSuccess: () => {
      toast.success('Imagen subida exitosamente')
    },
    onError: (error, ) => {
      toast.error(`Error al subir la imagen: ${error.message}`)
    },
    onMutate: async () => {
      // Mostrar toast de carga
      toast.loading('Subiendo imagen...', { id: 'upload-image' })
      return { uploadId: 'upload-image' }
    },
    onSettled: () => {
      // Remover toast de carga
      toast.dismiss('upload-image')
    },
  })
}

// Hook para manejar múltiples subidas de imágenes
export const useMultipleImageUpload = (postId: string, token: string) => {
  const mutation = useMutation<ImageUploadResponse[], Error, File[]>({
    mutationFn: async (files: File[]) => {
      // Subir todas las imágenes en paralelo
      const promises = files.map(file => PostService.uploadImage(postId, file, token))
      return await Promise.all(promises)
    },
    onSuccess: (data) => {
      toast.success(`${data.length} imágenes subidas exitosamente`)
    },
    onError: (error) => {
      toast.error(error.message || 'Error al subir las imágenes')
    },
  })

  return {
    uploadImages: mutation.mutateAsync,
    isUploading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  }
}