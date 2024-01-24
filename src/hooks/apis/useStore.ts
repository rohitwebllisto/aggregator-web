import { useQuery } from 'react-query'

import HomeServices from 'api-services/HomeServices'
import { API_ENDPOINTS } from 'utils/api-integration'
export const useStore = () => {
  const { isLoading: isLoadingCategories, data: categories } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_CATOGORIES],
    () => HomeServices.getAllCategories(),
    {
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  return {
    isLoadingCategories,
    categories,
  }
}
