import { Subscriber } from './subscriber.type'

export interface User {
  _id: string
  fullName: string
  avatar: string
  description: string
  thumbnail: string
  subscribers?: User[]
  createdAt?: string
  id?: string
  followings?: User[]
  favoriteVideos?: []
  notification?: {
    channel: { avatar: string; id: string }
    createdAt: string
    seen: boolean
    _id: string
    video: { id: string; thumbnail: string; title: string }
  }[]
}

export interface UserProfile<User> {
  user: User
}
