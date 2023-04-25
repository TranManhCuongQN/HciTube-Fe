import { SuccessResponse } from 'src/types/utils.type'
import { UploadVideo, Video, VideoItem } from 'src/types/video.type'
import http from 'src/utils/http'

export const URL_GET_VIDEO = '/api/v1/videos'
export const URL_GET_VIDEO_CHANNEL = `/api/v1/channels/`

const videoApi = {
  getVideoAll: () => {
    return http.get<SuccessResponse<Video[]>>(URL_GET_VIDEO)
  },
  getVideoById: (idVideo: string) => {
    return http.get<SuccessResponse<VideoItem>>(`${URL_GET_VIDEO}/${idVideo}`)
  },
  updateInforVideo: (data: UploadVideo, idVideo: string) => {
    return http.patch<SuccessResponse<Video>>(`${URL_GET_VIDEO}/${idVideo}`, data)
  },
  deleteVideo: (idVideo: string) => {
    return http.delete<SuccessResponse<Video>>(`${URL_GET_VIDEO}/${idVideo}`)
  },
  deleteAllVideo: (videos: string[]) => {
    return http.patch<SuccessResponse<Video[]>>(`${URL_GET_VIDEO}/delete-multiple-videos`, { videos })
  },
  getVideoChannel: (idChannel: string) => {
    return http.get<SuccessResponse<Video[]>>(`${URL_GET_VIDEO_CHANNEL}/${idChannel}/videos`)
  },
  setAction: () => {
    return http.patch<SuccessResponse<null>>(`${URL_GET_VIDEO}/action`)
  }
}
export default videoApi
