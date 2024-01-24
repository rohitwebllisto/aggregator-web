export const API_ENDPOINTS = {
  AUTH: {},
  PRIVATE: {
    PROFILE: 'profiles',
    SUBSCRIBE: 'subscribe',
    REPORT: 'product-report/',
  },
  PUBLIC: {
    GET_PRODUCTS: 'products',
    GET_PRODUCTS_FILTER: 'products/filter',
    GET_CATOGORIES: 'categories',
    GET_PRODUCTS_NEW_IN: '?is_new=True', //filter/?is_new=True
    GET_IS_MOST_POPULAR: '?is_most_popular=True', //filter/?is_most_popular=True
    GET_BEST_SELLER: '?best_seller=True',
    GET_ACTIVE: '?status=active',
    GET_PAST: '?status=past',
    GET_UPCOMING: '?status=upcoming',
    GET_FAQ: 'faqs',
    POST_USERS: 'users',
    GET_TEAMS: 'team',
    GET_DROP: 'drops',
    GET_TRADS: 'trade',
    GET_CART: 'cart/',
    GET_CHAIN: 'chain',
    GET_COLLECTION: 'collections',
    WISHLIST: 'like/',
    GET_TOP_CATEGORY: 'top-categories/',
    GET_TRADE_CHAIN: 'trade_chain',
    GET_COURTOR: 'courtor',
    GET_SEARCH: 'search',
  },
} as const

export const QUERIES = {
  AUTH: {},
  PRIVATE: {
    PROFILE: 'profiles',
  },
  PUBLIC: {
    GET_PRODUCTS: 'products',
    GET_CATOGORIES: 'categories',
    GET_PRODUCTS_NEW_IN: '?is_new=True', //filter/?is_new=True'
    GET_IS_MOST_POPULAR: '?is_most_popular=True', //filter/?is_most_popular=True
    GET_BEST_SELLER: '?best_seller=True',
    GET_ACTIVE: '?status=active',
    GET_PAST: '?status=past',
    GET_UPCOMING: '?status=upcoming',
    GET_FAQ: 'faqs',
    POST_USERS: 'users',
    GET_TEAMS: 'team',
    GET_DROP: 'drops',
    GET_TRADS: 'trade',
  },
} as const
