export interface TypepographyProps {
  className?: string
  children: React.ReactNode
  variant?: TypographyVariant
  size?: TypographyRobotCondensedSize | TypographyRobotSize
  onClick?: () => void
  style?: object
}

export type TypographyRobotCondensedSize =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle'
  | 'paragraph'
  | 'body'
  | 'caption'
  | 'small'

export type TypographyRobotSize = 'sm' | 'md' | 'lg'

export type TypographyVariant = 'regular' | 'condensed'
