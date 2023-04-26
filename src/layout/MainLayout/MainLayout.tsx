import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import SearchMobie from 'src/components/Header/components/SearchMobie'

const MainLayout = () => {
  return (
    <>
      <Header />
      <SearchMobie />
      <Outlet />
    </>
  )
}

export default MainLayout
