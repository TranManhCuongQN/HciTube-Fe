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
}

export interface UserProfile<User> {
  user: User
}
