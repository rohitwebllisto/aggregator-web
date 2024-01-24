export interface ParentCategory {
  categoryName: string
  id: number
}

export interface AllCategory {
  id: number
  parent: ParentCategory[]
  name: string
  slug: string
  categoryImage: string
  isTop: boolean
  createdAt: string
  updatedAt: string
  mainCategory: number
}
