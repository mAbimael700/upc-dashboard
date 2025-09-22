import { Main } from '@/components/layout/main.tsx'
import { useCreatePost } from '@/features/posts/hooks/usePosts.ts'
import PostForm from '@/features/posts/components/form/post-form.tsx'
import { PostFormSchemaType } from '@/features/posts/components/form/schema.ts'
import { toast } from 'sonner'

const MutateCreatePost = () => {
  const {mutate: createPost} = useCreatePost()

  const handleSubmit = (values : PostFormSchemaType) => {
    values.status = 'PUBLISHED'
    values.categoryIds =[1]
    createPost(values)
    toast.success('Post created successfully')
  }

  return (
    <Main className={''}>
      <PostForm handleSubmit={handleSubmit}/>
    </Main>
  )
}

export default MutateCreatePost