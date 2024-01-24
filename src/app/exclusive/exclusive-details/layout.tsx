import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'Exclusive Details page',
  description: 'Exclusive Details Data',
}

export interface ExclusiveDetailsProps {
  children: React.ReactNode
}

const StoreLayout: React.FC<ExclusiveDetailsProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default StoreLayout
