/* eslint-disable import/no-unresolved */

import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import HomePage from 'src/pages/HomePage'

const MainLayout = () => {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}

export default MainLayout
