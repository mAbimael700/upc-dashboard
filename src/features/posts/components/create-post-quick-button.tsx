import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from '@tanstack/react-router'


const CreatePostQuickButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({href: '/posts/create'})
  }

  return (
    <Button onClick={handleClick}>
      Nuevo post
    </Button>
  )
}

export default CreatePostQuickButton