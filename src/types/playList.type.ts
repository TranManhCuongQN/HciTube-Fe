import { User } from './user.type'
import { Video } from './video.type'

export interface playList {
  id: string
  title: string
  description: string
  createAt?: string
  channel?: User
  videos?: Video[]
  _id: string
}
