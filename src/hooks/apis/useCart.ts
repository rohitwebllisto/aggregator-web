import CartService from 'api-services/CartService'
import { PostAddToCart } from 'design-systems/Molecules/Card/interface'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

export const useCart = (email?: string) => {
  const postCartMutation = useMutation((data: PostAddToCart) => {
    try {
      const response = CartService.postSingleCart(data)
      toast.success('Product added to Cart')
      return response
    } catch (error) {
      toast.error('Error')
      throw error
    }
  })

  const postCart = async (data: PostAddToCart) => {
    try {
      const response = await postCartMutation.mutateAsync(data)

      return response
    } catch (error) {
      toast.error('Error')
      throw error
    }
  }

  return {
    isLoading: postCartMutation.isLoading,
    postCart,
    error: postCartMutation.error,
  }
}
