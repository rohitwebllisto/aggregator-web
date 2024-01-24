import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { useTheme } from 'next-themes'
import { SuccessIcon } from 'design-systems/Atoms/Icons'
interface AuthModalProps {
  isCheck: boolean
  setCheck: (value: boolean) => void
}
export const SuccessModal: React.FC<AuthModalProps> = ({ isCheck, setCheck }) => {
  const { theme } = useTheme()

  return (
    <>
      <Transition.Root as={Fragment} show={isCheck}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setCheck(false)}>
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
            <div className="flex min-h-[63%] justify-center p-4 text-start sm:p-0">
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
                  <div className=" items-center justify-center">
                    <div className="fixed left-0 top-0 mt-[69px] block w-full   ">
                      <div className="flex w-full items-center justify-center">
                        <div className="">
                          <SuccessIcon />
                        </div>
                      </div>
                      <Typography
                        className={`mb-4 justify-center text-center text-[27px] font-bold ${
                          theme === 'dark' ? 'text-[#ffffff]' : 'text-[#16161a]'
                        }`}
                      >
                        Success
                      </Typography>
                      <div className="mt-3.5 flex w-full justify-center text-center">
                        <div className="w-[20rem]">
                          Your report has been sent! Our team will investigate and take action if required. Thank you!
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-56 flex justify-center gap-x-10">
                    <Button
                      className="!h-[45px] !w-[40%] rounded-full font-semibold"
                      hover={true}
                      outlineBorder={false}
                      text={'Cancel'}
                      onClick={() => {
                        setCheck(false)
                      }}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
