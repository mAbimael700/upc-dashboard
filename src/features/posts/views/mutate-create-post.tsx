import { Main } from '@/components/layout/main.tsx'
import { useCreatePost } from '@/features/posts/hooks/usePosts.ts'
import PostForm from '@/features/posts/components/form/post-form.tsx'
import { PostFormSchemaType } from '@/features/posts/components/form/schema.ts'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

const MutateCreatePost = () => {
  const {mutate: createPost} = useCreatePost()
  const navigate = useNavigate()

  const handleSubmit = (values : PostFormSchemaType) => {
    values.status = 'PUBLISHED'
    values.categoryIds =[1]
    createPost(values)
    toast.success('Post created successfully')
    navigate({href: '/'})
  }

  return (
    <Main>
      <PostForm handleSubmit={handleSubmit}/>
    </Main>
  )
}

export default MutateCreatePost