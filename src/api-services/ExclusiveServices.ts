/* eslint-disable import/no-anonymous-default-export */
import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
import { GetCartProduct, GetProductNFTResponse } from './interfaces/cart'
class ExclusiveServices {
  getActive = async (pageNumber: number, email: string) => {
    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}${API_ENDPOINTS.PUBLIC.GET_ACTIVE}&email=${email}&page=${pageNumber}`
    )
  }
  getUpcoming = async (pageNumber: number, email: string) => {
    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}${API_ENDPOINTS.PUBLIC.GET_UPCOMING}&email=${email}&page=${pageNumber}`
    )
  }
  getPast = async (pageNumber: number, email: string) => {
    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}${API_ENDPOINTS.PUBLIC.GET_PAST}&email=${email}&page=${pageNumber}`
    )
  }
  getFAQ = async () => {
    return CoreAPIService.get<FaqBlock>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_CHECKOUT}${API_ENDPOINTS.PUBLIC.GET_FAQ}`
    )
  }
  getDrop = async () => {
    return CoreAPIService.get<DropBLock>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_DROP}/`
    )
  }
  getTeams = async () => {
    return CoreAPIService.get<TeamsBlock>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PUBLIC.GET_TEAMS}`
    )
  }
}
export default new ExclusiveServices()
