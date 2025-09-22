import { createFileRoute } from '@tanstack/react-router'
import MutateCreatePost from '@/features/posts/views/mutate-create-post.tsx'

export const Route = createFileRoute('/_authenticated/posts/create')({
  component: MutateCreatePost,
})
