import { Subscriber } from './subscriber.type'

export interface User {
  _id: string
  fullName: string
  avatar: string
  description: string
  thumbnail: string
  subscribers: Subscriber[]
}

export interface UserProfile<User> {
  user: User
}
