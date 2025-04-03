
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import AvisoDataTable from '../avisos/components/data-table'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'


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
          <h1 className='text-2xl font-bold tracking-tight'>Avisos</h1>
          <Link className={buttonVariants()} to='/avisos/create'>Publicar</Link>
        </div>


        <div>
          <AvisoDataTable />
        </div>

      </Main>
    </>
  )
}

