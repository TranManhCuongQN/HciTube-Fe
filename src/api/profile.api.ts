import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GET_PROFILE = 'api/v1/channels/me'
const profileApi = {
  getProfile: () => {
    return http.get<SuccessResponse<''>>(`${URL_GET_PROFILE}`)
  }
}
export default profileApi
