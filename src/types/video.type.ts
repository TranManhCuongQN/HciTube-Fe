export interface Video {
  _id: string
  thumbnail: string
  title: string
  createdAt: string
  views: number
  like: number
  comments: number
  description: string
  video: string
  duration: string
  category: { _id: string; name: string; id: string }[]
  playList: string[]
}

export interface ExtendedVideo extends Video {
  checked: boolean
  disabled: boolean
}

export type UploadVideo = Omit<Video, 'createdAt' | 'views' | 'like' | 'comments' | '_id'>
