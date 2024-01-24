/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react'
import { useSearchParams } from 'next/navigation'

import { IMG } from 'assets/images'
import { FAQ } from 'design-systems/Molecules/Exclusive-details/faq'
import { Mint } from 'design-systems/Molecules/Exclusive-details/mint'
import { RoadMap } from 'design-systems/Molecules/Exclusive-details/roadmap'
import { Team } from 'design-systems/Molecules/Exclusive-details/team'
import { ExclusiveDetailsTabsData } from 'design-systems/data/data'
import { useProductById } from 'hooks/apis/useProductById'
import { useExclisiveDetails } from 'hooks/apis/useExclisiveDetails'
import { ProductNFTItem } from 'api-services/interfaces/cart'
import { useWishlist } from 'hooks/apis/useWishList'
import { useAuthModal } from 'hooks/apis/useAuthModal'
import { AuthModal } from 'design-systems/Molecules/Model/authModal'
const ExclusiveDetailsTemplate: React.FC = () => {
  const searchParams = useSearchParams()
  const IDString = searchParams.get('id') || '0'
  const ID = parseInt(IDString, 10)
  const { isLoadingProductID, productID, refetchProductById } = useProductById(ID)
  const { isLoadingTeams, teamData } = useExclisiveDetails()
  const [ExclusiveData, setExclusiveData] = useState<ProductNFTItem>()
  const [teams, setTeams] = useState<any>([])
  const { postWishlist } = useWishlist()
  const { authCheck, setAuthCheck } = useAuthModal()
  const { theme } = useTheme()
  const [basicActive, setBasicActive] = useState<string>('Mint')
  useMemo(() => {
    if (productID) {
      setExclusiveData(productID)
    }
  }, [isLoadingProductID, productID])

  useMemo(() => {
    if (teamData) {
      setTeams(teamData)
    }
  }, [isLoadingTeams, teamData])

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return
    }
    setBasicActive(value)
  }
  const splitString =
    ExclusiveData?.title && ExclusiveData?.title?.includes('TokenID') && ExclusiveData?.title?.split('TokenID: ')

  const addToWishlistItem = async (id: number) => {
    const email = typeof window !== 'undefined' ? window.localStorage?.getItem('Email') : null
    const accessToken = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
    if (accessToken !== null) {
      await postWishlist(id, String(email))
      refetchProductById()
    } else {
      setAuthCheck(true)
    }
  }
  return (
    <div className="w-full">
      <div className="relative h-[540px]">
        <div className="relative">
          <div className=" !h-[540px] w-full">
            <Image
              alt={'CoverIMG'}
              className=" !h-[540px] w-full"
              height={540}
              src={
                ExclusiveData?.creatorImage === null ||
                ExclusiveData?.creatorImage === '' ||
                ExclusiveData?.creatorImage === undefined
                  ? IMG.NoImage
                  : ExclusiveData?.creatorImage
              }
              width={1920}
            />
          </div>
        </div>
        <div className="container absolute bottom-10 grid w-full justify-center text-center sm:flex sm:justify-between sm:text-start">
          <div className="grid gap-y-3 ">
            <div className="!h-[104px] !w-[104px]">
              <Image
                alt="ProfileIMG"
                className="!h-[104px] !w-[104px]  justify-self-center rounded-[4px] border-2 border-white sm:!justify-self-start"
                height={104}
                src={
                  ExclusiveData?.image === null || ExclusiveData?.image === '' || ExclusiveData?.image === undefined
                    ? IMG.NoImage
                    : ExclusiveData?.image
                }
                width={104}
              />
            </div>
            <div className="text-[42px] font-bold text-white">
              {ExclusiveData?.title && ExclusiveData?.title.includes('TokenID') ? splitString : ExclusiveData?.title}
            </div>
            <div className="text-[18px] text-White255_60  ">{ExclusiveData?.creator}</div>
          </div>
          <div className="mt-6 flex self-end justify-self-center sm:!justify-self-start">
            <button className="w-[127px] bg-white p-4 text-[16px] font-semibold text-black">Mint Now</button>
          </div>
        </div>
      </div>
      <div>
        <div className="container mb-3 mt-3">
          <TETabs className="w-full flex-nowrap overflow-x-auto">
            {ExclusiveDetailsTabsData.map((item, key) => {
              return (
                <TETabsItem
                  active={basicActive === `${item.header}`}
                  className={` black:text-White255_60 mr-5 p-4  !text-[20px] text-black5 hover:!bg-[#f1f1f1] ${
                    basicActive === item.header &&
                    '!text-black dark:border-white dark:!text-white dark:hover:!text-black'
                  }`}
                  key={key}
                  onClick={() => handleBasicClick(item.header)}
                >
                  {item.header}
                </TETabsItem>
              )
            })}
          </TETabs>

          <TETabsContent className="mt-[40px]">
            <TETabsPane show={basicActive === 'Mint'}>
              <Mint
                ExclusiveData={ExclusiveData}
                theme={theme}
                onClick={() => addToWishlistItem(Number(ExclusiveData?.id))}
                setAuth={setAuthCheck}
              />
            </TETabsPane>
            <TETabsPane show={basicActive === 'Roadmap'}>
              <RoadMap ExclusiveData={ExclusiveData} theme={theme} />
            </TETabsPane>
            <TETabsPane show={basicActive === 'Teams'}>
              <Team TeamsData={teams} theme={theme} />
            </TETabsPane>
            <TETabsPane show={basicActive === 'FAQ'}>
              <FAQ ExclusiveData={ExclusiveData} theme={theme} />
            </TETabsPane>
          </TETabsContent>
        </div>
      </div>
      <AuthModal setAuthCheck={setAuthCheck} authCheck={authCheck} />
    </div>
  )
}

export default ExclusiveDetailsTemplate
