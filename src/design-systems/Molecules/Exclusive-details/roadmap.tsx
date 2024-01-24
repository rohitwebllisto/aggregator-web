'use client'

import { ExclusiveDetailsTabsProps } from './interface'

import { RoadmapData } from 'design-systems/data/data'

export const RoadMap = ({ theme }: ExclusiveDetailsTabsProps) => {
  return (
    <div className="mt-20">
      <div className="grid">
        {RoadmapData.map((item, key) => {
          const middleIndex = Math.floor(RoadmapData.length / 2)
          return (
            <>
              <div className="xs:!hidden md:!inline">
                <div className="flex justify-between xs:!gap-[10px] xsm:!gap-[14px] lg:!gap-11" key={key}>
                  <div className=" flex items-center ">
                    <div className="">
                      <strong className="text-[24px]">{item.launchPoint}</strong>
                      <div className="text-[18px] text-black5 dark:text-[#FFFFFF99]">{item.mint}</div>
                    </div>
                    <div className="flex items-center xs:!ml-0  md:!ml-[20%]">
                      <div
                        className={`h-[20px] w-[20px] rounded-full ${
                          key % 2 === 0 ? `bg-black dark:bg-white` : `bg-gray81`
                        }
                    ${middleIndex === key && '!bg-orange'}`}
                      ></div>
                      <div
                        className={`h-[3px] w-[100px] xs:!w-10 xsm:!w-16 md:!w-[100px] ${
                          key % 2 === 0 ? `bg-black dark:bg-white` : `bg-gray81`
                        } ${middleIndex === key && '!bg-orange'} `}
                      ></div>
                      {theme !== 'dark' ? (
                        <div className={`${key === RoadmapData.length - 1 && 'grid'}`}>
                          {key === 0 && (
                            <div
                              className={`${
                                RoadmapData.length === 1 ? `triangleGold` : 'triangleOdd'
                              } w-[50px] xl:w-[60px] xxl:w-[70px]`}
                              style={{ transform: 'rotate(180deg)' }}
                            ></div>
                          )}
                          <div
                            className={`h-[200px] w-[50px] xs:!h-[504px] xsm:!h-[313px] md:!h-[200px] xl:w-[60px] xxl:w-[70px]  ${
                              key % 2 === 0 ? 'bg-black' : 'bg-gray81'
                            } ${
                              middleIndex + 1 === key
                                ? 'triangleGold'
                                : ` ${key === 0 ? '' : key % 2 === 0 ? 'triangleEven' : `triangleOdd`} ${
                                    middleIndex === key && '!bg-orange'
                                  } `
                            }`}
                          ></div>
                          {key === RoadmapData.length - 1 && (
                            <div
                              className={`${
                                middleIndex === RoadmapData.length - 1
                                  ? `triangleGold`
                                  : `${key % 2 === 0 ? 'triangleOdd' : `triangleEven`}`
                              } w-[50px] xl:w-[60px] xxl:w-[70px]`}
                            ></div>
                          )}
                        </div>
                      ) : (
                        <div className={`${key === RoadmapData.length - 1 && 'grid'}`}>
                          {key === 0 && (
                            <div
                              className={`${
                                RoadmapData.length === 1 ? `triangleGold` : 'triangleOddDark'
                              } w-[50px] xl:w-[60px] xxl:w-[70px]`}
                              style={{ transform: 'rotate(180deg)' }}
                            ></div>
                          )}
                          <div
                            className={`h-[200px] w-[50px] xl:w-[60px] xxl:w-[70px] ${
                              key % 2 === 0 ? 'bg-white' : 'bg-gray81'
                            } ${
                              middleIndex + 1 === key
                                ? 'triangleGold'
                                : `${key === 0 ? '' : key % 2 === 0 ? 'triangleEven' : `triangleOddDark`} ${
                                    middleIndex === key && '!bg-orange'
                                  } `
                            }`}
                          ></div>
                          {key === RoadmapData.length - 1 && (
                            <div
                              className={`${
                                middleIndex === RoadmapData.length - 1
                                  ? `triangleGold`
                                  : `${key % 2 === 0 ? 'triangleOddDark' : `triangleEven`}`
                              } w-[50px] xl:w-[60px] xxl:w-[70px]`}
                            ></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid w-[40%] content-center md:w-[50%] lg:w-[70%]">{item.Details}</div>
                </div>
              </div>
              <div className="md:!hidden">
                <div className="flex justify-between xs:!gap-[10px] xsm:!gap-[14px] lg:!gap-11" key={key}>
                  <div className=" flex items-center ">
                    <div className="flex items-center xs:!ml-0  md:!ml-[20%]">
                      {theme !== 'dark' ? (
                        <div className={`${key === RoadmapData.length - 1 && 'grid'}`}>
                          {key === 0 && (
                            <div
                              className={`${
                                RoadmapData.length === 1 ? `triangleGold-mobile` : 'triangleOdd-mobile'
                              } xs:!w-[33px] xsm:!w-[44px]`}
                              style={{ transform: 'rotate(180deg)' }}
                            ></div>
                          )}
                          <div
                            className={`h-[200px] xs:!h-[178.78px] xs:!w-[33px] sm:!h-[157.78px] xsm:!w-[44px] ${
                              key % 2 === 0 ? 'bg-black' : 'bg-gray81'
                            } ${
                              middleIndex + 1 === key
                                ? 'triangleGold-mobile'
                                : ` ${key === 0 ? '' : key % 2 === 0 ? 'triangleEven-mobile' : `triangleOdd-mobile`} ${
                                    middleIndex === key && '!bg-orange'
                                  }`
                            }`}
                          ></div>
                          {key === RoadmapData.length - 1 && (
                            <div
                              className={`${
                                middleIndex === RoadmapData.length - 1
                                  ? `triangleGold-mobile`
                                  : `${key % 2 === 0 ? 'triangleOdd-mobile' : `triangleEven-mobile`}`
                              } xs:!w-[33px] xsm:!w-[44px]`}
                            ></div>
                          )}
                        </div>
                      ) : (
                        <div className={`${key === RoadmapData.length - 1 && 'grid'}`}>
                          {key === 0 && (
                            <div
                              className={`${
                                RoadmapData.length === 1 ? `triangleGold-mobile` : 'triangleOddDark-mobile'
                              } xs:!w-[33px] xsm:!w-[44px]`}
                              style={{ transform: 'rotate(180deg)' }}
                            ></div>
                          )}
                          <div
                            className={`h-[200px] xs:!h-[178.78px] xs:!w-[33px] sm:!h-[157.78px] xsm:!w-[44px] ${
                              key % 2 === 0 ? 'bg-white' : 'bg-gray81'
                            } ${
                              middleIndex + 1 === key
                                ? 'triangleGold-mobile'
                                : `${
                                    key === 0 ? '' : key % 2 === 0 ? 'triangleEven-mobile' : `triangleOddDark-mobile`
                                  } ${middleIndex === key && '!bg-orange'} `
                            }`}
                          ></div>
                          {key === RoadmapData.length - 1 && (
                            <div
                              className={`${
                                middleIndex === RoadmapData.length - 1
                                  ? `triangleGold-mobile`
                                  : `${key % 2 === 0 ? 'triangleOddDark-mobile' : `triangleEven-mobile`}`
                              } xs:!w-[33px] xsm:!w-[44px] `}
                            ></div>
                          )}
                        </div>
                      )}
                      <div
                        className={`h-[3px] xs:!w-[36px] sm:!w-[62px]  xsm:!w-24 md:!w-[100px] ${
                          key % 2 === 0 ? `bg-black dark:bg-white` : `bg-gray81`
                        } ${middleIndex === key && '!bg-orange'} `}
                      ></div>
                      <div
                        className={`h-[20px] w-[20px] rounded-full ${
                          key % 2 === 0 ? `bg-black dark:bg-white` : `bg-gray81`
                        }
                        ${middleIndex === key && '!bg-orange'}`}
                      ></div>
                    </div>
                  </div>
                  <div className="grid h-[118px] w-[285px] content-start xs:!w-[177px] sm:!w-[208px] xsm:mt-3.5 xsm:!w-[225px]">
                    <div className="">
                      <strong className="text-[18px] font-bold leading-[18px]">{item.launchPoint}</strong>
                      <div className="text-[14px] font-normal leading-[21px] text-black5 dark:text-[#FFFFFF99]">
                        {item.mint}
                      </div>
                    </div>
                    <div className="leading-5 mt-2 grid text-[14px] font-normal">
                      {item.Details.split(' ').slice(0, 21).join(' ')}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}
