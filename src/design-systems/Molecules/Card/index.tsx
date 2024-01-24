/* eslint-disable @next/next/no-img-element */
'use client'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { CardProps } from './interface'

import { IMG } from 'assets/images'
import { DeleteIcon, HeartFillIcons, HeartIcon, WhiteCard } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { Collectibles } from 'design-systems/Molecules/Model/payment/Collectibles'
import Tooltip from 'design-systems/Atoms/Tooltip'
import { useAuthModal } from 'hooks/apis/useAuthModal'
import { AuthModal } from '../Model/authModal'
import { useCart } from 'hooks/apis/useCart'
import { useWishlist } from 'hooks/apis/useWishList'
import { toast } from 'react-toastify'
import { useGetCart } from 'hooks/apis/useGetCart'
import { useProduct } from 'hooks/apis/useProduct'
import { useCollection } from 'hooks/apis/useCollection'
import { useGetWishlist } from 'hooks/apis/useGetWishlist'
import { useExclusive } from 'hooks/apis/useExclusive'
import { useHome } from 'hooks/apis/useHome'
import { useChain } from 'hooks/apis/useChain'
import { useRouter, useSearchParams } from 'next/navigation'
import { calculatePrice } from 'hooks/price'
interface RefetchObj {
  cartRef: boolean
  productRef: boolean
  collectionRef: boolean
  wishlistRef: boolean
  exclusiveRef: boolean
  homeRef: boolean
  chainRef: boolean
}
export const Card = ({
  id,
  title,
  price,
  symbol,
  image,
  categories,
  like,
  isCart,
  createDate,
  updatedOn,
  onClick,
  status,
  component,
  categoriesName,
  navigate,
}: CardProps) => {
  const router = useRouter()
  const [verifyModel, setverifyModel] = useState<boolean>(false)
  const [refetchObj, setRefetchObj] = useState<RefetchObj>({
    cartRef: false,
    productRef: false,
    collectionRef: false,
    wishlistRef: false,
    exclusiveRef: false,
    homeRef: false,
    chainRef: false,
  })
  const { authCheck, setAuthCheck } = useAuthModal()
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const { postCart } = useCart()
  const { postWishlist } = useWishlist()
  const { refetch, handleDeleteItem } = useGetCart(String(email), refetchObj.cartRef)
  const fiat = `USD`
  const defaultCrypto = 'HBAR'
  const parts = title?.split('TokenID')
  const extractedWord = parts[0]?.trim()
  const value = categories
  const inputDate = createDate ? new Date(createDate) : new Date(updatedOn)
  // Define options for formatting the date
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  }
  const formattedDate = inputDate.toLocaleDateString('en-US', dateFormatOptions)

  const addToCartItem = async (id: number) => {
    const accessToken = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
    try {
      if (accessToken !== null) {
        await postCart({
          email: String(email),
          reference_key: accessToken,
          product: id,
          quantity: 1,
        })
        onClick && onClick()
        await refetch()
      } else {
        setAuthCheck(true)
      }
    } catch (e) {
      throw e
    }
  }
  const addToWishlistItem = async (id: number) => {
    const accessToken = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
    if (accessToken !== null) {
      await postWishlist(id, String(email))
      onClick && onClick()
    } else {
      setAuthCheck(true)
    }
  }
  const removeToCart = async (id: number) => {
    setRefetchObj({ ...refetchObj, cartRef: true })
    await handleDeleteItem(id)
    await refetch()
  }
  const buyNowProduct = () => {
    const accessToken = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
    if (accessToken !== null) {
      router.push(
        `https://buy.onramper.com/?defaultAmount=${calculatePrice(
          Number(price),
          String(symbol)
        )}&defaultCrypto=${defaultCrypto}&defaultFiat=${fiat}`
      )
    } else {
      setAuthCheck(true)
    }
  }
  return (
    <div className="shadow-card fadeIn grid max-w-[523.581px] content-between rounded-[32px] bg-grayE3 pt-1 text-center dark:bg-black29 ">
      <div className="relative ml-6 mr-6 mt-6">
        <div className="absolute z-10 mt-3 flex w-[100%] cursor-pointer justify-between">
          {/* {item.category !== null && ( */}

          <Typography
            className={`flex h-[28.917px] items-center justify-center px-5 py-2 font-bold text-white ${
              status
                ? `${status === 'Active' && 'bg-green04'} ${status === 'Upcoming' && 'bg-orange'} ${
                    status === 'Past' && 'bg-redBA'
                  }  `
                : `truncate" w-[150px] bg-black2`
            } `}
          >
            {status ? (
              <>
                {status === 'Active' && <>Active</>}
                {status === 'Upcoming' && <div className="font-medium text-black">Upcoming</div>}
                {status === 'Past' && <div>Ended</div>}
              </>
            ) : (
              <>
                {categories && categories.length !== 0 ? (
                  <>
                    {value && value[0].categoryName.length > 12 ? (
                      <Tooltip array={categories}>
                        <div className="w-[120px] truncate">{value && value[0].categoryName}</div>
                      </Tooltip>
                    ) : (
                      <div className="">{value && value[0].categoryName}</div>
                    )}
                  </>
                ) : (
                  <>
                    {categoriesName ? (
                      <Tooltip text={categoriesName}>
                        <div className="w-[120px] truncate">{categoriesName}</div>
                      </Tooltip>
                    ) : (
                      <div className="">{value && value[0].categoryName}</div>
                    )}
                  </>
                )}
              </>
            )}
          </Typography>

          {/* )} */}
          <div
            className="z-20 mr-3 flex h-[30px] w-[30.549px] items-center justify-center rounded-full bg-White255_60 "
            onClick={() => {
              addToWishlistItem(id)
            }}
          >
            {like.liked ? (
              <div className="animate-heart">
                <HeartFillIcons />
              </div>
            ) : (
              <div className="normal-heart">
                <HeartIcon />
              </div>
            )}
          </div>
        </div>
        {updatedOn !== null && status === 'Upcoming' && (
          <div className={`absolute z-10 mt-10 bg-black255 px-4 py-2 font-bold`}>Starts : {formattedDate}</div>
        )}
        {updatedOn !== null && status === 'Past' && (
          <div className={`absolute z-10 mt-10 bg-black255 px-4 py-2 font-bold`}>Ended : {formattedDate}</div>
        )}
        <div style={{ width: '100%', height: `${component === 'store' ? 244.82 : 315.82}` }}>
          <img
            alt="IMG"
            className={`relative ${
              component === 'store'
                ? 'max-h-[244px] lg:max-h-[190px] xxlg:max-h-[244px]'
                : `!h-[315.82] ${component === 'exclusion' && `max-h-[315.82px] xs:max-h-[244px] sm:max-h-[294px]`}`
            } !w-[475.23px] cursor-pointer rounded-sm`}
            height={component === 'store' ? 244.82 : 315.82}
            src={String(image) || (IMG.NoImage as unknown as string)}
            width={475.23}
            onClick={navigate}
          />
        </div>
      </div>
      <Typography className="truncate p-3 text-center text-2xl font-bold capitalize">{extractedWord}</Typography>
      <div className="grid gap-x-1" style={{ gridTemplateColumns: '55% auto auto' }}>
        <Typography className="cursor-pointer rounded-bl-lg bg-gray81 p-4 font-bold text-white">
          {calculatePrice(Number(price), String(symbol))}
          {/* <span className="text-sm">({item.hbar})</span> */}
        </Typography>
        <a
          className="grid cursor-pointer items-center bg-black font-semibold text-white duration-500 ease-in-out hover:transform active:translate-y-1  active:scale-95 active:duration-300"
          onClick={() => {
            buyNowProduct()
          }}
        >
          <Typography className="">Buy Now</Typography>
        </a>
        {isCart ? (
          component === 'addtocart' ? (
            <div
              onClick={() => removeToCart(id)}
              className="grid cursor-pointer content-center justify-center rounded-br-lg bg-black duration-500 ease-in-out hover:transform active:translate-y-1  active:scale-95 active:duration-300"
            >
              <DeleteIcon />
            </div>
          ) : (
            <div
              onClick={() => toast.info('This product already added in your cart')}
              className="grid cursor-pointer content-center justify-center rounded-br-lg bg-black duration-500 ease-in-out hover:transform active:translate-y-1  active:scale-95 active:duration-300"
            >
              <WhiteCard />
            </div>
          )
        ) : (
          <div
            onClick={() => addToCartItem(id)}
            className="grid cursor-pointer content-center justify-center rounded-br-lg bg-black duration-500 ease-in-out hover:transform active:translate-y-1  active:scale-95 active:duration-300"
          >
            <WhiteCard />
          </div>
        )}
      </div>
      {/* <SignUp setShowModal={setverifyModel} showModal={verifyModel} buyactive={buyactive}/> */}
      <Collectibles setShowModal={setverifyModel} showModal={verifyModel} />
      <AuthModal setAuthCheck={setAuthCheck} authCheck={authCheck} />
    </div>
  )
}
