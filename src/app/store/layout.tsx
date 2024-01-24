import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'Store page',
  description: 'Store Data',
}

export interface StoreProps {
  children: React.ReactNode
}

const StoreLayout: React.FC<StoreProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default StoreLayout
