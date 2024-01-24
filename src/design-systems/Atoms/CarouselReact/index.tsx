import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'

import { Typography } from '../Typography'

import { CaroselReactProps } from './interface'

import { IMG } from 'assets/images'

export const CarouselReact = ({
  data,
  className,
  autoPlay,
  showArrows,
  showStatus,
  showThumbs,
  thumbWidth,
  useKeyboardArrows,
}: CaroselReactProps) => {
  return (
    <div>
      <div className="flex max-h-[832px] min-h-fit max-w-[832px] justify-self-center rounded-sm bg-blackE3 p-10 dark:bg-black29">
        <Carousel
          autoPlay={autoPlay}
          className={className}
          showArrows={showArrows}
          showStatus={showStatus}
          showThumbs={showThumbs}
          thumbWidth={thumbWidth}
          useKeyboardArrows={useKeyboardArrows}
        >
          {data?.map((item: any, key: number) => {
            return (
              <div className="rounded-sm" key={key}>
                <Image alt={item.creator} className="h-[100%] w-[100%] rounded-sm " src={item.image} />
              </div>
            )
          })}
        </Carousel>
      </div>
      <div className="flex flex-wrap justify-between gap-x-5 xlg:flex-nowrap">
        {data?.length > 5 ? (
          <>
            {data?.slice(0, 4).map((item: any, key: number) => {
              return (
                <div className="mt-3 h-[145px] w-[145px]" key={key}>
                  <Image alt={item.productName} className="rounded-sm" src={IMG.yellowCreature} />
                </div>
              )
            })}
            <div className="mt-3 flex h-[145px] w-[145px] items-center justify-center rounded-sm bg-grayE3 dark:bg-black29">
              <Typography className="text-[48px] font-bold text-gray81">5+</Typography>
            </div>
          </>
        ) : (
          <>
            {data?.slice(0, 5).map((item: any, key: number) => {
              return (
                <div className="mt-3 h-[145px] w-[145px]" key={key}>
                  <Image alt={item.productName} className="rounded-sm" src={IMG.yellowCreature} />
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
