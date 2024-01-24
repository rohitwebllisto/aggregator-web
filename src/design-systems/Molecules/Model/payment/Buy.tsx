import { Dialog, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Fragment, useRef, useState } from 'react'

import { Collectibles } from './Collectibles'
import { PaymentMode } from './PaymentMode'

import {
  BackModelIcons,
  CancelIcon,
  CancelIconDark,
  Crypto,
  DownArrow,
  PaycardIcon,
  ThunderSmallBlueIcon,
} from 'design-systems/Atoms/Icons'
import { Button } from 'design-systems/Atoms/Button'
import { PaymentCard } from 'design-systems/Molecules/PaymentCard'
interface BuyProps {
  showBuyModal: boolean
  setShowBuyModal: (value: boolean) => void
}
export const Buy: React.FC<BuyProps> = ({ setShowBuyModal, showBuyModal }) => {
  const [back, setBack] = useState<boolean>(false)
  const [pay, setPay] = useState<boolean>(false)
  const cancelButtonRef = useRef(null)
  const { theme } = useTheme()

  return (
    <>
      <Transition.Root as={Fragment} show={showBuyModal}>
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
                    <div
                      onClick={() => {
                        setBack(true), setShowBuyModal(false)
                      }}
                    >
                      <BackModelIcons />
                    </div>

                    <div className="flex items-center justify-between  pl-5 pr-5">
                      <select className="bg-[#ffffff00]" id="cars" name="cars">
                        <option value="Popular">Ethereum</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                      </select>
                    </div>
                    <div className="flex items-center" onClick={() => setShowBuyModal(false)}>
                      {theme === 'dark' ? <CancelIconDark /> : <CancelIcon />}
                    </div>
                  </div>
                  <div>
                    <div className="mt-12 flex items-center justify-between">
                      <div className="text-[18px]">Buy Crypto</div>
                      <div>
                        <Crypto />
                      </div>
                    </div>
                    <PaymentCard number={10000} text={'You Spend'} />
                    <PaymentCard number={154.863771} text={'You Get'} />
                    <div className="mt-3 flex items-center justify-between border-[1px] border-grayE1 p-5">
                      <div>1 HBAR = 4.18 INR</div>
                      <div className="flex gap-x-2">
                        By
                        <span>
                          <ThunderSmallBlueIcon />
                        </span>
                        Itez
                      </div>
                    </div>
                    <div className="mt-8 grid gap-y-4">
                      <strong className="text-[18px]">Pay Using</strong>
                      <div
                        className="flex cursor-pointer items-center justify-between border-[1px] border-grayE1 p-5"
                        onClick={() => setPay(true)}
                      >
                        <div className="flex justify-between gap-x-3">
                          <div>
                            <PaycardIcon />
                          </div>
                          <div>Credit Card</div>
                        </div>
                        <DownArrow />
                      </div>
                    </div>
                    <Button className={'mb-14 mt-14 w-full p-4'} hover={true} outlineBorder={false} text={'Buy Now'} />
                  </div>
                  <div className="mb-2 flex justify-center gap-x-7 text-center">
                    <div>
                      <div className="text-[18px] opacity-60">Privacy Policy</div>
                      <div>&#9679;</div>
                    </div>
                    <div>
                      <div className="text-[18px] opacity-60">Terms & Conditions</div>
                      <div>&#9679;</div>
                    </div>
                  </div>
                  {pay && (
                    <div>
                      <PaymentMode pay={pay} setPay={setPay} theme={theme} />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {back && <Collectibles setShowModal={setBack} showModal={back} />}
    </>
  )
}
