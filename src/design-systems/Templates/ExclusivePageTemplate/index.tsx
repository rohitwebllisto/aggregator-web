/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import moment from 'moment'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react'

import { IMG } from 'assets/images'
import { Button } from 'design-systems/Atoms/Button'
import { CountDown } from 'design-systems/Atoms/CountDown'
import { BellIcons, LightBellIcons } from 'design-systems/Atoms/Icons'
import Pagination from 'design-systems/Atoms/Pagination'
import { PageClickEvent } from 'design-systems/Atoms/Pagination/interface'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { Typography } from 'design-systems/Atoms/Typography'
import { Card } from 'design-systems/Molecules/Card'
import { ExclusiveTab } from 'design-systems/data/data'
import { useExclusive } from 'hooks/apis/useExclusive'
import { ProductNFTItem } from 'api-services/interfaces/cart'

const ExclusivePageTemplate: React.FC = () => {
  const [itemOffset, setItemOffset] = useState(1)
  const [basicActive, setBasicActive] = useState<string>('Active')
  const [exclusiveRef, setExclusiveRef] = useState<boolean>(false)
  const {
    Active,
    ActiveLoading,
    Upcoming,
    UpcomingLoading,
    Past,
    PastLoading,
    idLoadingDrop,
    Drop,
    activeRefetch,
    upcomingRefetch,
    pastRefetch,
  } = useExclusive({ exclusiveRef: exclusiveRef, pageRef: basicActive, pageNumber: itemOffset })
  const [activeData, setActiveData] = useState<ProductNFTItem[]>([])
  const [upcomingData, setUpcomingData] = useState<ProductNFTItem[]>([])
  const [pastData, setPastData] = useState<ProductNFTItem[]>([])
  const [droValue, setDropValue] = useState<any>([])
  const [drop, setDropData] = useState<DropProps[]>([])
  const { theme } = useTheme()
  const router = useRouter()
  useMemo(() => {
    if (Active) {
      setActiveData(Active.results)
    }
  }, [Active, ActiveLoading])
  useMemo(() => {
    if (Upcoming) {
      setUpcomingData(Upcoming.results)
    }
  }, [Upcoming, UpcomingLoading])
  useMemo(() => {
    if (Past) {
      setPastData(Past.results)
    }
  }, [Past, PastLoading])
  useMemo(() => {
    if (Drop) {
      setDropValue(Drop)
    }
  }, [Drop, idLoadingDrop])
  const itemsPerPage = 6
  const endOffset = itemOffset + itemsPerPage
  let currentItems: ProductNFTItem[] = []

  if (basicActive === 'Active') {
    currentItems = activeData
  } else if (basicActive === 'Upcoming') {
    currentItems = upcomingData
  } else if (basicActive === 'Past') {
    currentItems = pastData
  }
  const pageCount =
    (basicActive === 'Active' && Active?.numPages) ||
    (basicActive === 'Upcoming' && Upcoming?.numPages) ||
    (basicActive === 'Past' && Past?.numPages)
  const handlePageClick = (event: PageClickEvent) => {
    setItemOffset(event.selected + 1)
  }
  useEffect(() => {
    if (itemOffset > 0) {
      if (basicActive === 'Active') {
        activeRefetch()
      } else if (basicActive === 'Upcoming') {
        upcomingRefetch()
      } else if (basicActive === 'Past') {
        pastRefetch()
      }
    }
  }, [basicActive, itemOffset])
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment()
      const updatedDropData = droValue.map((item: DropProps) => {
        const expirationDate = moment(item.expire)
        const duration = moment.duration(expirationDate.diff(now))

        const date = duration.days()
        const hours = duration.hours()
        const minutes = duration.minutes()
        const seconds = duration.seconds()

        return { ...item, date, hours, minutes, seconds }
      })

      // Update the state with the updated dropData
      setDropData(updatedDropData)
    }, 1000) // Update every second

    return () => clearInterval(intervalId)
  }, [droValue])
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return
    }
    setBasicActive(value)
    setItemOffset(1)
  }

  const refetchApis = async () => {
    setExclusiveRef(true)
  }
  const setValue = (value: string) => {
    setBasicActive(value)
    if (value === 'Active') {
      activeRefetch()
    } else if (value === 'Upcoming') {
      upcomingRefetch()
    } else if (value === 'Past') {
      pastRefetch()
    }
  }
  return (
    <div className=" md:!mt-0">
      <div>
        <Carousel
          autoPlay={true}
          className="max-w-[100%]"
          infiniteLoop={true}
          showArrows={true}
          showIndicators={false}
          showStatus={false}
          useKeyboardArrows={true}
        >
          {drop.map((item: any, key: number) => {
            return (
              <div className="flex items-center md:h-[700px]" key={key}>
                <div
                  className=" hover:from-bg-oragneFE animation container relative grid gap-x-5 gap-y-4 bg-grayE3 pb-[70px] pt-[70px] text-center transition delay-500 duration-300 hover:bg-gradient-to-r hover:from-[#FEB331] hover:to-[#FF8548] hover:duration-300 dark:bg-black29 md:grid-cols-4  md:gap-y-0 md:text-left "
                  key={key}
                >
                  <div className=" w-full ">
                    <Typography className="text-[42px] font-bold">{item.label}</Typography>
                    <Typography className="text-[18px] text-black5 dark:text-White255_60 ">{item.des}</Typography>
                    <div className=" mt-9 flex justify-center gap-x-5 md:justify-start">
                      <Button className={'w-[127px]'} hover={false} outlineBorder={false} text={'View Drop'} />
                      <div className="cursor-pointer flex-wrap justify-center self-center bg-gray05 p-3 duration-500 ease-in-out hover:transform active:translate-y-1 active:scale-95  active:duration-300 dark:bg-black225_05">
                        {theme === 'dark' ? (
                          <div className="animate-bell-ring">
                            <LightBellIcons />{' '}
                          </div>
                        ) : (
                          <div className="animate-bell-ring">
                            <BellIcons />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" grid w-full justify-center gap-y-7 ">
                    <div className="flex flex-wrap content-center justify-center gap-x-7 rounded-lg bg-gray05 p-[10%] text-center text-[17px]  text-black5 dark:bg-black225_05 dark:text-White255_60 md:p-[10%] lg:p-[20px]">
                      <div>
                        <Typography className="">Tokens Offered</Typography>
                        <strong>{item.tokensOffered}</strong>
                      </div>
                      <div>
                        <Typography className="">Participants</Typography>
                        <strong>{item.participants}</strong>
                      </div>
                    </div>
                    <div className=" grid-cols-auto-fit-time gap-x-2">
                      <CountDown Expire={item.date} clock={'Day'} />
                      <CountDown Expire={item.hours} clock={'Hrs'} />
                      <CountDown Expire={item.minutes} clock={'Min'} />
                      <CountDown Expire={item.seconds} clock={'sec'} />
                    </div>
                  </div>
                  <div className="w-full md:hidden">
                    <div className="h-[550.82px] w-full">
                      <Image alt={'IMG'} className="h-[550.82px] w-full" height={550} src={IMG.girl} width={641} />
                    </div>
                  </div>
                  <div className=" hidden w-full md:flex"></div>
                  <div className="container absolute -bottom-[18px] right-0 hidden w-full justify-end !pl-0 md:flex md:h-[598.82px]  md:max-w-[374px] xmd:-bottom-[36px] xmd:h-[550px] xmd:max-w-[400px] lg:h-[560px] lg:max-w-[500px] xlg:max-w-[545px] xl:max-w-[641px] xxl:h-[545px]">
                    <Image
                      alt={'IMG'}
                      className="shadowHomeCard h-full max-w-[100%]  rounded-lg"
                      height={550}
                      src={IMG.girl}
                      width={641}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </Carousel>
        <div></div>
      </div>
      <div className="container">
        <TETabs className="w-[90vw] !flex-nowrap !overflow-auto md:w-full md:overflow-hidden">
          {ExclusiveTab.map((item, key) => {
            return (
              <TETabsItem
                active={basicActive === `${item.tabName}`}
                className={`black:text-White255_60 mr-5 p-4 !text-[20px] text-black5 hover:!bg-[#f1f1f1] ${
                  basicActive === item.tabName &&
                  '!text-black dark:border-white dark:!text-white dark:hover:!text-black'
                }  `}
                key={key}
                onClick={() => handleBasicClick(item.tabName)}
              >
                {item.tabName}
              </TETabsItem>
            )
          })}
        </TETabs>
        <TETabsContent className="mt-[40px]">
          <TETabsPane show={basicActive === 'Active'}>
            {ActiveLoading || activeData.length < 0 ? (
              <>
                <Skeleton SkeletonType={'card'} limit={6} />
              </>
            ) : (
              <div
                className={`grid w-[100%] justify-items-center gap-6 ${
                  currentItems.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                } ${currentItems.length === 1 && 'grid-cols-1'} ${currentItems.length === 2 && 'md:grid-cols-2'}`}
              >
                {currentItems.map((item: ProductNFTItem, key: number) => {
                  return (
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
                        component={'exclusion'}
                        updatedOn={item.updatedOn}
                        createDate={item.createdOn}
                        status={'Active'}
                        onClick={() => {
                          refetchApis(), setValue('Active')
                        }}
                        navigate={() => router.push(`exclusive/exclusive-details?id=${item.id}`)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </TETabsPane>
          <TETabsPane show={basicActive === 'Upcoming'}>
            {UpcomingLoading || upcomingData.length < 0 || !upcomingData ? (
              <>
                <Skeleton SkeletonType={'card'} limit={6} />
              </>
            ) : (
              <div
                className={`grid w-[100%] justify-items-center gap-6 ${
                  currentItems.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                } ${currentItems.length === 1 && 'grid-cols-1'} ${currentItems.length === 2 && 'md:grid-cols-2'}`}
              >
                {currentItems.map((item: ProductNFTItem, key: number) => {
                  return (
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
                        component={'exclusion'}
                        updatedOn={item.updatedOn}
                        createDate={item.createdOn}
                        status={'Upcoming'}
                        onClick={() => {
                          refetchApis(), setValue('Upcoming')
                        }}
                        navigate={() => router.push(`exclusive/exclusive-details?id=${item.id}`)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </TETabsPane>
          <TETabsPane show={basicActive === 'Past'}>
            {PastLoading || pastData.length < 0 ? (
              <>
                <Skeleton SkeletonType={'card'} limit={6} />
              </>
            ) : (
              <div
                className={`grid w-[100%] justify-items-center gap-6 ${
                  currentItems.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                } ${currentItems.length === 1 && 'grid-cols-1'} ${currentItems.length === 2 && 'md:grid-cols-2'}`}
              >
                {currentItems.map((item: ProductNFTItem, key: number) => {
                  return (
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
                        component={'exclusion'}
                        updatedOn={item.updatedOn}
                        createDate={item.createdOn}
                        status={'Past'}
                        onClick={() => {
                          refetchApis(), setValue('Past')
                        }}
                        navigate={() => router.push(`exclusive/exclusive-details?id=${item.id}`)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </TETabsPane>
        </TETabsContent>
        {currentItems.length >= itemsPerPage && typeof pageCount === 'number' && (
          <div>
            <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ExclusivePageTemplate
