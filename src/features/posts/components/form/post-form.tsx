import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { htmlToMarkdown, markdownToHtml } from '@/lib/serialization';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/rich-text-editor';
import { PostFormSchema } from '@/features/posts/components/form/schema.ts';
import { useEffect } from 'react'
import { useImageUploadForEditor } from '@/features/posts/hooks/useImageUpload.ts'


interface PostFormProps {
  handleSubmit: (values: z.infer<typeof PostFormSchema>) => void | Promise<void>
  defaultValues?: z.infer<typeof PostFormSchema>
}

const PostForm = ({
  defaultValues = {
    title: '',
  },
  handleSubmit,
}: PostFormProps) => {

  const imageUpload = useImageUploadForEditor()

  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof PostFormSchema>) {
    const markdownContent = htmlToMarkdown(values.content || '')
    const finalValues = {
      ...values,
      content: markdownContent,
    }
    await handleSubmit(finalValues)
  }

  useEffect(() => {
    if (defaultValues.content && defaultValues.content.trim() !== '') {
      // Sí hay contenido inicial (probablemente en MD), convertirlo a HTML
      const htmlContent = markdownToHtml(defaultValues.content)
      form.setValue('content', htmlContent)
    }
  }, [defaultValues.content, form])

  const handleImageUpload = async (file: File): Promise<string> => {
    if (!imageUpload) {
      // Si no hay postId, crear URL temporal
      return URL.createObjectURL(file)
    }

    // Usar el hook de subida
    return await imageUpload.uploadImage(file)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>El título del post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'content'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido del post</FormLabel>
              <RichTextEditor
                className={''}
                initialContent={field.value}
                onImageUpload={handleImageUpload}
                onChange={(content) => form.setValue('content', content)}
              />
              <FormDescription>El contenido del post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default PostForm
