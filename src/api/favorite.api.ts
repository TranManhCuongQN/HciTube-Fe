import http from 'src/utils/http'

const URL_FAVORITE = '/api/v1/favoriteVideos'
export const favoriteApi = {
  getFavoriteVideos: () => {
    return http.get(URL_FAVORITE)
  },
  addFovoriteVideo: (idVideo: string) => {
    return http.post(`${URL_FAVORITE}/${idVideo}`)
  },
  removeFovoriteVideo: (idVideo: string) => {
    return http.delete(`${URL_FAVORITE}/${idVideo}`)
  }
}
