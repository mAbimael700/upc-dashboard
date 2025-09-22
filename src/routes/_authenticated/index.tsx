import { createFileRoute } from '@tanstack/react-router'
import PostsView from '@/features/posts/views'

export const Route = createFileRoute('/_authenticated/')({
  component: PostsView,
})
