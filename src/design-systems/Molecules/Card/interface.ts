import { LikedInfo } from 'api-services/interfaces/cart'
import { GetAllWishlistData } from 'design-systems/Templates/MyWishListTemplaate/wishlistt'
import { StaticImageData } from 'next/image'

export interface CardProps {
  item?: GetAllWishlistData
  onClick?: () => void
  navigate?: () => void
  status?: string
  categoriesName?: string
  id: number
  title: string
  categories: {
    categoryName: string
    id: number
  }[]
  like: LikedInfo
  isCart: boolean
  image?: string | StaticImageData | undefined
  price?: number
  symbol?: string
  updatedOn: string
  createDate: string
  component?: string
}
export interface PostAddToCart {
  email: string
  reference_key: string
  product: number
  quantity: number
}

export interface PostInterfaceProp {
  email: string
  message: string
  productUrl: string
}
