import axios from 'axios'
import { SuccessResponse } from 'src/types/utils.type'

const URL_PLAYLIST = '/api/v1/playlists'
const playListAPI = {
  getPlayList: () => {
    return axios.get<SuccessResponse<{ _id: string; title: string }[]>>(`${URL_PLAYLIST}`)
  }
}

export default playListAPI
