export interface GetAllWishlistData {
  id: number
  category: {
    categoryName: string
    id: number
  }[]
  creator: string
  is_cart: boolean
  liked: {
    liked: boolean
    total_likes: number
  }
  total_likes: number
  title: string
  image: string
  video: string
  svg: string
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
  is_updated: boolean
  trade_chain: number
  source: number
  main_category: number
}
