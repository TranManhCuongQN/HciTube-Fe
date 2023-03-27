import Header from 'src/components/Header'
import SearchMobie from 'src/components/Header/components/SearchMobie'
import DetailPage from 'src/pages/DetailPage'
import HomePage from 'src/pages/HomePage'
import SignIn from 'src/pages/SignIn'

const MainLayout = () => {
  return (
    <>
      <Header />
      <SearchMobie />
      {/* <SignIn /> */}
      {/* <HomePage /> */}
      <DetailPage />
    </>
  )
}

export default MainLayout
