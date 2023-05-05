export interface QueryConfig {
  keyword?: string
  category?: string
  duration_min?: string
  duration_max?: string
  timeRange?: 'today' | 'thisWeek' | 'thisMonth' | 'thisYear'
  sortBy?: 'createdAt' | 'view'
  playList?: string
}
