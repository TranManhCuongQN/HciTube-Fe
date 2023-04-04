import axios from 'axios'

const ClOUD_NAME = 'dw254eqyp'
const PRESENT_NAME = 'video_upload'
const FOLDER_NAME = 'youtube-clone/video'
const URL_API = `https://api.cloudinary.com/v1_1/${ClOUD_NAME}/video/upload`
const URL_API_IMAGE = `https://api.cloudinary.com/v1_1/${ClOUD_NAME}/image/upload`
const uploadApi = {
  uploadVideo: async (data: File, options: any) => {
    const formData = new FormData()
    formData.append('file', data)
    formData.append('upload_preset', PRESENT_NAME)
    formData.append('folder', FOLDER_NAME)
    return axios.post(URL_API, formData, options)
  },
  uploadImage: async (data: File, options: any) => {
    const formData = new FormData()
    formData.append('file', data)
    formData.append('upload_preset', PRESENT_NAME)
    formData.append('folder', FOLDER_NAME)
    return axios.post(URL_API_IMAGE, formData, options)
  }
}
export default uploadApi
