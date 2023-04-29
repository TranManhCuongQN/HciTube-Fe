import { Video } from './video.type'

export interface favorite {
  channel: string
  createdAt: string
  id: string
  video: Video
  _id: string
}

export interface FavoriteItem {
  data: favorite[]
}
