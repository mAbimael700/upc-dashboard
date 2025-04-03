import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/avisos/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/avisos/edit"!</div>
}
