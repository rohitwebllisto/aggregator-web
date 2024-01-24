import { PostAddToCart, PostInterfaceProp } from 'design-systems/Molecules/Card/interface'
import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
class ReportService {
  postReport = async (data: PostInterfaceProp) => {
    return CoreAPIService.post<any>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PRIVATE.REPORT}`,
      data
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ReportService()
