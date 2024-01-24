import { useQuery } from 'react-query'

import ExclusiveServices from 'api-services/ExclusiveServices'
import { API_ENDPOINTS } from 'utils/api-integration'

export const useExclusive = (data: { exclusiveRef: boolean; pageRef: string; pageNumber: number }) => {
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined

  const {
    isLoading: ActiveLoading,
    data: Active,
    refetch: activeRefetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_ACTIVE], () => ExclusiveServices.getActive(data.pageNumber, String(email)), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled:
      (data.exclusiveRef ||
        data.exclusiveRef === undefined ||
        (data.exclusiveRef && data.pageRef === 'Active') ||
        (data.exclusiveRef === undefined && data.pageRef === '') ||
        data.pageRef === '') &&
      !!data.pageNumber,
  })
  const {
    isLoading: UpcomingLoading,
    data: Upcoming,
    refetch: upcomingRefetch,
  } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_UPCOMING],
    () => ExclusiveServices.getUpcoming(data.pageNumber, String(email)),
    {
      select: res => res,
      refetchOnWindowFocus: false,
      enabled:
        (data.exclusiveRef ||
          data.exclusiveRef === undefined ||
          (data.exclusiveRef && data.pageRef === 'Upcoming') ||
          (data.exclusiveRef === undefined && data.pageRef === '') ||
          data.pageRef === '') &&
        !!data.pageNumber,
    }
  )
  const {
    isLoading: PastLoading,
    data: Past,
    refetch: pastRefetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_PAST], () => ExclusiveServices.getPast(data.pageNumber, String(email)), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled:
      (data.exclusiveRef ||
        data.exclusiveRef === undefined ||
        (data.exclusiveRef && data.pageRef === 'Past') ||
        (data.exclusiveRef === undefined && data.pageRef === '') ||
        data.pageRef === '') &&
      !!data.pageNumber,
  })
  const { isLoading: idLoadingDrop, data: Drop } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_DROP],
    () => ExclusiveServices.getDrop(),
    {
      select: res => res,
      refetchOnWindowFocus: false,
      enabled: data.exclusiveRef === undefined,
    }
  )
  return {
    ActiveLoading,
    Active,
    UpcomingLoading,
    Upcoming,
    Past,
    PastLoading,
    idLoadingDrop,
    Drop,
    activeRefetch,
    upcomingRefetch,
    pastRefetch,
  }
}
