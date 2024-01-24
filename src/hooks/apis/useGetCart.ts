import CartService from 'api-services/CartService'
import { useMutation, useQuery } from 'react-query'
import { API_ENDPOINTS } from 'utils/api-integration'

const fetchCartData = async (email?: string) => {
  if (!email) {
    return null
  }
  const response = await CartService.getAllCarts(email)
  return response
}

export const useGetCart = (email?: string, cartRef?: boolean) => {
  const {
    isLoading: isLoadingAllCart,
    data: cart,
    refetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_CART, email], () => fetchCartData(email), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled: (!!email && cartRef) || cartRef === undefined,
  })

  const deleteMutation = useMutation((itemId: number) => {
    try {
      const response = CartService.removeSingleCart(itemId, String(email))
      // toast.success('Product added to Cart')
      return response
    } catch (error) {
      // toast.error('Error')
      throw error
    }
  })

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteMutation.mutateAsync(itemId)
      console.log('Item deleted successfully')
    } catch (error) {
      throw error
    }
  }

  return {
    cart,
    isLoadingAllCart,
    refetch,
    handleDeleteItem,
  }
}
