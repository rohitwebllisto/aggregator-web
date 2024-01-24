import { Dialog, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { Fragment, useRef } from 'react'

import { CancelIcon, CancelIconDark, CheckIcon, DarkCheckIcon } from 'design-systems/Atoms/Icons'

interface WelcomProps {
  open: boolean
  setOpen: (value: boolean) => void
}
export const WelcomeModel: React.FC<WelcomProps> = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null)
  const { theme } = useTheme()
  return (
    <Transition.Root as={Fragment} show={open}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white p-2 text-left shadow-xl transition-all dark:bg-black18 sm:my-8 sm:w-full sm:max-w-[599px] sm:p-12">
                <div className="flex cursor-pointer justify-end " onClick={() => setOpen(false)}>
                  {theme === 'dark' ? <CancelIconDark /> : <CancelIcon />}
                </div>
                <div className="text-center text-[24px]">
                  <div className="text-[36px] font-bold">Welcome</div>
                  <div>loremipsum@gmail.com</div>
                  <div className="m-8 flex justify-center">{theme === 'dark' ? <DarkCheckIcon /> : <CheckIcon />}</div>
                  <div className="font-semibold text-success-600">Login Successful</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
