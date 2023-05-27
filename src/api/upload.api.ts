import axios from 'axios'
import sha1 from 'sha1'
import config from 'src/constants/config'
import { UploadVideo } from 'src/types/video.type'
import http from 'src/utils/http'

const URL_CREATE_VIDEO = '/api/v1/videos'
export let controllerVideo: AbortController
export let controllerImage: AbortController

const uploadApi = {
  uploadVideo: (data: File, options: any) => {
    controllerVideo = new AbortController()
    const formData = new FormData()
    formData.append('file', data)
    formData.append('upload_preset', config.PRESENT_NAME as string)
    formData.append('folder', config.FOLDER_NAME_VIDEO as string)
    return axios.post(config.URL_API as string, formData, {
      ...options,
      signal: controllerVideo.signal
    })
  },
  uploadImage: (data: File, options: any) => {
    controllerImage = new AbortController()
    const formData = new FormData()
    formData.append('file', data)
    formData.append('upload_preset', config.PRESENT_NAME as string)
    formData.append('folder', config.FOLDER_NAME_IMAGE as string)
    return axios.post(config.URL_API_IMAGE as string, formData, {
      ...options,
      signal: controllerImage.signal
    })
  },
  deleteImage: (publicId: string) => {
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${config.apiSecret as string}`)
    return axios.post(`https://api.cloudinary.com/v1_1/${config.ClOUD_NAME as string}/image/destroy`, {
      public_id: publicId,
      api_key: config.apiKey as string,
      api_serect: config.apiSecret as string,
      timestamp,
      signature
    })
  },
  deleteVideo: (publicId: string) => {
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${config.apiSecret as string}`)
    return axios.post(`https://api.cloudinary.com/v1_1/${config.ClOUD_NAME as string}/video/destroy`, {
      public_id: publicId,
      api_key: config.apiKey as string,
      api_serect: config.apiSecret as string,
      timestamp,
      signature
    })
  },
  createVideo: (data: UploadVideo) => {
    return http.post(URL_CREATE_VIDEO, data)
  }
}
export default uploadApi
