import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'Store Details page',
  description: 'Store Details Data',
}

export interface StoreDetailsProps {
  children: React.ReactNode
}

const StoreDetailLayout: React.FC<StoreDetailsProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default StoreDetailLayout
