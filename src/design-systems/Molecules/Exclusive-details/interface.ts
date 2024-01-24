import { ProductNFTItem } from 'api-services/interfaces/cart'

export interface ExclusiveDetailsTabsProps {
  theme: string | undefined
  ExclusiveData?: ProductNFTItem
  TeamsData?: TeamsBlock[]
  splitString?: string
  onClick?: () => void
  setAuth?: (value: boolean) => void
}
