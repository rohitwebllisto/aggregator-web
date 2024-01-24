import { StaticImageData } from 'next/image'

export interface TopCategoryProps {
  heading: string
  collection: number
  image: string | StaticImageData
}
