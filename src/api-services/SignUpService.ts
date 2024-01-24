import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
class SignUpService {
  postSignup = async (response: {}) => {
    return CoreAPIService.post<SignUpBlock>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PUBLIC.POST_USERS}/`,
      response
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new SignUpService()
