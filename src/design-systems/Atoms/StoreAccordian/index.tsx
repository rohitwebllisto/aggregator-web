import { useState } from 'react'
import { TECollapse } from 'tw-elements-react'

import { Skeleton } from '../Skeleton'
import { StoreAccProps } from './interface'
import { calculatePrice } from 'hooks/price'

export const StoreAccordian = ({ data, isLoading }: StoreAccProps) => {
  const [activeElement, setActiveElement] = useState<string>('details')
  const handleClick = (value: string) => {
    if (value === activeElement) {
      setActiveElement('')
    } else {
      setActiveElement(value)
    }
  }

  const createdDate = data?.createdOn?.split('T')
  const upDateOn = data?.updatedOn?.split('T')
  // if(data.length > 0){
  //   const parts = data?.createdOn?.split("T");
  //   const datePart = parts[0]; // "2023-07-19"
  //   const timePart = parts[1]; // "10:30:12.225666Z"
  //   console.log("Date:", datePart);
  //   console.log("Time:", timePart);
  // }
  const Catogery = data?.category
    ?.map((item: any) => {
      return item.categoryName
    })
    .join(', ')
  const splitString = data?.title?.split('TokenID: ')
  return (
    <div className="mt-14 grid gap-y-10">
      <div id="accordionExample">
        <div className=" rounded-[3px] border-[0.5px] border-grayD1 bg-white dark:border-white225__03  dark:bg-black">
          <h2 className="mb-0" id="headingOne">
            <button
              aria-controls="collapseOne"
              aria-expanded="true"
              className={`${
                activeElement === 'user' &&
                ` [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-white  dark:[box-shadow:inset_0_-1px_0_rgba(255,255,255,0.30)] `
              } group relative flex w-full items-center border-0  px-7 py-4 text-left font-semibold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-black dark:text-white`}
              type="button"
              onClick={() => handleClick('user')}
            >
              About {data?.creator}
              {/* <div className={`h-[1px] bg-grayD1`}></div> */}
              <span
                className={`${
                  activeElement === 'user' ? `-mr-1 rotate-[-180deg]` : `rotate-0 fill-[#212529]  dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            className="!mt-0 !h-[auto] !rounded-b-none !shadow-none transition-transform duration-200 ease-in-out"
            show={activeElement === 'user'}
          >
            <div className="px-7 py-4">
              Lorem ipsum dolor sit amet consectetur. Purus massa lorem etiam a feugiat in etiam turpis orci. Amet
              sagittis tristique scelerisque imperdiet amet sit commodo tincidunt at. Malesuada semper cursus aliquam
              nisl leo mattis consectetur. Donec at enim in a iaculis. Et senectus quis venenatis fermentum. Gravida
              quam ornare elementum ipsum id.
            </div>
          </TECollapse>
        </div>
      </div>
      <div className=" rounded-[3px] border-[0.5px] border-grayD1 bg-white dark:border-white225__03  dark:bg-black">
        <h2 className="mb-0" id="headingOne">
          <button
            aria-controls="collapseOne"
            aria-expanded="true"
            className={`${
              activeElement === 'details' &&
              ` [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-white  dark:[box-shadow:inset_0_-1px_0_rgba(255,255,255,0.30)]`
            }group relative flex w-full items-center border-0  px-7 py-4 text-left font-semibold transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-black dark:text-white`}
            type="button"
            onClick={() => handleClick('details')}
          >
            Details
            <span
              className={`${
                activeElement === 'details' ? `-mr-1 rotate-[-180deg]` : `rotate-0 fill-[#212529]  dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </h2>
        <TECollapse
          className="!mt-0 !h-[auto] !rounded-b-none !shadow-none transition-transform duration-200 ease-in-out"
          show={activeElement === 'details'}
        >
          <div className="px-7 py-4">
            {data && !isLoading ? (
              <>
                {' '}
                <AccDetails details={data?.creator} label={'Creator'} />
                <AccDetails details={data?.createdOn && createdDate[0]} label={'Created on'} />
                <AccDetails details={data?.updatedOn && upDateOn[0]} label={'Updated on'} />
                <AccDetails details={splitString && splitString[1]} label={'Token Id'} />
                <AccDetails details={data?.status} label={'status'} />
                <AccDetails details={Catogery} label={'Category'} />
                <AccDetails details={data?.description} label={'Description'} />
                <AccDetails details={`${calculatePrice(data?.priceAmount, data?.priceSymbol)}`} label={'Price'} />
              </>
            ) : (
              <div>
                <Skeleton SkeletonType={'line'} className="grid !gap-y-4" limit={5} />
              </div>
            )}

            <div></div>
            {/* <table>
                <tbody>

              <tr>
                <td>Created On:</td>
                <td>{data.createdOn}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
                </tbody>
            </table> */}
          </div>
        </TECollapse>
      </div>
    </div>
  )
}

export const AccDetails = ({ details, label }: { details: any; label: string }) => {
  return (
    <>
      {(details !== undefined || details !== '' || details !== null) && (
        <div className={`grid grid-cols-3 gap-x-11 py-2 `}>
          <div>{label}:</div>
          <div
            className={`col-span-2  flex justify-end ${
              label === 'Price' &&
              `bg-gradient-to-r from-oragneFE to-orangeFF bg-clip-text text-[25px] font-bold text-transparent`
            }`}
          >
            {details}
          </div>
        </div>
      )}
    </>
  )
}
