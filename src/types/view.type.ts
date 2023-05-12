import { Video } from './video.type'

export interface View {
  createdAt: string
  video: Video
  watchedTime: number
  _id: string
}

export interface FilterView {
  older: View[]
  thisMonth: View[]
  thisWeek: View[]
  today: View[]
  yesterday: View[]
}
