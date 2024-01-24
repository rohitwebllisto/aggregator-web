interface CartResponse {
  length: ReactNode
  cart: []
}
interface CartDataPost {
  id: number
}

export interface Category {
  categoryName: string
  id: number
}

export interface GetCartProduct {
  id: number
  category: Category[]
  creator: string
  isCart: boolean
  liked: LikedInfo
  totalLikes: number
  title: string
  image: string
  video: string
  svg: string
  description: string
  priceAmount: numbre
  priceSymbol: string
  creatorImage: string
  nftUrl: string
  createdOn: string
  updatedOn: string
  status: string
  isNew: boolean
  isMostPopular: boolean
  bestSeller: boolean
  isUpdated: boolean
  tradeChain: number
  source: number
  mainCategory: number
}

export interface GetCartDataRes {
  id: number
  product: number
  productDetails: GetCartProduct
  created_on: string
}

export interface LikedInfo {
  liked: boolean
  totalLikes: number
}

export interface ProductNFTItem {
  id: number
  category: Category[]
  creator: string
  isCart: boolean
  liked: LikedInfo
  totalLikes: number
  title: string
  image: string
  video: string
  svg: string
  description: string
  priceAmount: number
  priceSymbol: string
  creatorImage: string
  nftUrl: string
  createdOn: string
  updatedOn: string
  status: string
  isNew: boolean
  isMostPopular: boolean
  bestSeller: boolean
  isUpdated: boolean
  tradeChain: number
  source: string
  mainCategory: number
  viewCount: number
}

export interface GetProductNFTResponse {
  count: number
  numPages: number
  results: ProductNFTItem[]
}
