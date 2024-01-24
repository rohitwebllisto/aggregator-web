interface FaqBlock {
  category: number
  category_name: string
  question: string
  answer: string
}
interface TeamsBlock {
  id: number
  name: string
  designation: string
  description: string
  linkedin_link: string
  twitter_link: string
}
interface TeamsProps {
  id: number
  name: string
  designation: string
  description: string
  linkedinLink: string
  twitterLink: string
}

interface DropBLock {
  label: string
  des: string
  TokensOffered: string
  Participants: string
  image: string
  Expire: string
  created_at: string
  updated_at: string
}
interface DropProps {
  label: string
  des: string
  tokensOffered: string
  participants: string
  image: string
  expire: string
  createdAt: string
  updatedAt: string
}
