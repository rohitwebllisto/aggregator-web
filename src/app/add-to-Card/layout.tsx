import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export interface ChainProps {
  children: React.ReactNode
}
export const metadata: Metadata = {
  title: 'My Card page',
  description: 'My Card Data',
}

export interface AddCardProps {
  children: React.ReactNode
}

const AddCardLayout: React.FC<AddCardProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default AddCardLayout
