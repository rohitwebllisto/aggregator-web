import { StaticImageData } from 'next/image'

export interface GalleryProps {
  className: string
  data: any
}
export interface dataProps {
  map(arg0: (item: dataProps, key: number) => import('react').JSX.Element): import('react').ReactNode
  key: number
  categoryName: string
  total: string
  collection: string
  image: StaticImageData
}
