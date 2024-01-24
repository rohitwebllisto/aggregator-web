import { useEffect, useRef, useState } from 'react'

import { Typography } from '../Typography'
import { DownArrow, DownArrowWhite } from '../Icons'
import { useTheme } from 'next-themes'

export const SortedDropDown = ({
  data,
  label,
  className,
  setSortValue,
  value,
  setValue,
  onClick,
}: SortedDropdownProps) => {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<null>(null)
  const sortedData: any[] = data?.sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    useEffect(() => {
      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
      }
    })
  }
  useOutsideClick(ref, () => {
    if (isOpen) setIsOpen(false)
  })
  return (
    <>
      <div className="relative">
        <button
          className={`${className} border-current bg-blue-500 focus:ring-blue-300 flex justify-between gap-x-5 border px-5 py-3 text-black focus:outline-none focus:ring dark:text-white xs:!h-[26px] sm:!h-[41px] xsm:!h-[50px]`}
          ref={ref}
          onClick={toggleDropdown}
        >
          {label && <Typography className="text-[16px] font-bold opacity-40">{label}</Typography>}
          <div className="flex items-center gap-x-2 xs:-mt-[11px] sm:mt-[-3px] xsm:mt-0">
            <Typography className="font-bold">{value}</Typography>
            <div className={`${isOpen && 'rotate-180'}  transform delay-200 ease-in-out`}>
              {theme === 'dark' ? <DownArrowWhite /> : <DownArrow />}
            </div>
          </div>
        </button>
        {isOpen && (
          <ul className="border-gray-300 absolute right-0 z-30 mt-3 w-full transform rounded border bg-white drop-shadow-xl delay-200 ease-in-out dark:bg-black2E">
            <li
              className="hover:bg-gray-100 cursor-pointer px-4 py-2 hover:bg-papayawhip hover:dark:bg-white225__03"
              onClick={() => {
                onClick && onClick('All Chain'),
                  setValue && setValue('All Chain'),
                  setIsOpen(false),
                  setSortValue && setSortValue(0)
              }}
            >
              All Chain
            </li>
            {sortedData.map((option: trandsResponse, key: number) => (
              <li
                className="hover:bg-gray-100 cursor-pointer px-4 py-2 hover:bg-papayawhip hover:dark:bg-white225__03"
                key={key}
                onClick={() => {
                  onClick && onClick(option.name),
                    setValue && setValue(option.name),
                    setIsOpen(false),
                    setSortValue && setSortValue(option.id)
                }}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
