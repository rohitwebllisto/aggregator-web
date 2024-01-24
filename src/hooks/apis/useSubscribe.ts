import ProfileServices from 'api-services/ProfileServices'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

export const useSubscribe = () => {
  const postSubscribeMutation = useMutation((email: string) => {
    return ProfileServices.postSubscribe(email)
  })

  const postSubscribe = async (email: string) => {
    try {
      const response: any = await postSubscribeMutation.mutateAsync(email)
      toast.success(response.message)
      return response
    } catch (error: any) {
      toast.error(error.response.data.email[0])
      throw error
    }
  }
  return {
    isLoading: postSubscribeMutation.isLoading,
    postSubscribe,
    error: postSubscribeMutation.error,
  }
}
