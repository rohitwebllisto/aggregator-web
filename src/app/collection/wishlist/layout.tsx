import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'My Wishlist Data',
}

export interface WishListProps {
  children: React.ReactNode
}

const WishListLayout: React.FC<WishListProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default WishListLayout
