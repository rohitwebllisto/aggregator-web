import { useQuery } from 'react-query'

import HomeServices from 'api-services/HomeServices'
import { API_ENDPOINTS } from 'utils/api-integration'
export const useProductById = (ID: number) => {
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined

  const {
    isLoading: isLoadingProductID,
    data: productID,
    refetch: refetchProductById,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_PRODUCTS, ID], () => HomeServices.getProductById(ID, String(email)), {
    select: res => res,
    refetchOnWindowFocus: false,
  })
  return {
    isLoadingProductID,
    productID,
    refetchProductById,
  }
}
