import { StaticImageData } from 'next/image'

interface profileBlock {
  full_name: string
  portfolio: string
  bio: string
  profile_image: string | File | StaticImport
  cover_image: string | File | StaticImport
}

interface ProfileBlockResponse {
  id?: number
  full_name: string
  portfolio: string
  bio: string
  profile_image: string
  cover_image: string
}

export interface UserProfileResponse {
  id: number
  fullName: string
  portfolio: string
  bio: string
  profileImage: string
  coverImage: string
  createdOn: string
  updatedOn: string
  user: number
}
