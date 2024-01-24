import { Dialog, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { ChangeEvent, Fragment, useRef, useState } from 'react'

import { WelcomeModel } from './WelcomeModel'

import { CancelIcon, CancelIconDark, DarkMailIcon, MailIconLarge } from 'design-systems/Atoms/Icons'

interface OtpProps {
  otpModel: boolean
  setOtpModel: (value: boolean) => void
}
export const Otp: React.FC<OtpProps> = ({ otpModel, setOtpModel }) => {
  const [welcome, setWelcome] = useState<boolean>(false)
  const [int, setInt] = useState<string>('')
  const cancelButtonRef = useRef(null)
  const { theme } = useTheme()

  return (
    <>
      <Transition.Root as={Fragment} show={otpModel}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white p-2 text-left shadow-xl transition-all dark:bg-black18 sm:my-8 sm:w-full sm:max-w-[642.781px] sm:p-12">
                  <div className="flex cursor-pointer justify-end " onClick={() => setOtpModel(false)}>
                    {theme === 'dark' ? <CancelIconDark /> : <CancelIcon />}
                  </div>
                  <div className="">
                    <div className="grid justify-center">{theme === 'dark' ? <DarkMailIcon /> : <MailIconLarge />}</div>
                    <div className="m-8 text-center text-[24px] text-black5 dark:text-white">
                      <div>Please enter the code sent to</div>
                      <strong>loremipsum@gmail.com</strong>
                    </div>
                    <div className=" mb-9 grid w-full gap-x-1 gap-y-4 sm:flex sm:justify-between">
                      {[1, 2, 3, 4, 5, 6].map((item, key) => {
                        return (
                          <div key={key}>
                            <input
                              className=" h-[60px] w-full rounded-sm border-2 border-grayE1 p-3 text-center text-[24px] font-semibold sm:w-[60px] "
                              placeholder=""
                              type="number"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setInt(e.target.value)}
                              onClick={() => {
                                key === 5 && setWelcome(true), setOtpModel(false)
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <WelcomeModel open={welcome} setOpen={setWelcome} />
    </>
  )
}
