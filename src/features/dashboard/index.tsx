
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import AvisoDataTable from '../avisos/components/data-table'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'


export default function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Avisos</h1>
            <p className='text-sm text-muted-foreground'>Este el panel de administración de los avisos que se muestran en la pantalla principal</p>
          </div>
          <Link className={buttonVariants()} to='/test'>Publicar</Link>
        </div>

        <Separator />
<br />
        <div>
          <AvisoDataTable />
        </div>

      </Main>
    </>
  )
}

