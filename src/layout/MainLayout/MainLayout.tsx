import Header from 'src/components/Header'
import SearchMobie from 'src/components/SearchMobie'
import DetailPage from 'src/pages/DetailPage'
import HomePage from 'src/pages/HomePage'

const MainLayout = () => {
  return (
    <>
      <Header />
      <SearchMobie />
      {/* <HomePage /> */}
      <DetailPage />
    </>
  )
}

export default MainLayout
