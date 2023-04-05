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
      <MainComponent openModal={handleOpenModal} />

      {/* //* Dialog */}
      <FormUpload isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default UploadVideoPage
