import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'Exclusive page',
  description: 'Exclusive Data',
}

export interface ExclusiveProps {
  children: React.ReactNode
}

const ExclusiveLayout: React.FC<ExclusiveProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default ExclusiveLayout
