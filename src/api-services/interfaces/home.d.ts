interface HomeListResponse {
  data: HomeBlock[]
  // message: string
  // success: boolean
}

interface HomeBlock {
  id: number
  creator: string
  title: string
  image: string
  video: null
  svg: null
  description: string
  price: string
  creator_image: string
  nft_url: string
  created_on: string
  updated_on: string
  status: string
  is_new: boolean
  is_most_popular: boolean
  best_seller: boolean
  trade_chain: number
  source: number
  upcommingDate: string
  pastDate: string
  category: ProductBlock[]
}
interface StoreFilterBlock {
  bestSeller: boolean
  category: ProductBlock[]
  createdOn: string
  creator: string
  creatorImage: string
  description: string
  id: number
  image: string
  isMostPopular: boolean
  isNew: boolean
  nftUrl: string
  price: string | undefined
  source: null
  status: string
  svg: null
  title: string
  tradeChain: null
  updatedOn: string
  video: null
}

interface ProductBlock {
  categoryName: string
  id: number
}

export interface CreatorInfo {
  creator: string
  creatorImage: string
  productCount: number
}

export interface FilterProductType {
  email: string
  refetchObj: boolean
  numPages: number
  categoryId?: string
  sortBy?: string
  filtertab?: string
  chain?: string
  searchQuery?: string
}

export interface SearchProductType {
  id: number
  title: string
}
