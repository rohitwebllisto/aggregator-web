import { Dialog, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Fragment, useRef, useState } from 'react'
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react'

import { Buy } from './Buy'

import { CancelIcon, CancelIconDark } from 'design-systems/Atoms/Icons'
import { Button } from 'design-systems/Atoms/Button'
import { IMG } from 'assets/images'
interface CollectibleProps {
  showModal: boolean
  setShowModal: (value: boolean) => void
}
export const Collectibles: React.FC<CollectibleProps> = ({ showModal, setShowModal }) => {
  const [basicActive, setBasicActive] = useState<string>('Collectibles')
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
  const cancelButtonRef = useRef(null)
  const TabData = [
    { key: 0, tabName: 'Collectibles' },
    { key: 1, tabName: 'Tokens' },
  ]
  const { theme } = useTheme()
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return
    }
    setBasicActive(value)
  }

  return (
    <>
      <Transition.Root as={Fragment} show={showModal}>
        <Dialog as="div" className="relative z-[100]" initialFocus={cancelButtonRef} onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[100] overflow-y-auto bg-transparentPapayawhip dark:bg-darkTransparentPapayawhip">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white p-5 text-left shadow-xl transition-all dark:bg-black18 sm:my-8 sm:w-full sm:max-w-[642.781px] sm:p-10">
                  <div className="flex items-start justify-between">
                    <Image alt={'profileIMG'} className="h-[50px] w-[50px] rounded-full" src={IMG.personProfile} />

                    <div className="flex items-center justify-between  pl-5 pr-5">
                      <select className="bg-[#ffffff00]" id="cars" name="cars">
                        <option value="Popular">Ethereum</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                      </select>
                    </div>
                    <div className="flex items-center" onClick={() => setShowModal(false)}>
                      {theme === 'dark' ? <CancelIconDark /> : <CancelIcon />}
                    </div>
                  </div>
                  <div className="m-9 grid justify-center gap-y-2 text-center">
                    <strong className="text-[36px]">$0.00</strong>
                    <div className="text-[18px] text-gray40 dark:text-white">0x00d...........9b4b</div>
                  </div>
                  <div className="mt-[50px] w-full">
                    <TETabs className="widthTab flex w-full justify-center !overflow-x-auto">
                      {TabData.map((item, key) => {
                        return (
                          <TETabsItem
                            active={basicActive === `${item.tabName}`}
                            className={`w-full border-none bg-whiteF4  p-6 text-center !text-[16px] !text-black hover:bg-whiteF4  ${
                              basicActive === item.tabName && 'bg-gradient-to-r from-[#FEB331] to-[#FF8548]'
                            }  `}
                            key={key}
                            onClick={() => handleBasicClick(item.tabName)}
                          >
                            {item.tabName}
                          </TETabsItem>
                        )
                      })}
                    </TETabs>
                    <TETabsContent className="mt-[40px]">
                      <TETabsPane show={basicActive === 'Collectibles'}>
                        <div>
                          <Image alt="pic" className="h-[248px] w-[248px] rounded-[8px]" src={IMG.cardGirl} />
                          <div className="m-10 flex justify-evenly gap-x-2">
                            <Button
                              className={'w-[79px] p-3'}
                              hover={true}
                              outlineBorder={false}
                              text={'Buy'}
                              onClick={() => {
                                setShowBuyModal(true), setShowModal(false)
                              }}
                            />
                            <Button
                              className={'w-[88px] !border-[1px] p-3'}
                              hover={false}
                              outlineBorder={true}
                              text={'Send'}
                            />
                            <Button
                              className={'w-[109px] !border-[1px] p-3'}
                              hover={false}
                              outlineBorder={true}
                              text={'Recieve'}
                            />
                          </div>
                        </div>
                      </TETabsPane>
                      <TETabsPane show={basicActive === 'Tokens'}>Token</TETabsPane>
                    </TETabsContent>
                    <div className="mt-7 flex justify-center gap-x-7 text-center">
                      <div>
                        <div className="text-[18px] opacity-60">Privacy Policy</div>
                        <div>&#9679;</div>
                      </div>
                      <div>
                        <div className="text-[18px] opacity-60">Terms & Conditions</div>
                        <div>&#9679;</div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Buy setShowBuyModal={setShowBuyModal} showBuyModal={showBuyModal} />
    </>
  )
}
