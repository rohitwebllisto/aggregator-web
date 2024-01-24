import { GetCartDataRes } from 'api-services/interfaces/cart'

export interface AddCardProps {
  data: GetCartDataRes[]
  onClick?: () => void
  isLoading?: boolean
  status?: string
}
