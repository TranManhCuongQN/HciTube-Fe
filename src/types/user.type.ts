import { Subscriber } from './subscriber.type'

export interface User {
  _id: string
  fullName: string
  avatar: string
  description: string
  thumbnail: string
  subscribers?: Subscriber[]
  createdAt?: string
  id?: string
}

export interface UserProfile<User> {
  user: User
}
