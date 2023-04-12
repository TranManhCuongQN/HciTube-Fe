import FormUpload from './components/FormUpload'
import { useState } from 'react'
import MainComponent from './components/MainComponent'
import FormAddPlayList from './components/FormAddPlayList'

const UploadVideoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [showModalPlayList, setShowModalList] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModalPlayList = () => {
    setShowModalList(false)
  }

  const handleOpenModalPlayList = () => {
    setShowModalList(true)
  }

  return (
    <>
      <MainComponent openModal={handleOpenModal} />

      {/* //* Dialog */}
      <FormUpload
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleOpenModalPlayList={handleOpenModalPlayList}
        handleCloseModalPlayList={handleCloseModalPlayList}
      />
      <FormAddPlayList showModal={showModalPlayList} setShowModal={handleCloseModalPlayList} />
    </>
  )
}

export default UploadVideoPage
