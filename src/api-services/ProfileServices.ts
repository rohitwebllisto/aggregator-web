import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
import { profileBlock, ProfileBlockResponse, UserProfileResponse } from './interfaces/profile'
class ProfileServices {
  postProfile = async (response: profileBlock) => {
    const Email = typeof window !== 'undefined' ? window.localStorage?.getItem('Email') : null
    return CoreAPIService.post<ProfileBlockResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PRIVATE.PROFILE}/${Email}/`,
      response
    )
  }
  updateProfile = async (response: profileBlock) => {
    const Email = typeof window !== 'undefined' ? window.localStorage?.getItem('Email') : null
    return CoreAPIService.patch<ProfileBlockResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PRIVATE.PROFILE}/${Email}/`,
      response
    )
  }
  getProfileById = async (email: string) => {
    return CoreAPIService.get<UserProfileResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PRIVATE.PROFILE}/${email}/`
    )
  }
  postSubscribe = async (email: string) => {
    return CoreAPIService.post<ProfileBlockResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PRIVATE.SUBSCRIBE}/`,
      { email: email }
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileServices()
