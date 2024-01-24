/* eslint-disable no-useless-catch */
import { useMutation } from 'react-query'

import ProfileServices from 'api-services/ProfileServices'
import { profileBlock } from 'api-services/interfaces/profile'

export const useProfile = () => {
  const postProfileMutation = useMutation((profile: profileBlock) => {
    return ProfileServices.postProfile(profile)
  })

  const postProfile = async (profile: profileBlock) => {
    try {
      const response: any = await postProfileMutation.mutateAsync(profile)
      localStorage.setItem('userProfileId', String(response?.id))
      return response
    } catch (error) {
      throw error
    }
  }
  const updateProfileMutation = useMutation((profile: profileBlock) => {
    return ProfileServices.updateProfile(profile)
  })

  const updateProfile = async (profile: profileBlock) => {
    try {
      const response: any = await updateProfileMutation.mutateAsync(profile)
      localStorage.setItem('userProfileId', String(response?.id))
      return response
    } catch (error) {
      throw error
    }
  }
  return {
    isLoading: postProfileMutation.isLoading,
    postProfile,
    error: postProfileMutation.error,
    updateProfile,
    isUpdateLoading: updateProfileMutation.isLoading,
    errorUpdate: updateProfileMutation.error,
  }
}
