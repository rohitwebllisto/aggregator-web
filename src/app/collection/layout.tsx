import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'My collection page',
  description: 'My Collection Data',
}

export interface CollectionProps {
  children: React.ReactNode
}

const CollectionLayout: React.FC<CollectionProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default CollectionLayout
