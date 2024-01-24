import { useQuery } from 'react-query'

import HomeServices from 'api-services/HomeServices'
import { API_ENDPOINTS } from 'utils/api-integration'
import ChainService from 'api-services/ChainService'
import { useMemo } from 'react'
export const useChain = (data: { text: string; chainRef?: boolean; pageNum: number }) => {
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined

  const { isLoading: isLoadingNewIN, data: New_In } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_PRODUCTS_NEW_IN],
    () => HomeServices.getNewIn(String(email)),
    {
      enabled: data?.text === 'New In',
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  const { isLoading: isLoadingPopular, data: popular } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_IS_MOST_POPULAR],
    () => HomeServices.getPopular(String(email)),
    {
      enabled: data?.text === 'Most popular',
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  const { isLoading: isLoadingBestSeller, data: bestSeller } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_BEST_SELLER],
    () => HomeServices.getBestSales(String(email)),
    {
      enabled: data?.text === 'Best Collection',
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  const { isLoading: isLoadingAllChain, data: allChain } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_TRADS],
    () => HomeServices.getTrads(),
    {
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  const shouldFetchData =
    data?.text === 'ETH' ||
    data?.text === 'HBAR' ||
    data?.text === 'Immutable X' ||
    data?.text === 'Other' ||
    data?.text === 'Polygon' ||
    data?.text === 'All Chain' ||
    data?.text === 'Trending'

  const {
    isLoading: isLoading,
    data: allChainDataRes,
    refetch: chainRefetch,
  } = useQuery(
    [API_ENDPOINTS.PUBLIC.GET_TRADE_CHAIN, data],
    () => ChainService.getAllChainsData(data?.text, String(email), data.pageNum),
    {
      select: res => res,
      refetchOnWindowFocus: false,
      enabled: !!shouldFetchData,
    }
  )
  return {
    isLoadingNewIN,
    New_In,
    isLoadingPopular,
    popular,
    bestSeller,
    isLoadingBestSeller,
    isLoadingAllChain,
    allChain,
    isLoading,
    allChainDataRes,
    chainRefetch,
  }
}
