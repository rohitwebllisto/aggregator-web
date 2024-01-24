import { useQuery } from 'react-query'

import ExclusiveServices from 'api-services/ExclusiveServices'
import { API_ENDPOINTS } from 'utils/api-integration'

export const useExclisiveDetails = () => {
  const { isLoading: FaqLoading, data: FaqData } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_FAQ],
    () => ExclusiveServices.getFAQ(),
    {
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  const { isLoading: isLoadingTeams, data: teamData } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_TEAMS],
    () => ExclusiveServices.getTeams(),
    {
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  return {
    FaqLoading,
    FaqData,
    isLoadingTeams,
    teamData,
  }
}
