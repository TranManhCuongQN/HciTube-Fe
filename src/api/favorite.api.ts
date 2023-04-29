import { favorite, FavoriteItem } from 'src/types/favorite.type'
import http from 'src/utils/http'

const URL_FAVORITE = '/api/v1/favoriteVideos'
const favoriteApi = {
  getFavoriteVideos: () => {
    return http.get<FavoriteItem>(URL_FAVORITE)
  },
  addFovoriteVideo: (video: string) => {
    return http.post(`${URL_FAVORITE}`, { video })
  },
  removeFovoriteVideo: (video: string) => {
    return http.patch(`${URL_FAVORITE}`, { video })
  }
}
export default favoriteApi
