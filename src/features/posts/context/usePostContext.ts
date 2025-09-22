import { create } from 'zustand'
import { PostResponse } from '@/features/posts/dto/PostResponse.type.ts'


interface PostResponseStore {
  // Estados
  currentPost: PostResponse | null
  setCurrentPost: (post: PostResponse | null) => void
}

export const usePostContext = create<PostResponseStore>((set) => ({
  // Estado inicial
  currentPost: null,
  // Acciones básicas
  setCurrentPost: (post) => set({ currentPost: post }),
}))
