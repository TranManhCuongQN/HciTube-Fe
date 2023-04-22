import { SuccessResponse } from 'src/types/utils.type'
import { UploadVideo, Video } from 'src/types/video.type'
import http from 'src/utils/http'

export const URL_GET_VIDEO = '/api/v1/videos'

const videoApi = {
  getVideo: () => {
    return http.get<SuccessResponse<Video[]>>(URL_GET_VIDEO)
  },
  updateInforVideo: (data: UploadVideo, idVideo: string) => {
    return http.patch<SuccessResponse<Video>>(`${URL_GET_VIDEO}/${idVideo}`, data)
  },
  deleteVideo: (idVideo: string) => {
    return http.delete<SuccessResponse<Video>>(`${URL_GET_VIDEO}/${idVideo}`)
  }
}
export default videoApi
