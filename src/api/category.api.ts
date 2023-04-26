import axios from 'axios'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_CATEGORY = '/api/v1/categories'
const categoryAPI = {
  getCategories: () => {
    return http.get<SuccessResponse<{ _id: string; name: string }[]>>(`${URL_CATEGORY}`)
  }
}
export default categoryAPI
