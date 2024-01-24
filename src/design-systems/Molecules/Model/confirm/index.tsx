import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'

import { SignUpProps } from '../sign-up/SignUp'

import { Button } from 'design-systems/Atoms/Button'
import { DarkLogout } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

export const Confirm: React.FC<SignUpProps> = ({ showModal, setShowModal }) => {
  const cancelButtonRef = useRef(null)
  const { theme } = useTheme()
  const router = useRouter()
  const Logout = () => {
    const local = localStorage?.getItem('Token')
    localStorage.removeItem('Token')
    localStorage.clear()
    const removedItem = localStorage?.getItem('Token')
    if (removedItem === null && local !== null) {
      toast.success('Logout Success', {
        position: toast.POSITION.TOP_RIGHT,
      })
      router.push('/')
      setTimeout(() => {
        return location.reload()
      }, 2000)
    } else {
      toast.error('Logout Failed', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }
  return (
    <Transition.Root as={Fragment} show={showModal}>
      <Dialog as="div" className="relative z-[100]" initialFocus={cancelButtonRef} onClose={() => setShowModal(false)}>
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
              <Dialog.Panel className="relative h-[250px] !w-[420px] transform overflow-hidden rounded-[16px] bg-white p-5 text-center font-Rubik shadow-xl transition-all  dark:bg-black18 sm:my-8 sm:p-10">
                <Typography className="text-[28px] font-bold !leading-[30px] text-[#FF0000]">Logout</Typography>
                <div className="my-5 h-[1px] bg-grayE1 dark:bg-[#A5A5A5]"></div>
                <Typography className={`text-[18px] ${theme === 'dark' ? 'text-[#ffffff]' : 'text-[#000000]'}`}>
                  Are you sure you want to logout?
                </Typography>
                <div className="mt-5 flex justify-center gap-x-10">
                  <Button
                    className=" !h-[51px] !w-[250px] rounded-full p-4 font-semibold"
                    hover={true}
                    outlineBorder={false}
                    text={'Cancel'}
                    onClick={() => setShowModal(false)}
                  />
                  <button
                    className="flex  !h-[51px] !w-[250px] justify-center gap-x-5 rounded-full bg-[#FF0000] p-4 text-white duration-500 ease-in-out hover:transform hover:bg-danger-600 active:translate-y-1  active:scale-95 active:duration-300 "
                    onClick={() => Logout()}
                  >
                    <Typography className="font-semibold">Logout</Typography>
                    <div>
                      <DarkLogout />
                    </div>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
