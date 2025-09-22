export type PostCreationRequest = {
  title: string
  authorId: number
  excerpt?: string
  content?: string
  coverUrl?: string
  status?: string
  categoryIds?: number[]
}