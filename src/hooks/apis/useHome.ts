import { useQuery } from 'react-query'

import HomeServices from 'api-services/HomeServices'
import { API_ENDPOINTS } from 'utils/api-integration'

export const useHome = (email?: string, homeRef?: boolean, pageRef?: string) => {
  const {
    isLoading: isLoadingNewIN,
    data: New_In,
    refetch: isNewRefetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_PRODUCTS_NEW_IN], () => HomeServices.getNewIn(String(email)), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled:
      homeRef ||
      homeRef === undefined ||
      (homeRef && pageRef === 'isNew') ||
      (homeRef === undefined && pageRef === '') ||
      pageRef === '',
  })
  const {
    isLoading: isLoadingPopular,
    data: popular,
    refetch: popularRefetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_IS_MOST_POPULAR], () => HomeServices.getPopular(String(email)), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled:
      homeRef ||
      homeRef === undefined ||
      (homeRef && pageRef === 'popular') ||
      (homeRef === undefined && pageRef === '') ||
      pageRef === '',
  })
  const {
    isLoading: isLoadingBestSeller,
    data: bestSeller,
    refetch: bestSellerRefetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_BEST_SELLER], () => HomeServices.getBestSales(String(email)), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled:
      homeRef ||
      homeRef === undefined ||
      (homeRef && pageRef === 'bestSeller') ||
      (homeRef === undefined && pageRef === '') ||
      pageRef === '',
  })
  const { isLoading: isLoadingTopCategory, data: topCategory } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_TOP_CATEGORY],
    () => HomeServices.getTopCategory(),
    {
      select: res => res,
      refetchOnWindowFocus: false,
      enabled: homeRef === false,
    }
  )
  const { isLoading: isLoadingTopsCourtor, data: topCourtor } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_COURTOR],
    () => HomeServices.getTopCourtor(),
    {
      select: res => res,
      refetchOnWindowFocus: false,
      enabled: homeRef === false,
    }
  )
  return {
    isLoadingNewIN,
    New_In,
    isLoadingPopular,
    popular,
    bestSeller,
    isLoadingBestSeller,
    isLoadingTopCategory,
    topCategory,
    isNewRefetch,
    popularRefetch,
    bestSellerRefetch,
    isLoadingTopsCourtor,
    topCourtor,
  }
}
