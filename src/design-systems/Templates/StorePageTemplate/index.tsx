/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react'

import { InputSearchBar } from 'design-systems/Atoms/InputSearchBar'
import Pagination from 'design-systems/Atoms/Pagination'
import { PageClickEvent } from 'design-systems/Atoms/Pagination/interface'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import Tooltip from 'design-systems/Atoms/Tooltip'
import { TradingSortedDropDown } from 'design-systems/Atoms/TradingSortedDropDown'
import { Typography } from 'design-systems/Atoms/Typography'
import { Card } from 'design-systems/Molecules/Card'
import { StoreDataChain, StoreDatatabs, options } from 'design-systems/data/data'
import { useProduct } from 'hooks/apis/useProduct'
import { useStore } from 'hooks/apis/useStore'
import { AllCategory } from 'api-services/interfaces/store'
import { ProductNFTItem } from 'api-services/interfaces/cart'
import { FilterProductType, SearchProductType } from 'api-services/interfaces/home'
import { useSearch } from 'hooks/apis/useSearch'

export const StorePageTemplate: React.FC = () => {
  const searchParams = useSearchParams()
  const serachValue = searchParams.get('serach') || ''
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const [title, setTitle] = useState<string>(serachValue || '')
  const [filtervalue, setFilterValue] = useState<FilterProductType>({
    email: String(email),
    refetchObj: false,
    numPages: 1,
    searchQuery: `&searchQuery=${title}`,
  })
  const [stop, setStop] = useState(false)
  const { isLoadingSearch, searchPoduct } = useSearch(String(email), title)
  const { product, isLoadingAllProduct, productRefetch } = useProduct(filtervalue)
  const { categories, isLoadingCategories } = useStore()
  const [categoriesData, setCategoriesData] = useState<AllCategory[]>([])
  const [allproduct, setAllproduct] = useState<ProductNFTItem[]>([])
  const [basicActive, setBasicActive] = useState<string>('All')
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [categoriesName, setcategoriesName] = useState<string>('')
  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index)
    const categoryIdQueryParam: string = `&categoryId=${index}`
    const value = categoryIdQueryParam !== filtervalue.categoryId ? `&categoryId=${index}` : ''
    setFilterValue({ ...filtervalue, categoryId: value, numPages: 1 })
  }
  const router = useRouter()
  useEffect(() => {
    if (product) {
      setAllproduct(product.results)
    }
  }, [product])

  useMemo(() => {
    if (categories) {
      setCategoriesData(categories)
    }
  }, [categories, isLoadingCategories])
  useEffect(() => {
    if (filtervalue.numPages > 0) {
      productRefetch()
    }
  }, [filtervalue.numPages, productRefetch])

  useEffect(() => {
    if (!stop) {
      setTitle(serachValue)
      setFilterValue({ ...filtervalue, searchQuery: `&searchQuery=${serachValue}` })
    }
  }, [serachValue, stop])
  const handlePageClick = (event: PageClickEvent) => {
    setFilterValue({ ...filtervalue, numPages: event.selected + 1 })
  }
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return
    }
    setBasicActive(value)
    setFilterValue({ ...filtervalue, filtertab: `&filtertab=${value}`, numPages: 1 })
  }
  const handleSortBy = (value: string) => {
    setFilterValue({ ...filtervalue, sortBy: `&sortBy=${value}`, numPages: 1 })
  }
  const handleFilterByChain = (value: string) => {
    setFilterValue({ ...filtervalue, chain: `&chain=${value}`, numPages: 1 })
  }
  const handleChangeInputValue = (event: string) => {
    setTitle(event)
    if (serachValue) {
      setStop(true)
      const newSearchParams = new URLSearchParams()
      newSearchParams.set('serach', event)
      router.push(`?${newSearchParams.toString()}`)
    }
  }
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      setFilterValue({ ...filtervalue, searchQuery: `&searchQuery=${title}`, numPages: 1 })
    }
  }
  const refetchApis = async () => {
    setFilterValue({ ...filtervalue, refetchObj: true })
    await productRefetch()
  }
  return (
    <div className="container mt-10 grid w-full gap-y-11">
      <div className="grid justify-center gap-4  md:flex md:justify-between">
        <div className="flex  justify-center gap-x-10 md:mt-[42px] md:gap-x-20 xmd:mt-0 xmd:gap-x-10">
          <Typography className="cursor-pointer text-2xl font-bold">Filters</Typography>
          <Typography
            className="mt-2 w-[120px] cursor-pointer opacity-50"
            onClick={() => {
              handleClick(-1),
                setcategoriesName(''),
                setFilterValue({
                  email: String(email),
                  refetchObj: false,
                  numPages: 1,
                })
            }}
          >
            Clear filters
          </Typography>
        </div>
        <div className="grid justify-center gap-4  xmd:flex xmd:justify-between xlg:w-[76%] xl:w-[80%]">
          <div className="w-full xmd:w-[50%] xxlg:w-[53%] xl:w-[57%] xxl:w-[63%] xll:w-[66%]">
            <InputSearchBar
              className={'!px-4 !py-3'}
              disabled={isLoadingAllProduct}
              filterData={(searchPoduct as SearchProductType[]) || []}
              iconsPosition={'right'}
              placeholder={'Search...'}
              value={title}
              onChange={handleChangeInputValue}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="grid gap-x-4 gap-y-4 xsm:flex">
            <div className="w-full xsm:w-[165px]">
              <TradingSortedDropDown
                className={'w-full !justify-center xsm:max-w-full'}
                data={StoreDataChain}
                onClick={handleFilterByChain}
              />
            </div>
            <div className=" grid gap-y-3 xsm:justify-center ">
              <TradingSortedDropDown
                className={' w-full xsm:min-w-[215px] xsm:max-w-full'}
                data={options}
                label={'Sort By'}
                onClick={handleSortBy}
              />
              <div className="text-center text-[16px] font-bold">
                Showing {activeIndex === -1 ? allproduct.length : allproduct.length} Artworks
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block gap-x-5 gap-y-10 md:flex">
        <div className="mb-10 grid w-[100%] gap-y-10  md:h-[200px] md:w-[27%]">
          <div className="grid  gap-y-4 md:grid-cols-1">
            <div className="grid gap-y-5">
              <strong className="text-[21px]">Categories</strong>
              {isLoadingCategories ? (
                <Skeleton SkeletonType={'line'} className="grid !gap-y-4" limit={5} />
              ) : (
                <div
                  className={`grid-cols-auto-fit ${
                    categoriesData.length > 19 &&
                    `h-[500px] w-full overflow-auto ${allproduct.length <= 2 ? `md:min-h-full` : `md:h-[680px]`}`
                  } `}
                >
                  {categoriesData?.map((item: AllCategory, key: number) => {
                    return (
                      <div
                        className="flex gap-x-5"
                        key={key}
                        onClick={() => {
                          !isLoadingAllProduct && handleClick(item.id),
                            setBasicActive('All'),
                            setcategoriesName(activeIndex === item.id ? '' : item.name)
                          // setInputData('')
                        }}
                      >
                        <input
                          checked={activeIndex === item.id}
                          className="min-h-[20px] min-w-[20px] cursor-pointer  bg-black"
                          disabled={!isLoadingAllProduct && false}
                          name="catogery"
                          readOnly
                          type="checkbox"
                        />
                        {item.name.length > 30 ? (
                          <Tooltip text={item.name}>
                            <div
                              className={`${
                                activeIndex === item.id ? 'font-bold' : 'font-normal'
                              } w-[220px] cursor-pointer truncate`}
                            >
                              {item.name}
                            </div>
                          </Tooltip>
                        ) : (
                          <div
                            className={`${
                              activeIndex === item.id ? 'font-bold' : 'font-normal'
                            } w-[220px] cursor-pointer truncate`}
                          >
                            {item.name}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div></div>
          </div>
        </div>
        <div className={`w-full ${allproduct.length <= 3 && 'min-h-[700px]'}`}>
          <TETabs>
            {StoreDatatabs.map((item, key) => {
              return (
                <TETabsItem
                  active={basicActive === `${item.label}`}
                  className={`black:text-White255_60 p-4 !text-[20px] text-black5 hover:!bg-[#f1f1f1] xsm:!mr-[-2px] ${
                    basicActive === item.label &&
                    '!text-black dark:border-white dark:!text-white dark:hover:!text-black'
                  }`}
                  key={key}
                  onClick={() => handleBasicClick(item.label)}
                >
                  {item.label}
                </TETabsItem>
              )
            })}
          </TETabs>

          <TETabsContent className="mt-[40px]">
            {isLoadingAllProduct ? (
              <>
                <Skeleton SkeletonType={'card'} limit={6} />
              </>
            ) : (
              <>
                <TETabsPane
                  className={`grid w-[100%] justify-items-center gap-6  ${
                    allproduct.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  } ${allproduct.length === 1 && 'grid-cols-1 !justify-center'} ${
                    allproduct.length === 2 && 'md:grid-cols-1 lg:grid-cols-2'
                  } `}
                  show={
                    basicActive === '7 Days' ||
                    basicActive === 'Month' ||
                    basicActive === 'Years' ||
                    basicActive === 'All'
                  }
                >
                  {allproduct.length > 0 ? (
                    allproduct.map((item: ProductNFTItem, key: number) => {
                      return (
                        <div className="w-full" key={key}>
                          <div className="flex justify-center">
                            <div key={key}>
                              <Card
                                id={item.id}
                                title={item.title}
                                categories={item.category}
                                like={item.liked}
                                image={item.image}
                                price={item.priceAmount}
                                symbol={item.priceSymbol}
                                isCart={item.isCart}
                                component={'store'}
                                updatedOn={item.updatedOn}
                                createDate={item.createdOn}
                                categoriesName={categoriesName}
                                onClick={refetchApis}
                                navigate={() => router.push(`/store/store-details?id=${item?.id}`)}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <Typography className="mt-[75px] text-[48px] font-bold">Data Not Found</Typography>
                  )}
                </TETabsPane>
              </>
            )}
            {allproduct.length >= 9 && (
              <div>
                {basicActive === 'All' && (
                  <Pagination pageCount={Number(product?.numPages)} onPageChange={handlePageClick} />
                )}
                {basicActive === '7 Days' && (
                  <Pagination pageCount={Number(product?.numPages)} onPageChange={handlePageClick} />
                )}
                {basicActive === 'Month' && (
                  <Pagination pageCount={Number(product?.numPages)} onPageChange={handlePageClick} />
                )}
                {basicActive === 'Years' && (
                  <Pagination pageCount={Number(product?.numPages)} onPageChange={handlePageClick} />
                )}
              </div>
            )}
          </TETabsContent>
        </div>
      </div>
    </div>
  )
}
