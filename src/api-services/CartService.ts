import { PostAddToCart } from 'design-systems/Molecules/Card/interface'
import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
import axios from 'axios'
import { GetCartDataRes } from './interfaces/cart'
class CartService {
  getAllCarts = async (email: string) => {
    return CoreAPIService.get<GetCartDataRes[]>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PUBLIC.GET_CART}${email}/`
    )
  }
  postSingleCart = async (data: PostAddToCart) => {
    return CoreAPIService.post<PostAddToCart>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PUBLIC.GET_CART}${data?.email}/`,
      { product: data.product }
    )
  }
  removeSingleCart = async (id: number, email: string) => {
    return CoreAPIService.delete<PostAddToCart>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNT}${API_ENDPOINTS.PUBLIC.GET_CART}${email}/${id}/`,
      { product: id }
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CartService()
