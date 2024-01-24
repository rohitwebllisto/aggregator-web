'use client'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import { DesktopHeader } from './desktopHeader'
import { MobileHeader } from './mobileHeader'

import { LightSearchIcon, SearchIcon } from 'design-systems/Atoms/Icons'
import { InputSearchBar } from 'design-systems/Atoms/InputSearchBar'
import { useGetCart } from 'hooks/apis/useGetCart'
import { SearchProductType } from 'api-services/interfaces/home'
import { useSearch } from 'hooks/apis/useSearch'
import useMagicRedirect from 'api-services/magicRedirect'

const Header: React.FC = () => {
  const { tokens } = useMagicRedirect()

  const storedEmail = typeof window !== 'undefined' ? window.localStorage?.getItem('Email') : null
  const email = storedEmail !== null ? storedEmail : ''
  const ref = useRef<null>(null)
  const [searchBar, setSearchBar] = useState<boolean>(false)
  const [cartData, setCartData] = useState<any>([])
  const router = usePathname()
  const rout = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const { cart, isLoadingAllCart } = useGetCart(email)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [title, setTitle] = useState('')
  const { isLoadingSearch, searchPoduct } = useSearch(String(email), title)
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
  const tokenLocal = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
  useMemo(() => {
    setToken(tokenLocal)
  }, [tokenLocal])
  useOutsideClick(ref, () => {
    if (searchBar) setSearchBar(false)
  })
  const data = [
    { key: 0, title: 'Home', path: '/' },
    { key: 1, title: 'Store', path: '/store' },
    { key: 2, title: 'Exclusive', path: '/exclusive' },
    { key: 3, title: 'Chain', path: '/chain' },
    { key: 4, title: 'My Collection', path: '/collection' },
  ]
  useMemo(() => {
    if (token !== null) {
      setCartData(cart)
    }
  }, [token, cart, isLoadingAllCart])
  const handleChangeInputValue = (event: string) => {
    setIsOpen(true)
    setTitle(event)
  }
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      rout.push(`/store/?serach=${title}`)
      setSearchBar(false)
      // setFilterValue({ ...filtervalue, searchQuery: `&searchQuery=${title}`, numPages: 1 })
    }
  }
  return (
    <header className="container fixed z-[100] py-5 backdrop-blur-md">
      <div className=" hidden md:flex">
        <DesktopHeader
          data={data}
          rout={rout}
          router={router}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          setTheme={setTheme}
          theme={theme}
          cart={cartData}
          token={token}
        />
      </div>
      <div className="">
        <MobileHeader
          data={data}
          rout={rout}
          router={router}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          setTheme={setTheme}
          theme={theme}
          cart={cartData}
          token={token}
        />
      </div>
      {searchBar && (
        <div className="absolute left-0 top-0 h-[100vh] w-[100%] overflow-y-hidden bg-transparentPapayawhip p-6 dark:bg-darkTransparentPapayawhip">
          <div className="relative grid gap-2">
            <div
              className=" searchShadow flex w-[100%] items-center gap-x-4 rounded-[10px] bg-white p-4 transition-transform duration-500 ease-in-out dark:bg-black"
              ref={ref}
            >
              {theme === 'dark' ? <LightSearchIcon /> : <SearchIcon />}

              <input
                className="w-[100%]  focus-visible:outline-none dark:bg-black"
                // disabled={isLoadingSearch}
                placeholder={'Search...'}
                onChange={e => {
                  handleChangeInputValue(e.target.value)
                }}
                onKeyDown={e => {
                  handleKeyDown(e), setIsOpen(false)
                }}
              />
            </div>
            <div>
              {(searchPoduct?.length ?? 0) > 0 && isOpen && (
                <ul
                  className={`border-gray-300 absolute z-30 mt-1  max-h-[${
                    46 * (searchPoduct?.length ?? 0)
                  }px] w-full transform overflow-auto rounded border bg-white drop-shadow-xl delay-200 ease-in-out dark:bg-black2E`}
                >
                  {searchPoduct?.map(item => {
                    const title = item?.title?.split('TokenID')
                    return (
                      <li
                        className={`cursor-pointer px-4 py-3 hover:bg-papayawhip`}
                        key={item.id}
                        onClick={() => {
                          rout.push(`/store/store-details?id=${item?.id}`), setIsOpen(false), setSearchBar(false)
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
        </div>
      )}
    </header>
  )
}

export default Header
