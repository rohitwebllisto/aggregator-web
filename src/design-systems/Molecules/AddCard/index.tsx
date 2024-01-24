import { useRouter } from 'next/navigation'
import { Card } from '../Card'

import { AddCardProps } from './interface'

import { Skeleton } from 'design-systems/Atoms/Skeleton'
import { GetCartDataRes, GetCartProduct } from 'api-services/interfaces/cart'
import { useGetCart } from 'hooks/apis/useGetCart'
import { useState } from 'react'

export const AddCard = ({ data, isLoading, status }: AddCardProps) => {
  const router = useRouter()
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const [refetchObj, setRefetchObj] = useState(false)
  const { refetch } = useGetCart(String(email), refetchObj)

  const refetchApis = async () => {
    setRefetchObj(true)
    await refetch()
  }
  return (
    <div
      className={`grid w-[100%] justify-items-center gap-6 ${
        data?.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      } ${data?.length === 1 && 'grid-cols-1'} ${data?.length === 2 && 'md:grid-cols-2'}`}
    >
      {/* <div
                         className={`grid w-[100%] justify-items-center gap-6 ${
                           data.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                         } ${data.length === 1 && 'grid-cols-1'} ${data.length === 2 && 'md:grid-cols-2'}`}
                       > */}
      {!isLoading ? (
        <>
          {data?.map((item: GetCartDataRes, key: number) => {
            return (
              <div key={key}>
                <Card
                  id={item.productDetails.id}
                  title={item.productDetails.title}
                  status={status}
                  categories={item.productDetails.category}
                  like={item.productDetails.liked}
                  image={item.productDetails.image}
                  price={item.productDetails.priceAmount}
                  symbol={item.productDetails.priceSymbol}
                  isCart={item.productDetails.isCart}
                  updatedOn={item.productDetails.updatedOn}
                  createDate={item.productDetails.createdOn}
                  component={'addtocart'}
                  onClick={refetchApis}
                  navigate={() => router.push(`/store/store-details?id=${item?.productDetails.id}`)}
                />
              </div>
            )
          })}
        </>
      ) : (
        <>
          <Skeleton SkeletonType={'card'} limit={3} />
        </>
      )}
    </div>
  )
}
