import { PostCollection } from 'hooks/apis/useCollection'
import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
import { CartResponse } from './interfaces/cart'
import { GetCollectionResType } from 'design-systems/Templates/MyCollectionPageTemplate/collection'
class CollectionService {
  getAllCollection = async (email: string) => {
    return CoreAPIService.get<GetCollectionResType[]>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PUBLIC.GET_COLLECTION}/?email=${email}`
    )
  }
  postCollection = async (data: PostCollection) => {
    return CoreAPIService.post<any>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PUBLIC.GET_COLLECTION}/`,
      { email: data.email }
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CollectionService()
