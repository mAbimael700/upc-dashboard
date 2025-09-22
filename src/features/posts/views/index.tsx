import PostsTable from '@/features/posts/components/datatable/post-datatable.tsx'
import { Main } from '@/components/layout/main.tsx'

const PostsView = () => {
  return (
    <Main>
      <PostsTable />
    </Main>
  )
}

export default PostsView