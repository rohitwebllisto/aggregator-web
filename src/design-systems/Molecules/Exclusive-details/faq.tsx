/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useMemo, useState } from 'react'

import { ExclusiveDetailsTabsProps } from './interface'

import { AccMInus, AccPlus, DarkAccMinus, DarkAccPlus } from 'design-systems/Atoms/Icons'
import { useExclisiveDetails } from 'hooks/apis/useExclisiveDetails'

export const FAQ = ({ theme }: ExclusiveDetailsTabsProps) => {
  const { FaqLoading, FaqData } = useExclisiveDetails()
  const [FAQ, setFAQ] = useState<any>()
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index)
  }

  useMemo(() => {
    if (FaqData) {
      setFAQ(FaqData)
    }
  }, [FaqLoading, FaqData])

  return (
    <div>
      {FAQ &&
        FAQ.map((item: FaqBlock, key: number) => {
          return (
            <div
              className="mt-8 cursor-pointer border-b-2 border-gray10 dark:border-white225__03"
              key={key}
              onClick={() => handleClick(key)}
            >
              <div className="mb-8 flex  w-full justify-between">
                <div className="text-[24px] font-semibold">{item.question}</div>
                <div className="flex transform flex-wrap content-center delay-200 ease-in-out">
                  {theme === 'dark' ? (
                    <>
                      {activeIndex === key ? (
                        <div>
                          <DarkAccPlus />
                        </div>
                      ) : (
                        <div>
                          <DarkAccMinus />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {activeIndex === key ? (
                        <div>
                          <AccPlus />
                        </div>
                      ) : (
                        <div>
                          <AccMInus />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {activeIndex === key && (
                <div className="mb-8 transform text-[18px] leading-[29px] text-black4 delay-200 ease-in-out dark:text-gray255_80">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}
