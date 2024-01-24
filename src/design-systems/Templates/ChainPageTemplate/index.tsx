/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { ProductNFTItem } from 'api-services/interfaces/cart'
import { ImmutableX, EtherumIconLogo, FireIcons, HashLogoIcon, InfinityIconsLogo } from 'design-systems/Atoms/Icons'
import Pagination from 'design-systems/Atoms/Pagination'
import { PageClickEvent } from 'design-systems/Atoms/Pagination/interface'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { SortedDropDown } from 'design-systems/Atoms/SortedDropdown'
import { Typography } from 'design-systems/Atoms/Typography'
import { Card } from 'design-systems/Molecules/Card'
import { useChain } from 'hooks/apis/useChain'

const ChainPageTemplate: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [refetchChain, setRefetchChain] = useState({
    text: typeof searchParams.get('text') !== 'object' ? String(searchParams.get('text')) : 'Trending',
    chainRef: false,
    pageNum: 1,
  })
  const [value, setValue] = useState<string>(
    typeof searchParams.get('text') !== 'object'
      ? String(searchParams.get('text')) === 'New In'
        ? 'All Chain'
        : String(searchParams.get('text')) === 'Most popular'
        ? 'All Chain'
        : String(searchParams.get('text')) === 'Best Collection'
        ? 'All Chain'
        : String(searchParams.get('text'))
      : 'All Chain'
  )

  const {
    isLoadingNewIN,
    New_In,
    isLoadingPopular,
    popular,
    bestSeller,
    isLoadingBestSeller,
    allChain,
    isLoadingAllChain,
    allChainDataRes,
    isLoading,
    chainRefetch,
  } = useChain(refetchChain)
  const [chainData, setChainData] = useState<ProductNFTItem[]>([])
  const [sortValue, setSortValue] = useState<number>(0)
  const [itemOffset, setItemOffset] = useState(0)
  useMemo(() => {
    if (refetchChain?.text === 'New In' && New_In) {
      setChainData(New_In.results)
      setItemOffset(New_In.numPages)
    }
  }, [New_In, isLoadingNewIN])
  useMemo(() => {
    if (refetchChain?.text === 'Most popular' && popular) {
      setChainData(popular.results)
      setItemOffset(popular.numPages)
    }
  }, [popular, isLoadingPopular])
  useMemo(() => {
    if (refetchChain?.text === 'Best Collection' && bestSeller) {
      setChainData(bestSeller.results)
      setItemOffset(bestSeller.numPages)
    }
  }, [bestSeller, isLoadingBestSeller])

  useEffect(() => {
    if ((allChainDataRes?.results.length ?? 0) > 0) {
      setChainData(allChainDataRes?.results as ProductNFTItem[])
      setItemOffset(Number(allChainDataRes?.numPages))
    }
  }, [allChainDataRes, isLoading])

  const TrendingData = [
    { id: 2, icons: <InfinityIconsLogo />, name: 'Polygon' },
    { id: 7, icons: <ImmutableX />, name: 'Immutable X' },
    { id: 4, icons: <HashLogoIcon />, name: 'HBAR' },
    { id: 1, icons: <EtherumIconLogo />, name: 'ETH' },
  ]
  const IconsFilter = sortValue === 0 ? TrendingData : TrendingData.filter((value: any) => value.id === sortValue)
  const handlePageClick = (event: PageClickEvent) => {
    setRefetchChain({ ...refetchChain, pageNum: event?.selected + 1 })
  }

  const handleClick = async (value: string) => {
    if (value) {
      setItemOffset(0)
      const newSearchParams = new URLSearchParams()
      newSearchParams.set('text', value)
      router.push(`?${newSearchParams.toString()}`)
      setRefetchChain({
        text: value,
        chainRef: true,
        pageNum: 1,
      })
    }
  }
  const refetchApis = async () => {
    setRefetchChain({ ...refetchChain, chainRef: true })
    await chainRefetch()
  }
  return (
    <div className="container w-full">
      <div className="flex justify-between xs:block md:flex">
        <div className="flex justify-between gap-x-5">
          <div className="text-[32px] font-semibold">{!refetchChain?.text ? 'Trending' : refetchChain?.text}</div>
          <div className="flex flex-wrap  content-center">
            <FireIcons />
          </div>
        </div>
        <div className="flex justify-between gap-9 xs:gap-1 md:gap-5 lg:gap-9">
          {IconsFilter.map((item, key) => {
            return (
              <>
                <Typography
                  className="grid h-[50px] w-[50px] cursor-pointer content-center justify-center rounded-full bg-grayDE xs:!h-[26px] sm:!h-[41px] xsm:!h-[50px]"
                  key={key}
                  onClick={() => {
                    handleClick(item.name), setValue(item.name)
                  }}
                >
                  {item.icons}
                </Typography>
              </>
            )
          })}
          <SortedDropDown
            className={`!w-[166.72px] !justify-center`}
            data={allChain as any}
            setSortValue={setSortValue}
            value={value}
            setValue={setValue}
            onClick={e => handleClick(e)}
          />
        </div>
      </div>
      {!isLoadingAllChain && chainData.length > 0 ? (
        <>
          <div
            className={`mt-12 grid w-[100%] justify-items-center gap-6 ${
              chainData.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            } ${chainData.length === 1 && 'grid-cols-1'} ${chainData.length === 2 && 'md:grid-cols-2'}`}
          >
            {chainData?.map((item: ProductNFTItem, key: number) => {
              return (
                <div className="" key={key}>
                  <Card
                    id={item.id}
                    title={item.title}
                    categories={item.category}
                    like={item.liked}
                    image={item.image}
                    price={item.priceAmount}
                    symbol={item.priceSymbol}
                    isCart={item.isCart}
                    component={'Chains'}
                    updatedOn={item.updatedOn}
                    createDate={item.createdOn}
                    onClick={refetchApis}
                    navigate={() => router.push(`/store/store-details?id=${item?.id}`)}
                  />
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <Skeleton SkeletonType={'card'} limit={3} />
      )}

      {itemOffset > 1 && (
        <div>
          <Pagination pageCount={itemOffset} onPageChange={handlePageClick} />
        </div>
      )}
    </div>
  )
}

export default ChainPageTemplate
