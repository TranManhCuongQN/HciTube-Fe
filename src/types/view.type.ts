import { Video } from './video.type'

export interface View {
  createdAt: string
  video: Video
  watchedTime: number
  _id: string
}
