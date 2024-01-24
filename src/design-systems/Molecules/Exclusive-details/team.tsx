'use client'
import Image from 'next/image'
import { useState } from 'react'
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react'

import { ExclusiveDetailsTabsProps } from './interface'

import { DarkLinkedIcons, DarkTwitterIcons, LinkedInIcons, TwitterIcons } from 'design-systems/Atoms/Icons'
import { IMG } from 'assets/images'

export const Team = ({ theme, TeamsData }: ExclusiveDetailsTabsProps) => {
  const [verticalActive, setVerticalActive] = useState(1)

  const handleVerticalClick = (value: number) => {
    if (value === verticalActive) {
      return
    }
    setVerticalActive(value)
  }

  return (
    <div className="grid md:flex md:gap-x-10 lg:gap-x-20">
      <div className="hidden rounded-sm bg-gradient-to-bl from-[#ff8548] to-[#fff] p-[3px] dark:to-[#000] md:grid">
        <div
          className={` ${
            TeamsData && TeamsData?.length > 4 ? `h-[592.52px] overflow-y-auto` : ` h-full`
          } scroll-hidden radius cursor-pointer  rounded-sm bg-gradient-to-tr  from-[#fff] to-papayawhip70  dark:bg-gradient-to-tr dark:from-[#000] dark:to-[#000] `}
        >
          <TETabs className="radius !mr-0 grid items-center md:w-[497.418px]" vertical>
            {TeamsData?.map((item, key) => {
              return (
                <TETabsItem
                  active={verticalActive === item.id}
                  className={`teams !mt-0 flex gap-x-5 !border-b-0 p-10 text-left !normal-case ${
                    verticalActive === item.id && 'yellow-gradiant-teams-card '
                  }`}
                  key={key}
                  onClick={() => handleVerticalClick(item.id)}
                >
                  <div className="max-h-[80px] w-[100px] ">
                    <Image alt="ProfileIMG" className="!h-[80px] !w-[80px]" src={IMG.personProfile} />
                  </div>
                  <div className="grid content-center">
                    <div className="text-[24px] font-bold text-black dark:text-white">{item.name}</div>
                    <div className="text-[18px] text-black5 dark:text-White255_60">{item.designation}</div>
                  </div>
                </TETabsItem>
              )
            })}
          </TETabs>
        </div>
      </div>
      <div className="scroll-hidden overflow-x-auto rounded-sm bg-gradient-to-bl from-[#ff8548] to-[#fff] p-[3px] dark:to-[#000] md:hidden">
        <div className=" radius2 flex  cursor-pointer rounded-sm  dark:!bg-black ">
          <TETabs className="radius2 !mb-0 !mr-0 flex flex-nowrap items-center">
            {TeamsData?.map((item, key) => {
              return (
                <TETabsItem
                  active={verticalActive === item.id}
                  className={`teams !mt-0 flex gap-x-10 !border-b-0 p-10 !normal-case ${
                    verticalActive === item.id && 'yellow-gradiant-teams-card h-full'
                  }`}
                  key={key}
                  onClick={() => handleVerticalClick(item.id)}
                >
                  <div className="flex max-h-[80px] w-[100px] self-center">
                    <Image alt="ProfileIMG" className="!h-[80px] !w-[80px]" src={IMG.personProfile} />
                  </div>
                  <div className="grid content-center">
                    <div className="text-[24px] font-bold text-black dark:text-white">{item.name}</div>
                    <div className="text-[18px] text-black5 dark:text-White255_60">{item.designation}</div>
                  </div>
                </TETabsItem>
              )
            })}
          </TETabs>
        </div>
      </div>
      <div className="grid content-center md:w-[70%]">
        <TETabsContent>
          {TeamsData?.map((item: any, key: number) => {
            return (
              <TETabsPane key={key} show={verticalActive === item.id}>
                <strong className="text-[32px]">{item.name}</strong>
                <div className="text-[18px] text-black5 dark:text-White255_60">{item.designation}</div>
                <div>
                  <div className="mt-8 text-[19px] leading-[19px]">{item.description}</div>
                  <div className="mt-8 flex cursor-pointer gap-x-8">
                    {theme === 'dark' ? (
                      <>
                        <a href={item.linkedinLink} rel="noreferrer" target="_blank">
                          <DarkLinkedIcons />
                        </a>
                        <a href={item.twitterLink} rel="noreferrer" target="_blank">
                          <DarkTwitterIcons />
                        </a>
                      </>
                    ) : (
                      <>
                        <a href={item.linkedinLink} rel="noreferrer" target="_blank">
                          <LinkedInIcons />
                        </a>
                        <a href={item.twitterLink} rel="noreferrer" target="_blank">
                          <TwitterIcons />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </TETabsPane>
            )
          })}
        </TETabsContent>
      </div>
    </div>
  )
}
