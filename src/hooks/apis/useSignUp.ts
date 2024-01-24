import { useQuery } from 'react-query'

import SignUpService from 'api-services/SignUpService'
import { API_ENDPOINTS } from 'utils/api-integration'
import { useMutation } from 'react-query'
import { SignUpResponseType } from 'design-systems/Molecules/Model/sign-up/SignUp'

export const useSignUp = () => {
  // const { email, reference_key } = response
  // const { isLoading: isSignUpLoading, data: SignUp } = useQuery(
  //   [API_ENDPOINTS.PUBLIC.POST_USERS, ...Object.values(response)],
  //   () => SignUpService.postSignup(response),
  //   {
  //     select: res => res,
  //     enabled: Boolean(reference_key),
  //     refetchOnWindowFocus: false,
  //   }
  // )
  const postProfileMutation = useMutation((response: {}) => {
    return SignUpService.postSignup(response)
  })

  const postSignData = async (profile: {}) => {
    try {
      const response: any = await postProfileMutation.mutateAsync(profile)
      localStorage.setItem('UserId', String(response.id))
      return response
    } catch (error) {
      throw error
    }
  }
  return {
    isSignUpLoading: postProfileMutation.isLoading,
    postSignData,
    SignUp: postProfileMutation.data,
  }
}
