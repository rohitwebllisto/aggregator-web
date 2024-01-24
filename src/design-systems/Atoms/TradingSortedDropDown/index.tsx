import { useEffect, useRef, useState } from 'react'

import { Typography } from '../Typography'
import { DownArrow, DownArrowWhite } from '../Icons'
import { useTheme } from 'next-themes'

export const TradingSortedDropDown = ({ data, label, className, onClick }: SortedDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(data[0].value)
  const ref = useRef<null>(null)
  const { theme } = useTheme()
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
          className={`${className} border-current bg-blue-500 focus:ring-blue-300 flex justify-between gap-x-5 border px-5 py-3 text-black focus:outline-none focus:ring dark:text-white`}
          ref={ref}
          onClick={toggleDropdown}
        >
          {label && <Typography className="text-[16px] font-bold opacity-40">{label}</Typography>}
          <div className="flex items-center gap-x-2">
            <Typography className="font-bold">{value}</Typography>
            <div className={`${isOpen && 'rotate-180'}  transform delay-200 ease-in-out`}>
              {theme === 'dark' ? <DownArrowWhite /> : <DownArrow />}
            </div>
          </div>
        </button>
        {isOpen && (
          <ul className="border-gray-300 absolute right-0 z-30 mt-3 w-full transform rounded border bg-white drop-shadow-xl delay-200 ease-in-out dark:bg-black2E">
            {data.map((option: { key: string; value: string }, key: number) => (
              <li
                className="hover:bg-gray-100 cursor-pointer px-4 py-2 hover:bg-papayawhip hover:dark:bg-white225__03"
                key={key}
                onClick={() => {
                  onClick && onClick(option.key), setValue(option.value), setIsOpen(false)
                }}
              >
                {option.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
