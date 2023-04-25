import { Comment } from 'src/types/comment.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
const URL_COMMENT = 'api/v1/videos'
const URL_CREATE_COMMENT = 'api/v1/comments'

export const commentApi = {
  getComment: (idVideo: string) => {
    return http.get<SuccessResponse<Comment[]>>(`${URL_COMMENT}/${idVideo}/comments`)
  },
  createComment: (data: { video: string; comment: string; parent?: string }) => {
    return http.post<SuccessResponse<Comment>>(`${URL_CREATE_COMMENT}`, data)
  },
  editComment: (idComment: string, body: { comment: string }) => {
    return http.patch<SuccessResponse<Comment>>(`${URL_CREATE_COMMENT}/${idComment}`, body)
  },
  deleteComment: (idComment: string) => {
    return http.delete<SuccessResponse<Comment>>(`${URL_CREATE_COMMENT}/${idComment}`)
  },
  setAction: (data: { action: string; comment: string }) => {
    return http.patch(`${URL_CREATE_COMMENT}/action`, data)
  }
}
