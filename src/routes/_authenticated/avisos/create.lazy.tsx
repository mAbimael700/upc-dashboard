import AvisoCreateForm from '@/features/avisos/create-form'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/avisos/create')({
  component: AvisoCreateForm,
})


