import axios from 'axios'
import sha1 from 'sha1'
import { UploadVideo } from 'src/types/video.type'
import http from 'src/utils/http'

const ClOUD_NAME = 'dw254eqyp'
const PRESENT_NAME = 'video_upload'
const FOLDER_NAME = 'youtube-clone/video'
const URL_API = `https://api.cloudinary.com/v1_1/${ClOUD_NAME}/video/upload`
const URL_API_IMAGE = `https://api.cloudinary.com/v1_1/${ClOUD_NAME}/image/upload`
const apiSecret = 'aBCAtSqVQHtNrpNKdIJHaMyEiJU'
const URL_CREATE_VIDEO = '/api/v1/videos'
export let controllerVideo: AbortController
export let controllerImage: AbortController

const uploadApi = {
  uploadVideo: (data: File, options: any) => {
    controllerVideo = new AbortController()
    const formData = new FormData()
    formData.append('file', data)
    formData.append('upload_preset', PRESENT_NAME)
    formData.append('folder', FOLDER_NAME)
    return axios.post(URL_API, formData, {
      ...options,
      signal: controllerVideo.signal
    })
  },
  uploadImage: (data: File, options: any) => {
    controllerImage = new AbortController()
    const formData = new FormData()
    formData.append('file', data)
    formData.append('upload_preset', PRESENT_NAME)
    formData.append('folder', FOLDER_NAME)
    return axios.post(URL_API_IMAGE, formData, {
      ...options,
      signal: controllerImage.signal
    })
  },
  deleteImage: (publicId: string) => {
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    return axios.post(`https://api.cloudinary.com/v1_1/${ClOUD_NAME}/image/destroy`, {
      public_id: publicId,
      api_key: '155478199373319',
      api_serect: 'aBCAtSqVQHtNrpNKdIJHaMyEiJU',
      timestamp,
      signature
    })
  },
  deleteVideo: (publicId: string) => {
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    return axios.post(`https://api.cloudinary.com/v1_1/${ClOUD_NAME}/video/destroy`, {
      public_id: publicId,
      api_key: '155478199373319',
      api_serect: 'aBCAtSqVQHtNrpNKdIJHaMyEiJU',
      timestamp,
      signature
    })
  },
  createVideo: (data: UploadVideo) => {
    return http.post(URL_CREATE_VIDEO, data)
  }
}
export default uploadApi
