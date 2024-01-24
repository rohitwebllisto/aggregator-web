import HomeServices from 'api-services/HomeServices'
import { useQuery } from 'react-query'
import { API_ENDPOINTS } from 'utils/api-integration'

export const useSearch = (email?: string, title?: string) => {
  const { isLoading: isLoadingSearch, data: searchPoduct } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_SEARCH, title],
    () => HomeServices.getSearchInput(String(email), title),
    {
      select: res => res,
      refetchOnWindowFocus: false,
      enabled: !!title,
    }
  )

  return {
    isLoadingSearch,
    searchPoduct,
  }
}
