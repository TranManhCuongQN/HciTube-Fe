import { favorite, FavoriteItem } from 'src/types/favorite.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_FAVORITE = '/api/v1/favoriteVideos'
const URL_CHANNEL = '/api/v1/channels'
const favoriteApi = {
  getFavoriteVideos: () => {
    return http.get<FavoriteItem>(URL_FAVORITE)
  },
  addFovoriteVideo: (video: string) => {
    return http.post(`${URL_FAVORITE}`, { video })
  },
  removeFovoriteVideo: (video: string) => {
    return http.patch(`${URL_FAVORITE}`, { video })
  },
  getVideoFavoriteByChannel: (channelId: string) => {
    return http.get<SuccessResponse<favorite[]>>(`${URL_CHANNEL}/${channelId}/favoriteVideos`)
  }
}
export default favoriteApi
