import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'Profile page',
  description: 'Profile Data',
}

export interface ProfileProps {
  children: React.ReactNode
}

const StoreLayout: React.FC<ProfileProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default StoreLayout
