'use client'
import { useState } from 'react'
import Image from 'next/image'

import { GalleryProps, dataProps } from './interface'

export const Gallery = ({ className, data }: GalleryProps) => {
  const [show, setShow] = useState<number>(0)

  return (
    <div className={`${className} mt-9 grid gap-x-6 gap-y-6 sm:flex`}>
      {data?.map((item: dataProps, key: number) => {
        return (
          <div className="relative" key={key}>
            <div
              className={`group relative max-h-[260px] w-[100%]  transform duration-500 ease-in-out sm:max-h-[600px] md:max-h-[740px] ${
                show === item.key && 'firstChild h-[100%] w-[100%] sm:h-[100%] sm:w-[100%]'
              } `}
              onMouseEnter={() => setShow(item.key)}
              onMouseLeave={() => setShow(0)}
            >
              <Image
                alt="IMG"
                className="relative h-[150px] w-[100%] transform rounded-2xl delay-150 duration-1000 ease-in-out group-[.firstChild]:h-[260px] sm:!h-[600px] sm:w-[236.08px]  sm:object-none sm:group-hover:w-[550.17px] sm:group-[.firstChild]:!h-[600px] sm:group-[.firstChild]:w-[550.17px] md:!h-[740px] md:group-[.firstChild]:!h-[740px]  "
                src={item.image}
              />
              <div className="g absolute inset-0 rounded-2xl bg-black2 opacity-70  duration-500 ease-in-out hover:transform group-hover:bg-gradient-to-b group-hover:from-black group-hover:to-black  group-[.firstChild]:hidden"></div>
              <div className="absolute inset-0 hidden rounded-2xl bg-gradient-to-t from-black opacity-70 duration-500 ease-in-out  group-hover:flex group-[.firstChild]:flex"></div>
              <div className="absolute bottom-[2px] flex h-full  w-[100%] transform items-end duration-500 ease-in-out">
                <div className="inset-0 flex w-full flex-nowrap  justify-between duration-1000 ease-in hover:transform hover:flex-wrap group-hover:p-[2%] group-[.firstChild]:flex-wrap group-[.firstChild]:p-[7%] sm:mb-[125px] sm:group-[.firstChild]:mb-[60px] ">
                  <div className="leading-none to-[rgba(0, 0, 0, 0.63)] relative  -left-[0px] flex w-full transform items-center bg-gradient-to-r from-[#FF8548] pl-[2%] text-[20px] font-semibold text-white duration-700 ease-in-out group-hover:left-0  group-hover:w-auto group-hover:rotate-0 group-hover:flex-wrap group-hover:items-start group-hover:bg-none group-[.firstChild]:left-0 group-[.firstChild]:w-auto group-[.firstChild]:rotate-0 group-[.firstChild]:flex-wrap group-[.firstChild]:items-start group-[.firstChild]:bg-none sm:-rotate-90 sm:text-[25px]  md:text-[36px] xl:-left-[44px] xll:-left-[72px] ">
                    <div className="ml-3 cursor-pointer py-[15px] group-hover:ml-0 group-hover:py-0 group-[.firstChild]:ml-0 group-[.firstChild]:py-0">
                      {item.categoryName}
                    </div>
                  </div>
                  <div className="hidden transform text-white duration-150  ease-out group-hover:visible group-[.firstChild]:grid ">
                    <p className="text-sm font-semibold sm:text-[20px] md:text-4xl">{item.total}</p>
                    <p className="text-sm text-black255 sm:text-[20px] md:text-2xl">{item.collection}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
