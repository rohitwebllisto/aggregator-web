/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { useRouter } from 'next/navigation'

import { IMG } from 'assets/images'
import { Button } from 'design-systems/Atoms/Button'
import { ActiveCarousel } from 'design-systems/Atoms/Icons'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { Typography } from 'design-systems/Atoms/Typography'
import { Card } from 'design-systems/Molecules/Card'
import { Gallery } from 'design-systems/Molecules/Gallery'
import { HomeCard } from 'design-systems/Molecules/HomeCard'
import { LeftHomeCard } from 'design-systems/Molecules/LeftHomeCard'
import { TopCatogery } from 'design-systems/Molecules/TopCategory'
import { GalleryData, responsive, responsive2 } from 'design-systems/data/data'
import { useHome } from 'hooks/apis/useHome'
import { TopCategory } from './interface'
import { ProductNFTItem } from 'api-services/interfaces/cart'
import { CreatorInfo } from 'api-services/interfaces/home'

const HomePageTemplate: React.FC = () => {
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const [NewInproduct, setNewInProduct] = useState<ProductNFTItem[]>([])
  const [popularProduct, setPopularProduct] = useState<ProductNFTItem[]>([])
  const [seller, setSeller] = useState<ProductNFTItem[]>([])
  const [topCategoryData, setTopCategoryData] = useState<any>([])
  const [topCourtorData, setTopCourtorData] = useState<CreatorInfo[]>([])
  const [componentName, setComonentName] = useState<string>('')
  const [homeRef, setHomeRef] = useState<boolean>(false)
  const {
    New_In,
    isLoadingNewIN,
    isLoadingPopular,
    popular,
    isLoadingBestSeller,
    bestSeller,
    isLoadingTopCategory,
    topCategory,
    topCourtor,
    isLoadingTopsCourtor,
    isNewRefetch,
    popularRefetch,
    bestSellerRefetch,
  } = useHome(String(email), homeRef, componentName)
  const initialContent =
    'Discover the hottest collectibles, games and events all on one platform - regardless on which chain they are built on.'
  const router = useRouter()

  useMemo(() => {
    if (New_In) {
      setNewInProduct(New_In.results)
    }
  }, [New_In, isLoadingNewIN])
  useMemo(() => {
    if (popular) {
      setPopularProduct(popular.results)
    }
  }, [popular, isLoadingPopular])
  useMemo(() => {
    if (bestSeller) {
      setSeller(bestSeller.results)
    }
  }, [bestSeller, isLoadingBestSeller])
  useMemo(() => {
    if (topCategory) {
      setTopCategoryData(topCategory)
    }
  }, [topCategory, isLoadingTopCategory])

  useMemo(() => {
    if (topCourtor) {
      setTopCourtorData(topCourtor)
    }
  }, [topCourtor, isLoadingTopsCourtor])

  const refetchApis = async () => {
    setHomeRef(true)
  }
  const setValue = (value: string) => {
    setComonentName(value)
    if (value === 'isNew') {
      isNewRefetch()
    } else if (value === 'popular') {
      popularRefetch()
    } else if (value === 'bestSeller') {
      bestSellerRefetch()
    }
  }
  return (
    <div>
      <div className="container w-full gap-y-11">
        <div className="inline-block justify-between gap-x-5 md:flex">
          <div className="w-[100%] gap-y-0.5 self-center md:w-[100%] lg:w-[500px]">
            <Typography className="font-Rubik text-5xl font-semibold">
              Explore the Best of W3 across all networks
            </Typography>
            <Typography className="font-Rubik text-xl text-black2 dark:text-black255">{initialContent}</Typography>
            <div className="flex justify-center lg:flex lg:justify-start">
              <Button
                className={'mt-4 h-12 w-28 font-Rubik sm:self-center'}
                hover={true}
                outlineBorder={false}
                text={'View Store'}
                onClick={() => router.push(`/store`)}
              />
            </div>
          </div>
          <div>
            <Gallery className={''} data={GalleryData} />
          </div>
        </div>
        <div className="mb-8">
          <Typography className={`m-12 text-center font-Rubik text-3xl font-bold uppercase md:text-5xl`}>
            TOP CATEGORIES
          </Typography>
          <div className="w-[100%]">
            {!isLoadingTopCategory ? (
              <Carousel
                arrows={false}
                autoPlay={true}
                autoPlaySpeed={2000}
                className="gd-carousel"
                containerClass={`!static `}
                customDot={
                  <div className="mt-3 hidden p-4">
                    <ActiveCarousel />
                  </div>
                }
                draggable={true}
                infinite={true}
                itemClass={``}
                renderDotsOutside={true}
                responsive={responsive}
                showDots={true}
                swipeable={true}
              >
                {topCategoryData?.map((item: TopCategory, key: number) => {
                  return (
                    <div className="mr-7" key={key}>
                      <TopCatogery
                        collection={item.products.length}
                        heading={item.name}
                        image={item.categoryImage ? (item.id !== 1 ? item.categoryImage : IMG.Category) : IMG.Category}
                      />
                    </div>
                  )
                })}
              </Carousel>
            ) : (
              <Skeleton SkeletonType={'carousel'} limit={3} />
            )}
          </div>
        </div>

        <HomeCard buttonText={'View Drop'} />
        <div>
          <div className="mb-8 mt-20 xmd:!mt-0">
            <Typography className={`m-12 text-center text-3xl font-bold uppercase xsm:!m-8 md:text-5xl`}>
              NEW IN
            </Typography>
            {!isLoadingNewIN && NewInproduct.length !== 0 ? (
              <>
                <div
                  className={`grid w-[100%] justify-items-center gap-6 ${
                    NewInproduct.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  } ${NewInproduct.length === 1 && 'grid-cols-1'} ${NewInproduct.length === 2 && 'md:grid-cols-1'}`}
                >
                  {NewInproduct?.slice(0, 6).map((item: ProductNFTItem, key: number) => {
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
                          component={'popular'}
                          updatedOn={item.updatedOn}
                          createDate={item.createdOn}
                          onClick={() => {
                            refetchApis(), setValue('isNew')
                          }}
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
            {NewInproduct?.length > 6 && (
              <div className={'m-11 flex justify-center'}>
                <Link
                  href={{
                    pathname: '/chain',
                    query: { text: 'New In' },
                  }}
                >
                  <Button className={'w-[115.69px] p-2'} hover={false} outlineBorder={true} text={'View All'} />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-8">
            <Typography className={`m-12 text-center text-3xl font-bold uppercase md:text-5xl`}>
              TOP CURATORS
            </Typography>
            <div className="">
              {!isLoadingTopsCourtor ? (
                <Carousel
                  arrows={false}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  className="gd-carousel"
                  containerClass={`!static `}
                  customDot={
                    <div className="mt-3 hidden p-4">
                      <ActiveCarousel />
                    </div>
                  }
                  draggable={true}
                  infinite={true}
                  itemClass={``}
                  renderDotsOutside={true}
                  // dotListClass="indicator_wrp"
                  //  removeArrowOnDeviceType={}
                  responsive={responsive2}
                  showDots={true}
                  // slidesToSlide={3}
                  swipeable={true}
                >
                  {topCourtorData.map((item: CreatorInfo, key: number) => (
                    <div className="grid justify-center gap-y-2 text-center" key={key}>
                      <Image alt={'IMG'} height={130} src={item.creatorImage} width={130} className="rounded-full" />
                      <Typography className="mt-2 w-[120px] truncate text-base font-medium leading-[22.4px] text-black opacity-90 ">
                        {item.creator}
                      </Typography>
                      <Typography className="text-[21px] font-bold leading-[29.4px]">{item.productCount}</Typography>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <Skeleton SkeletonType={'carousel'} limit={5} />
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="mb-8">
            <Typography className={`m-12 text-center text-3xl font-bold uppercase leading-[59px] md:text-5xl`}>
              MOST POPULAR
            </Typography>
            {!isLoadingPopular && popularProduct.length > 0 ? (
              <>
                <div
                  className={`grid w-[100%] justify-items-center gap-6 ${
                    popularProduct.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  } ${popularProduct.length === 1 && 'grid-cols-1'} ${popularProduct.length === 2 && 'md:grid-cols-1'}`}
                >
                  {popularProduct?.slice(0, 6).map((item: ProductNFTItem, key: number) => {
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
                          component={'popular'}
                          updatedOn={item.updatedOn}
                          createDate={item.createdOn}
                          onClick={() => {
                            refetchApis(), setValue('popular')
                          }}
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
            {popularProduct?.length > 6 && (
              <div className={'m-11 flex justify-center'}>
                <Link
                  href={{
                    pathname: '/chain',
                    query: { text: 'Most popular' },
                  }}
                >
                  <Button className={'w-[115.69px] p-2'} hover={false} outlineBorder={true} text={'View All'} />
                </Link>
              </div>
            )}
          </div>
        </div>
        <LeftHomeCard buttonText={'Explore'} />
        <div>
          <div className="mb-8">
            <Typography className={`m-12 text-center text-3xl font-bold uppercase md:text-5xl`}>
              BEST COLLECTION
            </Typography>

            {!isLoadingBestSeller && seller?.length > 0 ? (
              <>
                <div
                  className={`grid w-[100%] justify-items-center gap-6 ${
                    seller.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  } ${seller.length === 1 && 'grid-cols-1'} ${seller.length === 2 && 'md:grid-cols-1'}`}
                >
                  {seller?.slice(0, 6).map((item: ProductNFTItem, key: number) => {
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
                          component={'bestSeller'}
                          updatedOn={item.updatedOn}
                          createDate={item.createdOn}
                          onClick={() => {
                            refetchApis(), setValue('bestSeller')
                          }}
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
            {seller?.length > 6 && (
              <div className={'m-11 flex justify-center'}>
                <Link
                  href={{
                    pathname: '/chain',
                    query: { text: 'Best Collection' },
                  }}
                >
                  <Button className={'w-[115.69px] p-2'} hover={false} outlineBorder={true} text={'View All'} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageTemplate
