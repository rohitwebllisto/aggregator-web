import WishlistService from 'api-services/WishlistService'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

export const useWishlist = () => {
  const postWishlistMutation = useMutation(async (data: { id: number; email: string }) => {
    try {
      const response = await WishlistService.postSingleCartForWishlist(data)
      toast.success(response.detail)
      return response
    } catch (error) {
      toast.error('Error')
      throw error
    }
  })

  const postWishlist = async (id: number, email: string) => {
    try {
      const response = await postWishlistMutation.mutateAsync({ id: id, email: email })
      // await refetch()
      return response
    } catch (error) {
      toast.error('Error')
      throw error
    }
  }

  return {
    isLoading: postWishlistMutation.isLoading,
    postWishlist,
    error: postWishlistMutation.error,
  }
}
