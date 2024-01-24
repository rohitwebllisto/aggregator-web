import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
import { GetCartProduct, GetProductNFTResponse, ProductNFTItem } from './interfaces/cart'
import { AllCategory } from './interfaces/store'
import axios from 'axios'
import { CreatorInfo, FilterProductType, SearchProductType } from './interfaces/home'
class HomeService {
  getNewIn = async (email: string) => {
    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}/${API_ENDPOINTS.PUBLIC.GET_PRODUCTS_NEW_IN}&email=${email}`
    )
  }
  getPopular = async (email: string) => {
    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}/${API_ENDPOINTS.PUBLIC.GET_IS_MOST_POPULAR}&email=${email}`
    )
  }
  getBestSales = async (email: string) => {
    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}/${API_ENDPOINTS.PUBLIC.GET_BEST_SELLER}&email=${email}`
    )
  }
  getAllProduct = async (data: FilterProductType) => {
    const categoryId = data.categoryId != undefined ? data.categoryId : ''
    const sortBy = data.sortBy != undefined ? data.sortBy : ''
    const chain = data.chain != undefined ? data.chain : ''
    const searchQuery = data.searchQuery != undefined ? data.searchQuery : ''
    const filtertab = data.filtertab != undefined ? data.filtertab : ''
    return CoreAPIService.get<GetProductNFTResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS_FILTER}/?email=${data.email}&page=${data?.numPages}${categoryId}${filtertab}${chain}${sortBy}${searchQuery}`
    )
  }
  getProductById = async (ID: number, email: string) => {
    return CoreAPIService.get<ProductNFTItem>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}/${ID}/?email=${email}`
    )
  }
  getAllCategories = async () => {
    return CoreAPIService.get<AllCategory[]>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_CATOGORIES}/`
    )
  }
  getTrads = async () => {
    return CoreAPIService.get<trandsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_TRADS}/`
    )
  }
  getTopCategory = async () => {
    return CoreAPIService.get<any>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_TOP_CATEGORY}`
    )
  }
  getTopCourtor = async () => {
    return CoreAPIService.get<CreatorInfo[]>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_COURTOR}`
    )
  }
  getSearchInput = async (email: string, title?: string) => {
    return CoreAPIService.get<SearchProductType[]>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_SEARCH}/?title=${title}`
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new HomeService()
