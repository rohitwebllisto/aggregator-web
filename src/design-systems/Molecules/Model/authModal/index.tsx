import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { Button } from 'design-systems/Atoms/Button'
import { DarkLogout } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { SignUp } from '../sign-up/SignUp'
import { useTheme } from 'next-themes'
interface AuthModalProps {
  authCheck: boolean
  setAuthCheck: (value: boolean) => void
}
export const AuthModal: React.FC<AuthModalProps> = ({ authCheck, setAuthCheck }) => {
  const { theme } = useTheme()
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <>
      <Transition.Root as={Fragment} show={authCheck}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setAuthCheck(false)}>
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
                <Dialog.Panel className="relative max-w-[400px] transform overflow-hidden rounded-[16px] bg-white p-5 text-center font-Rubik shadow-xl transition-all dark:bg-black18 sm:my-8 sm:w-full sm:p-10">
                  <Typography
                    className={`text-[27px] font-bold ${theme === 'dark' ? 'text-[#ffffff]' : 'text-[#000000]'}`}
                  >
                    Please Login First
                  </Typography>
                  <div className="my-5 h-[1px] bg-grayE1 dark:bg-[#A5A5A5]"></div>
                  <Typography className={`text-[18px] ${theme === 'dark' ? 'text-[#ffffff]' : 'text-[#000000]'}`}>
                    Do you want to continue?
                  </Typography>
                  <div className="mt-5 flex justify-center gap-x-10">
                    <Button
                      className="!h-[45px] !w-[40%] rounded-full font-semibold"
                      hover={true}
                      outlineBorder={false}
                      text={'Cancel'}
                      onClick={() => setAuthCheck(false)}
                    />
                    <button
                      className={`class="!h-[45px] !w-[40%] rounded-full  bg-grayE3 p-2   font-semibold !text-black duration-500 ease-in-out  hover:transform hover:bg-gray81  hover:bg-gradient-to-r hover:!text-white active:translate-y-1 active:scale-95 active:duration-300
                      `}
                      onClick={() => {
                        setShowModal(true), setAuthCheck(false)
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {showModal && <SignUp buyActive={false} setShowModal={setShowModal} showModal={showModal} />}
    </>
  )
}
