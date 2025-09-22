import Cookies from 'js-cookie'
import { Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { Loader2 } from 'lucide-react'
import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard'

interface Props {
  children?: React.ReactNode
}

function AuthenticatedLayout({ children }: Props) {
  const { isAuthenticated, isLoading, redirectToLogin } = useAuthGuard()
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'

  // Mostrar loader mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    redirectToLogin()
    return null
  }

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          {children ? children : <Outlet />}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}

export default AuthenticatedLayout