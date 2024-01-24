import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import { LightSearchIcon, SearchIcon } from '../Icons'
import { useRouter } from 'next/navigation'
import { SearchProductType } from 'api-services/interfaces/home'
interface InputSearchBarType {
  iconsPosition: string
  className: string
  placeholder: string
  value: string
  filterData: SearchProductType[]
  disabled: boolean
  onChange: (value: string) => void
  onKeyDown: (event: { key: string }) => void
}
export const InputSearchBar = ({
  iconsPosition,
  className,
  placeholder,
  value,
  filterData,
  disabled,
  onChange,
  onKeyDown,
}: InputSearchBarType) => {
  const router = useRouter()
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<null>(null)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(true)
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
    <div className="relative grid gap-2">
      <div
        className={`${className} border-current flex w-[100%] items-center gap-x-4 rounded-none border-[1px] bg-white p-4 transition-transform duration-500 ease-in-out focus-within:border-2 dark:bg-black ${
          disabled ? `opacity-90` : `opacity-100`
        }`}
        ref={ref}
      >
        {iconsPosition === 'left' && <>{theme === 'dark' ? <LightSearchIcon /> : <SearchIcon />}</>}
        <input
          className="w-[100%]  focus-visible:outline-none dark:bg-black"
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={e => {
            onChange && onChange(e.target.value), handleInputChange(e)
          }}
          onKeyDown={e => {
            onKeyDown(e), setIsOpen(false)
          }}
        />
        {iconsPosition === 'right' && <>{theme === 'dark' ? <LightSearchIcon /> : <SearchIcon />}</>}
      </div>
      <div>
        {filterData.length > 0 && isOpen && (
          <ul className="border-gray-300 absolute z-30 mt-1  max-h-[200px] w-full transform overflow-auto rounded border bg-white drop-shadow-xl delay-200 ease-in-out dark:bg-black2E">
            {filterData.map(item => {
              const title = item?.title?.split('TokenID')
              return (
                <li
                  className={`cursor-pointer px-4 py-3 hover:bg-papayawhip`}
                  key={item.id}
                  onClick={() => {
                    router.push(`/store/store-details?id=${item?.id}`), setIsOpen(false)
                  }}
                >
                  {item.title.includes('TokenID') ? title[0] : item.title}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
