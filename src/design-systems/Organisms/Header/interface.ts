export interface itemProps {
  key: number
  title: string
  path: string
}

export interface HeaderProps {
  theme: string | undefined
  data: any
  router: string
  setTheme: (value: string) => void
  setSearchBar: (value: boolean) => void
  searchBar: boolean
  rout: any
  cart?: any
  token: string | null
}
