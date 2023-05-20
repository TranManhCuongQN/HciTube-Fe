import FormUpload from './components/FormUpload'
import { useState } from 'react'
import MainComponent from './components/MainComponent'
import FormAddPlayList from './components/FormAddPlayList'
import { Helmet } from 'react-helmet-async'

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
      <Helmet>
        <title>Trang tổng quan của kênh - HciTube</title>
        <meta name='description' content='Trang tổng quan của kênh - HciTube' />
      </Helmet>
      <MainComponent openModal={handleOpenModal} />

      {/* //* Dialog */}
      <FormUpload
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleOpenModalPlayList={handleOpenModalPlayList}
        handleCloseModalPlayList={handleCloseModalPlayList}
      />
      <FormAddPlayList showModal={showModalPlayList} closeModal={handleCloseModalPlayList} />
    </>
  )
}

export default UploadVideoPage
