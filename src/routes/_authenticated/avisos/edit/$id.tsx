import AvisoEditForm from '@/features/avisos/edit-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/avisos/edit/$id')({
  component: AvisoEditForm,
})