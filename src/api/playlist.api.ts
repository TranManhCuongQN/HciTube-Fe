import { playList } from 'src/types/playList.type'
import { User, UserProfile } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import { Video } from 'src/types/video.type'
import http from 'src/utils/http'

const URL_PLAYLIST = '/api/v1/playlists'
const URL_CHANNEL = '/api/v1/channels'
const URL_VIDEO = '/api/v1/videos'
const playListAPI = {
  getPlayList: () => {
    return http.get<SuccessResponse<{ _id: string; title: string }[]>>(`${URL_PLAYLIST}`)
  },
  createPlayList: (data: { title: string; description: string }) => {
    return http.post(`${URL_PLAYLIST}`, data)
  },
  getPlayListById: (channelId: string) => {
    return http.get<SuccessResponse<playList[]>>(`${URL_CHANNEL}/${channelId}/playlists`)
  },
  getVideoById: (channelId: string) => {
    return http.get<SuccessResponse<Video[]>>(`${URL_CHANNEL}/${channelId}/videos`)
  },
  getChannelById: (channelId: string) => {
    return http.get<SuccessResponse<User>>(`${URL_CHANNEL}/get-channel/${channelId}`)
  }
}

export default playListAPI
