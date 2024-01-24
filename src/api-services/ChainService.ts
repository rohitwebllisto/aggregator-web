import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
import { GetCartProduct, GetProductNFTResponse } from './interfaces/cart'
class ChainService {
  getAllChainsData = async (chain: string, email: string, pageNum: number) => {
    if (chain === 'Trending') {
      chain = 'All Chain'
    }

    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_TRADE_CHAIN}/${chain}/?email=${email}&page=${pageNum}`
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ChainService()
