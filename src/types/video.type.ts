import { User } from './user.type'
import { View } from './view.type'

export interface Video {
  _id?: string
  thumbnail?: string
  title?: string
  createdAt?: string
  view?: number
  like?: []
  comments?: []
  description?: string
  video?: string
  duration?: string
  category?: string[]
  playList?: string[]
  dislike?: []
  watchTime?: number
  channel?: User
}

export interface VideoItem {
  video: Video
  view: View
}

export interface ExtendedVideo extends Video {
  checked: boolean
  disabled: boolean
}

export type UploadVideo = Omit<Video, 'createdAt' | 'views' | 'like' | 'comments' | '_id'>
