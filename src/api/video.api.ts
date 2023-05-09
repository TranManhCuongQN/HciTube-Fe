import { User } from './../types/user.type'
import { QueryConfig } from 'src/types/QueryConfig.type'
import { SuccessResponse } from 'src/types/utils.type'
import { UploadVideo, Video, VideoItem } from 'src/types/video.type'
import http from 'src/utils/http'
import { View } from 'src/types/view.type'
import { following } from 'src/types/following.type'

export const URL_GET_VIDEO = '/api/v1/videos'
export const URL_GET_VIDEO_CHANNEL = `/api/v1/channels/`
export const URL_GET_VIDEO_HISTORY = `/api/v1/watchHistories`

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
  setAction: (data: { action: string; video: string }) => {
    return http.patch(`${URL_GET_VIDEO}/action`, data)
  },
  searchVideo: (params: QueryConfig) => {
    return http.get<SuccessResponse<{ videos: Video[]; users: User[] }>>(`${URL_GET_VIDEO}/search-videos`, { params })
  },
  setWatchVideoTime: (data: { idView: string; watchedTime: number }) => {
    return http.patch(`${URL_GET_VIDEO}/view/${data.idView}`, {
      watchedTime: data.watchedTime
    })
  },
  getVideoFollowing: () => {
    return http.get<SuccessResponse<following>>(`${URL_GET_VIDEO}/following-videos`)
  },
  increaseView: (data: { video: string; watchedTime: number }) => {
    return http.post<SuccessResponse<View>>(`${URL_GET_VIDEO}/view`, data)
  },
  getVideoWatchTime: () => {
    return http.get(`${URL_GET_VIDEO_HISTORY}`)
  }
}
export default videoApi
