interface SortedDropdownProps {
  data: any[]
  label?: string
  className?: string
  setSortValue?: (value: number) => void | undefined
  onClick?: (value: string) => void
  setValue?: (value: string) => void | undefined
  value?: string
}
