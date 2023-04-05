export interface Video {
  _id: string
  thumbnail: string
  title: string
  createdAt: string
  views: number
  like: number
  comments: number
}

export interface ExtendedVideo extends Video {
  checked: boolean
  disabled: boolean
}
