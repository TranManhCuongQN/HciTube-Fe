import { Video } from './video.type'

export interface following {
  older: Video[]
  thisMonth: Video[]
  thisWeek: Video[]
  today: Video[]
  yesterday: Video[]
}
