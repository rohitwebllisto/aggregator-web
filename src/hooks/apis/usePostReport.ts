import ReportService from 'api-services/ReportService'
import { PostInterfaceProp } from 'design-systems/Molecules/Card/interface'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

export const usePostReport = () => {
  const postMutation = useMutation((data: PostInterfaceProp) => {
    try {
      const response = ReportService.postReport(data)
      return response
    } catch (error) {
      throw error
    }
  })

  const postReport = async (data: PostInterfaceProp) => {
    try {
      const response = await postMutation.mutateAsync(data)

      return response
    } catch (error) {
      toast.error('Error')
      throw error
    }
  }
  return {
    isLoadingReport: postMutation.isLoading,
    postReport,
    result: postMutation.data,
    isError: postMutation.isError,
    isSuccessReport: postMutation.isSuccess,
  }
}
