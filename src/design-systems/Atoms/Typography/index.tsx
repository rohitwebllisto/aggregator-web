import { TypepographyProps } from './interface'
import { getFontSize } from './utils'

export const Typography: React.FC<TypepographyProps> = ({ className, children, size, variant, onClick, style }) => {
  const classNames = [variant && size && getFontSize(size), className].join(' ')
  return (
    <div className={`${classNames}`} onClick={onClick}>
      {children}
    </div>
  )
}
