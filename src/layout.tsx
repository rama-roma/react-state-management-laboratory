import { Link, Outlet } from "react-router-dom"
import { Button } from 'antd'

const Layout = () => {
  return (
    <>
      <header className='max-w-[1300px] m-auto p-4'>
        <nav className="flex items-center justify-center gap-[10px]">
          <Link to='/redux'>
            <Button>Redux</Button>
          </Link>
          <Link to='/zustand'>
            <Button>Zustand</Button>
          </Link>
          <Link to='/jotai'>
            <Button>Jotai</Button>
          </Link>
          <Link to='/mobX'>
            <Button>MobX</Button>
          </Link>
          <Link to='/contextApi'>
            <Button>Context API</Button>
          </Link>
          <Link to='/queryReact'>
            <Button>React Query</Button>
          </Link>
        </nav>
      </header>
      <main className='max-w-[1300px] m-auto p-4'>
        <Outlet/>
      </main>
    </>
  )
}

export default Layout