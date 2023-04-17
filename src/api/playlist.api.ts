import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_PLAYLIST = '/api/v1/playlists'
const playListAPI = {
  getPlayList: () => {
    return http.get<SuccessResponse<{ _id: string; title: string; id: string }[]>>(`${URL_PLAYLIST}`)
  }
}

export default playListAPI
