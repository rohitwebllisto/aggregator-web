export interface HomePageTemplateProps {
  homeProducts: any[]
  isLoadingHome: boolean
}

export interface TopCategoryProduct {
  title: string
}

export interface TopCategory {
  id: number
  name: string
  category_image: string
  categoryImage: string
  products: {
    length: number
    data: TopCategoryProduct[]
  }
}
