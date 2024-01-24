'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { useCollection } from 'hooks/apis/useCollection'
import { useMemo, useState } from 'react'
import MyWishListTemplate from '../MyWishListTemplaate'
import { GetCollectionResType } from './collection'
import { useGetWishlist } from 'hooks/apis/useGetWishlist'
import { GetCartProduct } from 'api-services/interfaces/cart'

const MyCollectionPageTemplate: React.FC = () => {
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined

  const router = useRouter()
  const { collection, isLoadingAllCollection } = useCollection(String(email))
  const { isLoadingAllWishlist, wishlist } = useGetWishlist(String(email))

  const [collectionData, setCollectionData] = useState<GetCollectionResType[]>([])
  const [wishlistData, setWishlistData] = useState<GetCartProduct[]>([])

  useMemo(() => {
    if (collection) {
      setCollectionData(collection)
    }
  }, [collection])
  useMemo(() => {
    if (wishlist) {
      setWishlistData(wishlist)
    }
  }, [wishlist])
  return (
    <>
      {collectionData.length > 0 || wishlistData.length > 0 ? (
        <MyWishListTemplate
          collection={collectionData as GetCollectionResType[]}
          wishlist={wishlistData as GetCartProduct[]}
          isLoadingAllCollection={isLoadingAllCollection}
          isLoadingAllWishlist={isLoadingAllWishlist}
        />
      ) : (
        <div className=" first-letter container flex h-[100vh] items-center justify-center">
          <div className="text-center">
            <div className="text-[48px] font-bold">My Collections</div>
            <Typography className="">
              Create, curate, and manage collections of unique NFTs to share and sell.
            </Typography>
            <Button
              className={'mt-10 w-[216px]'}
              hover={true}
              outlineBorder={false}
              text={'Create a Collection'}
              onClick={() => router.push('/store')}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MyCollectionPageTemplate
