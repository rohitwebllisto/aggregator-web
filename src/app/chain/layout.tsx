import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'Chain page',
  description: 'Chain Data',
}

export interface ChainProps {
  children: React.ReactNode
}

const ChainLayout: React.FC<ChainProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default ChainLayout
