/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useTheme } from 'next-themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  CopyIcon,
  EmailIcon,
  EyeSmallIcons,
  EyesmallDarkIcons,
  FacebookIcon,
  HeartFillIcons,
  ShareDarkIcons,
  ShareIcons,
  SmallHeart,
  SmallHeartDark,
  TelegramIcon,
  ThreeDotsDarkIcons,
  ThreeDotsIcons,
  TwitterIcon,
} from 'design-systems/Atoms/Icons'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { StoreAccordian } from 'design-systems/Atoms/StoreAccordian'
import { Typography } from 'design-systems/Atoms/Typography'
import { Card } from 'design-systems/Molecules/Card'
import { useProduct } from 'hooks/apis/useProduct'
import { useProductById } from 'hooks/apis/useProductById'
import { Category, ProductNFTItem } from 'api-services/interfaces/cart'
import { useWishlist } from 'hooks/apis/useWishList'
import { useAuthModal } from 'hooks/apis/useAuthModal'
import { AuthModal } from 'design-systems/Molecules/Model/authModal'
import { toast } from 'react-toastify'
import { ReportModal } from 'design-systems/Molecules/Model/reportModal'
import { LoadingModal } from 'design-systems/Molecules/Model/loadingModal'
import { SuccessModal } from 'design-systems/Molecules/Model/successModal'
import { ErrorModal } from 'design-systems/Molecules/Model/errorModal'
import { calculatePrice } from 'hooks/price'
export const StoreDetailPageTemplate: React.FC = () => {
  const accessToken = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const searchParams = useSearchParams()
  const shareRef = useRef<null>(null)
  const claimRef = useRef<null>(null)
  const router = useRouter()
  const ID = searchParams.get('id') || 0
  const { isLoadingProductID, productID, refetchProductById } = useProductById(Number(ID))
  const [productRefetchValue, setProductRefetchValue] = useState<{
    email: string
    refetchObj: boolean
    numPages: number
  }>({ email: String(email), refetchObj: false, numPages: 1 })
  const { product, isLoadingAllProduct, productRefetch } = useProduct(productRefetchValue)
  const [ProductData, setProductData] = useState<ProductNFTItem>()
  const [allproduct, setAllproduct] = useState<ProductNFTItem[]>([])
  const [categoriesName, setcategoriesName] = useState<string>('')
  const [isDropdownVisible, setDropdownVisibility] = useState(false)
  const [isDropdownVisibleClaim, setDropdownVisibilityClaim] = useState(false)
  const [isReportModal, setReportModal] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const { theme } = useTheme()
  const { postWishlist } = useWishlist()
  const { authCheck, setAuthCheck } = useAuthModal()
  useMemo(() => {
    if (productID) {
      setProductData(productID)
    }
  }, [productID, isLoadingProductID])
  useMemo(() => {
    if (product) {
      setAllproduct(product.results)
    }
  }, [product, isLoadingAllProduct, productID, isLoadingProductID])
  const fiat = `USD`
  const splitString = ProductData && ProductData?.title && ProductData?.title?.split('TokenID: ')
  const defaultCrypto = 'HBAR'
  const categoryIdToFilter = 1 // Change this to the desired category ID
  // Filter response2 based on categoryId
  const filteredResponse2 = allproduct?.filter((item: ProductNFTItem) => {
    const categoryIds = item?.category?.map((category: Category) => category?.id)

    return categoryIds?.includes(categoryIdToFilter)
  })
  const addToWishlistItem = async (id: number) => {
    if (accessToken !== null) {
      await postWishlist(id, String(email))
      refetchProductById()
    } else {
      setAuthCheck(true)
    }
  }

  const toggleDropdownSocial = () => {
    setDropdownVisibility(!isDropdownVisible)
    setDropdownVisibilityClaim(false)
  }
  const toggleDropdownClaim = () => {
    setDropdownVisibilityClaim(!isDropdownVisibleClaim)
    setDropdownVisibility(false)
  }
  const toggleDropdownReport = () => {
    if (accessToken !== null) {
      setReportModal(!isReportModal)
      setDropdownVisibilityClaim(false)
    } else {
      setAuthCheck(true)
    }
  }

  const handleShare = (platform: string) => {
    const url = `http://localhost:3000/store/store-details?id=${ID}`
    const text = 'Check out this product'

    switch (platform) {
      case 'Copy':
        navigator.clipboard.writeText(url)
        toast.success('Product Url Copied!')
        break

      case 'Twitter':
        const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
          text
        )}`
        window.open(tweetUrl, '_blank')
        break

      case 'Facebook':
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(text)}`
        window.open(facebookShareUrl, '_blank')
        break

      case 'Telegram':
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
          text
        )}`
        window.open(telegramShareUrl, '_blank')
        break

      case 'EMail':
        const emailSubject = `Check out this amazing product: ${ProductData?.title}`
        const emailBody = `I found this amazing product "${ProductData?.title}". You should definitely check it out:\n\n${url}`
        const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
        window.location.href = mailtoLink
        break

      default:
        console.warn(`Unsupported platform: ${platform}`)
    }
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
  useOutsideClick(shareRef, () => {
    if (isDropdownVisible) setDropdownVisibility(false)
  })
  const useOutsideClickClaim = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
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
  useOutsideClickClaim(claimRef, () => {
    if (isDropdownVisibleClaim) setDropdownVisibilityClaim(false)
  })

  const handleClime = () => {
    if (accessToken !== null) {
      setIsLoading(true)
      setTimeout(() => {
        setIsError(true)
      }, 5000)
    } else {
      setAuthCheck(true)
    }
  }
  const refetchApis = async () => {
    if (accessToken !== null) {
      setProductRefetchValue({ ...productRefetchValue, refetchObj: true })
      await productRefetch()
    } else {
      setAuthCheck(true)
    }
  }

  const handalBuyNow = () => {
    if (accessToken !== null) {
      router.push(
        `https://buy.onramper.com/?defaultAmount=${calculatePrice(
          Number(ProductData?.priceAmount),
          String(ProductData?.priceSymbol)
        )}&defaultCrypto=${defaultCrypto}&defaultFiat=${fiat}`
      )
    } else {
      setAuthCheck(true)
    }
  }
  const ShareButton = ({ icon, label, onClick }: any) => (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className="border-gray-100 text-gray-700 hover:bg-gray-100 transform-origin-center mb-2 flex h-10 w-10 select-none items-center justify-center rounded-full border bg-transparent p-0 transition-all duration-150 focus:outline-none"
      >
        <span className="inline-flex h-full items-center justify-center">{icon}</span>
      </button>
      <span className="text-gray-600 text-xs font-semibold">{label}</span>
    </div>
  )

  return (
    <div className="container">
      <div className=" grid grid-cols-1 justify-between gap-x-16 lg:grid-cols-2">
        <div className="flex h-[832px] rounded-sm bg-blackE3 p-10 dark:bg-black29 xs:!h-[300px] sm:!h-[334px] xsm:!h-[370px] md:!h-[616px] xmd:!h-[832px] lg:!h-[550px]">
          <img
            alt={'NIFT-IMG'}
            className="rounded-sm xs:!h-[220px] sm:!h-[253px] xsm:!h-[290px] md:!h-[530px] xmd:!h-[755px] lg:!h-[470px]"
            height={832}
            src={String(ProductData?.image)}
            width={832}
          />
        </div>
        <div className="mt-8 w-full lg:mt-0">
          <div>
            <div className="flex justify-between gap-x-8">
              <Typography className="text-[21px] text-black3 dark:text-gray255_80">{ProductData?.creator}</Typography>
              {theme === 'dark' ? (
                <div className="flex content-center justify-between gap-x-8">
                  <div>
                    <div className="relative">
                      <button onClick={toggleDropdownSocial}>
                        <ShareDarkIcons />
                      </button>
                      {isDropdownVisible && (
                        <div
                          ref={shareRef}
                          className="border-gray-700 absolute right-0 h-[139px] w-[292px] origin-left rounded-[12px] border-0 border-solid bg-white p-4 text-center text-[#000000] shadow-md xs:right-[-38px] sm:right-0"
                        >
                          <span className="font-inherit leading-7 text-center text-[22px] font-bold">
                            Share link to this page
                          </span>
                          <div className=" mt-4 flex items-stretch">
                            <div className="grid-cols-1fr grid grid-flow-col items-stretch justify-center gap-[12px]">
                              <ShareButton icon={<TwitterIcon />} label="X" onClick={() => handleShare('Twitter')} />
                              <ShareButton
                                icon={<FacebookIcon />}
                                label="Facebook"
                                onClick={() => handleShare('Facebook')}
                              />
                              <ShareButton
                                icon={<TelegramIcon />}
                                label="Telegram"
                                onClick={() => handleShare('Telegram')}
                              />
                              <ShareButton icon={<EmailIcon />} label="E-Mail" onClick={() => handleShare('EMail')} />
                              <ShareButton icon={<CopyIcon />} label="Copy" onClick={() => handleShare('Copy')} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <button onClick={toggleDropdownClaim}>
                      <ThreeDotsDarkIcons />
                    </button>
                    {isDropdownVisibleClaim && (
                      <div
                        ref={claimRef}
                        className="border-gray-700 absolute right-[14px] flex h-[110px] w-[200px] origin-left flex-col rounded-[12px] border-0 border-solid bg-white p-4 text-[#000000] shadow-md xl:right-[120px]"
                      >
                        <span onClick={handleClime} className="font-inherit leading-7 cursor-pointer p-2 text-[17px] ">
                          Claim ownership
                        </span>
                        <span
                          onClick={toggleDropdownReport}
                          className="font-inherit leading-7  cursor-pointer p-2 text-[17px]"
                        >
                          Report page
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex content-center justify-between gap-x-8">
                  <div>
                    <div className="relative">
                      <button onClick={toggleDropdownSocial}>
                        <ShareIcons />
                      </button>

                      {isDropdownVisible && (
                        <div
                          ref={shareRef}
                          className="border-gray-700 absolute right-0 h-[139px] w-[292px] origin-left rounded-[12px] border-0 border-solid bg-white p-4 text-center shadow-md xs:right-[-38px] sm:right-0"
                        >
                          <span className="font-inherit leading-7 text-center text-[22px] font-bold">
                            Share link to this page
                          </span>
                          <div className=" mt-4 flex items-stretch">
                            <div className="grid-cols-1fr grid grid-flow-col items-stretch justify-center gap-[12px]">
                              <ShareButton icon={<TwitterIcon />} label="X" onClick={() => handleShare('Twitter')} />
                              <ShareButton
                                icon={<FacebookIcon />}
                                label="Facebook"
                                onClick={() => handleShare('Facebook')}
                              />
                              <ShareButton
                                icon={<TelegramIcon />}
                                label="Telegram"
                                onClick={() => handleShare('Telegram')}
                              />
                              <ShareButton icon={<EmailIcon />} label="E-Mail" onClick={() => handleShare('EMail')} />
                              <ShareButton icon={<CopyIcon />} label="Copy" onClick={() => handleShare('Copy')} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <button onClick={toggleDropdownClaim}>
                      <ThreeDotsIcons />
                    </button>
                    {isDropdownVisibleClaim && (
                      <div
                        ref={claimRef}
                        className="border-gray-700 absolute right-[14px] flex h-[110px] w-[200px] origin-left flex-col rounded-[12px] border-0 border-solid bg-white p-4 shadow-md xl:right-[120px]"
                      >
                        <span onClick={handleClime} className="font-inherit leading-7 cursor-pointer p-2 text-[17px] ">
                          Claim ownership
                        </span>
                        <span
                          onClick={toggleDropdownReport}
                          className="font-inherit leading-7  cursor-pointer p-2 text-[17px]"
                        >
                          Report page
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Typography className="flex content-center justify-between gap-x-8 text-[32px] font-bold ">
              <div>{ProductData && ProductData?.title && splitString?.[0]}</div>
              <div>{calculatePrice(Number(ProductData?.priceAmount), String(ProductData?.priceSymbol))}</div>
            </Typography>
            <div className="text-[18px] font-normal text-black3 dark:text-gray255_80">
              Found On{' '}
              <strong>
                <a
                  className=" bg-gradient-to-r hover:from-oragneFE hover:to-orangeFF hover:bg-clip-text hover:hover:text-transparent"
                  href={ProductData?.nftUrl}
                  target="blank"
                >
                  @Website
                </a>
              </strong>{' '}
            </div>
            {theme === 'dark' ? (
              <div className="mt-3 flex gap-x-8 text-[14px] text-black3 dark:text-gray255_80">
                <div className="flex justify-between gap-x-2 ">
                  <div className="flex flex-wrap content-center">
                    <EyesmallDarkIcons />
                  </div>
                  <div>{ProductData?.viewCount} Views</div>
                </div>
                <div className="flex justify-between gap-x-2 ">
                  <div
                    onClick={() => addToWishlistItem(Number(ProductData?.id))}
                    className="flex cursor-pointer flex-wrap content-center"
                  >
                    {ProductData?.liked.liked ? (
                      <div className="animate-heart">
                        <HeartFillIcons />
                      </div>
                    ) : (
                      <SmallHeartDark />
                    )}
                  </div>
                  <Typography className="">{ProductData?.liked?.totalLikes} Favorites</Typography>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex gap-x-8 text-[14px] text-black3 dark:text-gray255_80">
                <div className="flex justify-between gap-x-2 ">
                  <div className="flex flex-wrap content-center">
                    <EyeSmallIcons />
                  </div>
                  <Typography className="">{ProductData?.viewCount} Views</Typography>
                </div>
                <div className="flex justify-between gap-x-2 ">
                  <div
                    onClick={() => addToWishlistItem(Number(ProductData?.id))}
                    className="flex cursor-pointer flex-wrap content-center"
                  >
                    {ProductData?.liked.liked ? (
                      <div className="animate-heart">
                        <HeartFillIcons />
                      </div>
                    ) : (
                      <SmallHeart />
                    )}
                  </div>
                  <Typography className="">{ProductData?.liked?.totalLikes} Favorites</Typography>
                </div>
              </div>
            )}
            <Typography className="mt-8 text-[18px] font-normal leading-[29px] text-black4 dark:text-gray255_80">
              {ProductData?.description}
            </Typography>
          </div>

          {/* Accordian */}
          <StoreAccordian data={ProductData as ProductNFTItem} isLoading={isLoadingProductID} />
          {ProductData && !isLoadingProductID && (
            <div className="mt-16 flex justify-center">
              <a
                className="flex cursor-pointer items-center justify-center bg-black px-4 py-2 font-semibold text-white duration-500 ease-in-out hover:transform active:translate-y-1  active:scale-95 active:duration-300"
                href={``}
                onClick={handalBuyNow}
              >
                <Typography className="">
                  {ProductData.status === 'active' && 'Buy Now'} {ProductData.status === 'past' && 'Not For Sale'}{' '}
                  {ProductData.status === 'upcoming' && 'Add Card'}
                </Typography>
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
        <Typography className={`!m-0 !mb-10 !mt-12 text-start text-[48px] font-bold`}>
          More From This Collection
        </Typography>
      </div>
      {!isLoadingAllProduct && allproduct.length !== 0 ? (
        <>
          <div
            className={`grid w-[100%] justify-items-center gap-6 ${
              allproduct.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            } ${allproduct.length === 1 && 'grid-cols-1'} ${allproduct.length === 2 && 'md:grid-cols-1'}`}
          >
            {filteredResponse2?.slice(0, 6).map((item: ProductNFTItem, key: number) => {
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
                    component={'allproduct'}
                    updatedOn={item.updatedOn}
                    createDate={item.createdOn}
                    categoriesName={categoriesName}
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
      <AuthModal setAuthCheck={setAuthCheck} authCheck={authCheck} />
      <ReportModal
        setCheck={setReportModal}
        isCheck={isReportModal}
        setIsLoading={setIsLoading}
        setIsSuccess={setIsSuccess}
        setIsError={setIsError}
      />
      <LoadingModal setCheck={setIsLoading} isCheck={isLoading} setIsSuccess={setIsSuccess} />
      <SuccessModal setCheck={setIsSuccess} isCheck={isSuccess} />
      <ErrorModal setCheck={setIsError} isCheck={isError} setDropdownVisibilityClaim={setDropdownVisibilityClaim} />
    </div>
  )
}
