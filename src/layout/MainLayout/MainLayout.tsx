import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import SearchMobie from 'src/components/Header/components/SearchMobie'
import DetailPage from 'src/pages/DetailPage'
import HomePage from 'src/pages/HomePage'
import AsideBar from 'src/pages/HomePage/components/AsideBar'
import SignIn from 'src/pages/SignIn'
import SignUp from 'src/pages/SignUp'

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
