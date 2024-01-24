import WishlistService from 'api-services/WishlistService'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { API_ENDPOINTS } from 'utils/api-integration'

const fetchWishListData = async (email: string) => {
  if (!email) {
    return null
  }
  const response = await WishlistService.getAllWishlistProduct(email)
  return response
}

export const useGetWishlist = (email?: string, wishlistRef?: boolean) => {
  const {
    isLoading: isLoadingAllWishlist,
    data: wishlist,
    refetch: wishlistRefetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.WISHLIST, email], () => fetchWishListData(String(email)), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled: (!!email && wishlistRef) || wishlistRef === undefined,
  })

  return {
    wishlist,
    isLoadingAllWishlist,
    wishlistRefetch,
  }
}
