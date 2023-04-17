import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GET_PROFILE = 'api/v1/channels/me'
const URL_UPDATE_PROFILE = 'api/v1/channels/updateMe'
const profileApi = {
  getProfile: () => {
    return http.get<SuccessResponse<User>>(`${URL_GET_PROFILE}`)
  },
  updateProfle: (data: Omit<User, '_id'>) => {
    return http.patch<SuccessResponse<User>>(`${URL_UPDATE_PROFILE}`, data)
  }
}
export default profileApi
