import { PostAddToCart } from 'design-systems/Molecules/Card/interface'
import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS } from 'utils/api-integration'
import axios from 'axios'
import { GetAllWishlistData } from 'design-systems/Templates/MyWishListTemplaate/wishlistt'
import { GetCartProduct } from './interfaces/cart'
class WishlistService {
  getAllWishlistProduct = async (email: string) => {
    return CoreAPIService.get<GetCartProduct[]>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}/${API_ENDPOINTS.PUBLIC.WISHLIST}?email=${email}`
    )
  }
  postSingleCartForWishlist = async (data: { id: number; email: string }) => {
    return CoreAPIService.post<{ detail: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_NFTS}${API_ENDPOINTS.PUBLIC.GET_PRODUCTS}/${data.id}/${API_ENDPOINTS.PUBLIC.WISHLIST}?email=${data.email}`
    )
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new WishlistService()
