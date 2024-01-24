import { GetCartDataRes } from 'api-services/interfaces/cart'

export interface User {
  id: number
  email: string
  referenceKey: string
  updatedOn: string
  createdOn: string
  status: boolean
}

export interface GetCollectionResType {
  id: number
  user: User
  nfts: GetCartProduct[]
  createdOn: string
}
export interface CollectionPropsType {
  collection?: GetCollectionResType[]
  wishlist?: GetCartProduct[]
  isLoadingAllCollection?: boolean
  isLoadingAllWishlist?: boolean
}
