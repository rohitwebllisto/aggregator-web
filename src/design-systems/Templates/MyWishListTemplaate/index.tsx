'use client'
import { useState } from 'react'
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react'
import { useRouter } from 'next/navigation'
import { CardData, wishListtab } from 'design-systems/data/data'
import { PageClickEvent } from 'design-systems/Atoms/Pagination/interface'
import Pagination from 'design-systems/Atoms/Pagination'
import { Card } from 'design-systems/Molecules/Card'
import { useGetWishlist } from 'hooks/apis/useGetWishlist'
import { GetCartProduct } from 'api-services/interfaces/cart'
import { CollectionPropsType, GetCollectionResType } from '../MyCollectionPageTemplate/collection'
import { useCollection } from 'hooks/apis/useCollection'
import { Skeleton } from 'design-systems/Atoms/Skeleton'
const MyWishListTemplate = ({
  collection,
  wishlist,
  isLoadingAllCollection,
  isLoadingAllWishlist,
}: CollectionPropsType) => {
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const [basicActive, setBasicActive] = useState<string>(
    (wishlist?.length ?? 0) > 0 ? 'Wishlist' : (collection?.length ?? 0) > 0 ? 'Owned' : 'Wishlist'
  )
  const router = useRouter()
  const [itemOffset, setItemOffset] = useState(0)
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return
    }
    setBasicActive(value)
  }
  const [isTabActive, isSetTabActive] = useState<boolean>(false)
  const { collectionRefetch } = useCollection(String(email), isTabActive)
  const { wishlistRefetch } = useGetWishlist(String(email), isTabActive)
  const itemsPerPage = 9
  const endOffset = itemOffset + itemsPerPage
  const currentItems = CardData.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(CardData.length / itemsPerPage)
  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % CardData.length
    setItemOffset(newOffset)
  }
  const refetchApis = async () => {
    isSetTabActive(true)
  }
  const setValue = (value: string) => {
    setBasicActive(value)
    collectionRefetch()
    wishlistRefetch()
  }
  return (
    <div className="container">
      <div className="text-[36px] font-semibold">My Collections</div>
      <div>
        <TETabs>
          {wishListtab.map((item, key) => {
            return (
              <TETabsItem
                active={basicActive === `${item.tabName}`}
                className={`black:text-White255_60 mr-3 p-4 !text-[20px] text-black5 hover:!bg-[#f1f1f1] ${
                  basicActive === item.tabName &&
                  '!text-black dark:border-white dark:!text-white dark:hover:!text-black'
                } mr-2 `}
                key={key}
                onClick={() => handleBasicClick(item.tabName)}
              >
                {item.tabName}
              </TETabsItem>
            )
          })}
        </TETabs>
        <TETabsContent className="mt-[40px]">
          {wishListtab.map((tabItem, key) => {
            return (
              <div key={key}>
                <TETabsPane show={basicActive === tabItem.tabName}>
                  {(
                    basicActive === 'Wishlist'
                      ? isLoadingAllWishlist
                      : basicActive === 'Owned' && isLoadingAllCollection
                  ) ? (
                    <Skeleton SkeletonType={'card'} limit={6} />
                  ) : (
                    <div
                      className={`grid w-[100%] justify-items-center gap-6 ${
                        currentItems.length > 2 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      } ${currentItems.length === 1 && 'grid-cols-1'} ${currentItems.length === 2 && 'md:grid-cols-2'}`}
                    >
                      <>
                        {basicActive === 'Wishlist' &&
                          wishlist?.map((item: GetCartProduct, key: number) => {
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
                                  component={'Wishlist'}
                                  updatedOn={item.updatedOn}
                                  createDate={item.createdOn}
                                  onClick={() => {
                                    refetchApis(), setValue('Wishlist')
                                  }}
                                  navigate={() => router.push(`/store/store-details?id=${item?.id}`)}
                                />
                              </div>
                            )
                          })}
                        {basicActive === 'Owned' &&
                          collection?.map((data: GetCollectionResType) =>
                            data.nfts.map((item: GetCartProduct, key: number) => {
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
                                    component={'Owned'}
                                    updatedOn={item.updatedOn}
                                    createDate={item.createdOn}
                                    onClick={() => {
                                      refetchApis(), setValue('Owned')
                                    }}
                                    navigate={() => router.push(`/store/store-details?id=${item?.id}`)}
                                  />
                                </div>
                              )
                            })
                          )}
                      </>
                    </div>
                  )}

                  {/* <AddCard data={CardData} onClick={() => router.push(`store/store-details?id=${item.key}`)} /> */}
                </TETabsPane>
              </div>
            )
          })}
        </TETabsContent>
        {basicActive === 'Wishlist' && (wishlist?.length ?? 0) === 0 && (
          <div className=" first-letter container flex h-[28vh] items-center justify-center">
            <div className="text-center">
              <div className="text-[48px] font-bold">Not Found</div>
            </div>
          </div>
        )}
        {basicActive === 'Owned' && (collection?.length ?? 0) === 0 && (
          <div className=" first-letter container flex h-[28vh] items-center justify-center">
            <div className="text-center">
              <div className="text-[48px] font-bold">Not Found</div>
            </div>
          </div>
        )}
        {CardData.length > itemsPerPage && typeof pageCount === 'number' && (
          <div>
            <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
          </div>
        )}
      </div>
    </div>
  )
}
export default MyWishListTemplate
