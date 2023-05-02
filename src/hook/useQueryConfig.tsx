import { isUndefined, omitBy } from 'lodash'
import { QueryConfig } from 'src/types/QueryConfig.type'
import useQueryParams from './useQueryParams'

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      category: queryParams.category,
      keyword: queryParams.keyword,
      duration_min: queryParams.duration_min,
      duration_max: queryParams.duration_max,
      timeRange: queryParams.timeRange,
      sortBy: queryParams.sortBy
    },
    isUndefined
  )
  return queryConfig
}

export default useQueryConfig
