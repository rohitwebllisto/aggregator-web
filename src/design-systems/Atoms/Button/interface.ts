export interface ButtonProps {
  text: string
  className: string
  onClick?: () => void
  hover?: boolean
  outlineBorder?: boolean | null | undefined
  disabled?: boolean
}
