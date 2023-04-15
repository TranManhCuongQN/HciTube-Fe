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
}

export interface ExtendedVideo extends Video {
  checked: boolean
  disabled: boolean
}

export interface UploadVideo {
  title: string
  description: string
  thumbnail: string
  video: string
  category: string[]
  playList: string[]
  duration: string
}
