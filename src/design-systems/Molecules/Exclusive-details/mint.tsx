/* eslint-disable import/order */
'use client'
import Image from 'next/image'

import { ExclusiveDetailsTabsProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import {
  DarkPlusIcons,
  EyeSmallIcons,
  EyesmallDarkIcons,
  HeartFillIcons,
  MinusIcons,
  PlusIcns,
  SmallHeart,
  SmallHeartDark,
} from 'design-systems/Atoms/Icons'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
// eslint-disable-next-line import/order
import { useMemo, useState } from 'react'
import { IMG } from 'assets/images'
import { calculatePrice } from 'hooks/price'
import { useRouter } from 'next/navigation'

export const Mint = ({ theme, ExclusiveData, onClick, setAuth }: ExclusiveDetailsTabsProps) => {
  const [mint, setMint] = useState<number>(1)
  const [priceIncrement, setPriceIncrement] = useState<number>(0)
  const router = useRouter()
  const fiat = `USD`
  const defaultCrypto = 'HBAR'
  useMemo(() => {
    setPriceIncrement(Number(ExclusiveData?.priceAmount))
  }, [ExclusiveData?.priceAmount])
  const IncDec = (type: string, cryptoAmont: number) => {
    if (type === 'increment') {
      const incrementedNumericPart = priceIncrement + cryptoAmont
      setPriceIncrement(incrementedNumericPart)
      setMint(mint + 1)
    } else {
      const incrementedNumericPart = priceIncrement - cryptoAmont
      if (priceIncrement > incrementedNumericPart) {
        setPriceIncrement(incrementedNumericPart)
        setMint(mint - 1)
      }
    }
  }
  const handleClick = () => {
    const accessToken = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
    if (accessToken !== null) {
      router.push(
        `https://buy.onramper.com/?defaultAmount=${calculatePrice(
          priceIncrement,
          String(ExclusiveData?.priceSymbol)
        )}&defaultCrypto=${defaultCrypto}&defaultFiat=${fiat}`
      )
    } else {
      setAuth && setAuth(true)
    }
  }
  return (
    <div className="mt-9">
      <div className=" w-full gap-x-11 md:flex md:justify-between">
        <div className="md:w-[50%]  ">
          {/* <div className="rounded-sm bg-[#EFDFDF] p-5 dark:bg-[#292929] "> */}
          {/* <CarouselReact
            autoPlay={true}
            className="max-w-[100%]"
            data={ExclusiveData?}
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            thumbWidth={100}
            useKeyboardArrows={true}
          /> */}
          <div className="w-full rounded-sm bg-blackE3 p-10 ">
            <Image
              alt="image"
              className="rounded-sm xs:!h-[220px] sm:!h-[253px] xsm:!h-[290px] md:!h-[452px] xmd:!h-[343px]"
              height={832}
              src={
                ExclusiveData?.image === null || ExclusiveData?.image === '' || ExclusiveData?.image === undefined
                  ? IMG.NoImage
                  : ExclusiveData?.image
              }
              width={832}
            />
          </div>
        </div>
        <div className="mt-9 text-[18px] text-black3 dark:text-white md:mt-0 md:w-[50%] ">
          <div className="text-[21px]">{ExclusiveData?.creator}</div>
          {/* <div className="text-[32px] font-bold ">{ExclusiveData?.title && ExclusiveData?.title.includes('TokenID') ? splitString[0] : ExclusiveData?.title }</div> */}
          <div className="mb-4 flex flex-wrap justify-between md:mb-0 md:block">
            <div>
              Found On{' '}
              <strong>
                <a className="hover:text-orange" href={ExclusiveData?.nftUrl} target="blank">
                  @Website
                </a>
              </strong>{' '}
            </div>
            <div className="mt-3 sm:mt-0 md:mb-8 md:mt-3">
              {theme === 'dark' ? (
                <div className="mt-3 flex gap-x-8 text-[14px] text-black3 dark:text-gray255_80">
                  <div className="flex justify-between gap-x-2 ">
                    <div className="flex flex-wrap content-center">
                      <EyesmallDarkIcons />
                    </div>
                    <div>20 Views</div>
                  </div>
                  <div className="flex justify-between gap-x-2 ">
                    <div onClick={onClick} className="flex cursor-pointer flex-wrap content-center">
                      {ExclusiveData?.liked.liked ? (
                        <div className="animate-heart">
                          <HeartFillIcons />
                        </div>
                      ) : (
                        <div className="normal-heart">
                          <SmallHeartDark />
                        </div>
                      )}
                    </div>
                    <div>{ExclusiveData?.liked.totalLikes} Favorites</div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-x-8 text-[14px] text-black3 dark:text-gray255_80 md:mt-3">
                  <div className="flex justify-between gap-x-2 ">
                    <div className="flex flex-wrap md:content-center">
                      <EyeSmallIcons />
                    </div>
                    <div>20 Views</div>
                  </div>
                  <div className="flex justify-between gap-x-2 ">
                    <div onClick={onClick} className="flex cursor-pointer flex-wrap content-center">
                      {ExclusiveData?.liked.liked ? (
                        <div className="animate-heart">
                          <HeartFillIcons />
                        </div>
                      ) : (
                        <div className="normal-heart">
                          <SmallHeart />
                        </div>
                      )}
                    </div>
                    <div>{ExclusiveData?.liked.totalLikes} Favorites</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="leading-[29px]">{ExclusiveData?.description}</div>
          <div className="shadowBisque mt-11 flex flex-wrap justify-center rounded-sm bg-white225__03 p-10 text-center dark:bg-[#00000033] sm:!justify-between sm:!text-left">
            <div className="grid">
              <div className="font-semibold">Public Stage</div>
              <div className="grid content-end">
                <div className="font-semibold">
                  {calculatePrice(priceIncrement, String(ExclusiveData?.priceSymbol))}
                </div>
                <div className="text-[18px] text-black5 dark:text-black225_50 ">Limit 10 per wallet</div>
              </div>
            </div>
            <div className=" grid gap-y-5">
              <div className=" mt-2 flex w-[144px] justify-between bg-[#8185891A] p-3 sm:mt-0 ">
                <button
                  className="flex cursor-pointer items-center"
                  disabled={mint <= 1 && true}
                  onClick={() => IncDec('decrement', Number(ExclusiveData?.priceAmount))}
                >
                  <MinusIcons />
                </button>
                <div>{mint}</div>
                <button
                  className="flex cursor-pointer items-center"
                  disabled={mint >= 10}
                  onClick={() => IncDec('increment', Number(ExclusiveData?.priceAmount))}
                >
                  {theme === 'dark' ? <DarkPlusIcons /> : <PlusIcns />}
                </button>
              </div>
              <div className="flex justify-center  sm:justify-end">
                <a href={``} onClick={handleClick}>
                  <Button className={'w-[83.11px]'} hover={true} outlineBorder={false} text={'Mint'} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 block w-full gap-x-11 md:flex md:justify-between lg:mt-0 xxl:mt-[-37px] xll:mt-[-80px]">
        <div className="grid content-center md:w-[50%] ">
          <div className="">
            <strong className="text-[32px]">{ExclusiveData?.creator}</strong>
            <div className="mt-7 text-[18px] leading-[29px] ">
              Lorem ipsum dolor sit amet consectetur. A eu at quis massa tellus. Orci id sed ut volutpat nullam ac dui
              quis. Interdum eget ipsum hac laoreet eu ornare. Ac eleifend porta odio cursus varius aliquam enim ut nec.
              Tincidunt aliquam sit lorem mauris mauris blandit.Pellentesque molestie ultrices nunc pulvinar proin. At
              pretium arcu penatibus cras. Laoreet lorem phasellus est volutpat nunc risus volutpat tellus elementum. At
              velit nulla auctor ullamc Tincidunt aliquam sit lorem mauris mauris blandit.Pellentesque molestie ultrices
              nunc pulvinar proin. At pretium arcu penatibus cras.
            </div>
          </div>
        </div>
        <div className="mt-4 flex h-[350px] w-full self-center sm:w-[400px] xsm:w-full md:mt-0  md:block md:w-[50%] lg:mt-[75px] lg:h-[416px] xxl:mt-[128px] xll:mt-[180px]">
          <Image
            alt="DetailIMG"
            className="h-[350px] w-full rounded-sm sm:w-[350px] xsm:w-full  lg:h-full "
            height={536}
            src={
              ExclusiveData?.creatorImage === '' ||
              ExclusiveData?.creatorImage === undefined ||
              ExclusiveData?.creatorImage === null
                ? IMG.NoImage
                : ExclusiveData?.creatorImage
            }
            width={632}
          />
        </div>
      </div>
    </div>
  )
}
