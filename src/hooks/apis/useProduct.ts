import { useQuery } from 'react-query'

import HomeServices from 'api-services/HomeServices'
import { API_ENDPOINTS } from 'utils/api-integration'
import { FilterProductType } from 'api-services/interfaces/home'
import { useEffect } from 'react'
export const useProduct = (value: FilterProductType) => {
  const {
    isLoading: isLoadingAllProduct,
    data: product,
    refetch: productRefetch,
    error,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_PRODUCTS_FILTER, value], () => HomeServices.getAllProduct(value), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled: value?.refetchObj || value?.refetchObj === undefined || !!value?.numPages,
  })
  return {
    product,
    isLoadingAllProduct,
    productRefetch,
  }
}
