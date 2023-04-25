import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_SUBSCRIBER = '/api/v1/subscribers'
export const subscriberApi = {
  subscribeChannel: (data: { channel: string }) => {
    return http.post(URL_SUBSCRIBER, data)
  },
  deleteSubscribeChannel: (data: { channel: string }) => {
    return http.patch(URL_SUBSCRIBER, data)
  }
}
