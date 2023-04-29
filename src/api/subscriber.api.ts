import { User, UserProfile } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_SUBSCRIBER = '/api/v1/subscribers'
export const subscriberApi = {
  subscribeChannel: (data: { channel: string }) => {
    return http.post<SuccessResponse<UserProfile<User>>>(URL_SUBSCRIBER, data)
  },
  deleteSubscribeChannel: (data: { channel: string }) => {
    return http.patch<SuccessResponse<UserProfile<User>>>(URL_SUBSCRIBER, data)
  }
}
