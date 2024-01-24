import { Metadata } from 'next'
import { Suspense } from 'react'

import { Loader } from 'design-systems/Atoms/Loader'

export const metadata: Metadata = {
  title: 'Contact page',
  description: 'Contact Data',
}

export interface ContactProps {
  children: React.ReactNode
}

const ContactLayout: React.FC<ContactProps> = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default ContactLayout
