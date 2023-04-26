import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import SearchMobie from 'src/components/Header/components/SearchMobie'
import Sidebar from './components/Sidebar'

const ManageVideoLayout = () => {
  return (
    <>
      <Header />
      <SearchMobie />
      <div className='container flex flex-col gap-y-5 bg-[#f9f9f9] pl-3 pr-3 pb-3 dark:bg-[#1f1f1f] lg:min-h-screen lg:flex-row lg:gap-x-8'>
        {/* //* SideBar */}
        <Sidebar />
        {/* //* Main */}
        <Outlet />
      </div>
    </>
  )
}

export default ManageVideoLayout
