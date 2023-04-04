import Sidebar from './components/Sidebar'
import FormUpload from './components/FormUpload'
import { useState } from 'react'
import MainComponent from './components/MainComponent'

const UploadVideoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className='container flex flex-col gap-y-5 bg-[#f9f9f9] pl-3 pr-3 pb-3 dark:bg-[#1f1f1f] lg:h-screen lg:flex-row lg:gap-x-8'>
        {/* //* SideBar */}
        <Sidebar />
        {/* //* Main */}
        <MainComponent openModal={handleOpenModal} />
      </div>

      {/* //* Dialog */}
      <FormUpload isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default UploadVideoPage
