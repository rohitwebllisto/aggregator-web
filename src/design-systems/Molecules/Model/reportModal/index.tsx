import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { Button } from 'design-systems/Atoms/Button'
import { DarkLogout } from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { SignUp } from '../sign-up/SignUp'
import { useTheme } from 'next-themes'
import { Loader } from 'design-systems/Atoms/Loader'
import { usePostReport } from 'hooks/apis/usePostReport'
interface AuthModalProps {
  isCheck: boolean
  setCheck: (value: boolean) => void
  setIsLoading: (value: boolean) => void
  setIsSuccess: (value: boolean) => void
  setIsError: (value: boolean) => void
}
export const ReportModal: React.FC<AuthModalProps> = ({
  isCheck,
  setCheck,
  setIsLoading,
  setIsSuccess,
  setIsError,
}) => {
  const { theme } = useTheme()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isReportValue, setReportValue] = useState<string>('')
  const [isValue, setValue] = useState<boolean>(false)
  const { postReport, isLoadingReport, isError, isSuccessReport } = usePostReport()
  const email = typeof window !== 'undefined' ? localStorage?.getItem('Email') : undefined
  const onhandleReport = (value: string) => {
    if (value !== '') {
      setReportValue(value)
      setValue(false)
    } else {
      setValue(true)
    }
  }
  useMemo(() => {
    if (isLoadingReport) {
      setIsLoading(isLoadingReport)
    }
    if (isSuccessReport) {
      setIsSuccess(isSuccessReport)
    }
    if (isError) {
      setIsError(true)
    }
  }, [isLoadingReport, isSuccessReport, isError, setIsLoading, setIsSuccess, setIsError])
  const onSubmit = () => {
    if (isReportValue !== '') {
      const payload = {
        message: isReportValue,
        productUrl: location.href,
        email: String(email),
      }
      postReport(payload)
    } else {
      setValue(true)
    }
  }

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
            <div className="flex min-h-[73%] justify-center p-4 text-start sm:p-0">
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
                    className={`mb-4 justify-center text-start text-[27px] font-bold ${
                      theme === 'dark' ? 'text-[#ffffff]' : 'text-[#16161a]'
                    }`}
                  >
                    Why are you reporting?
                  </Typography>
                  <div
                    className={`mb-8 justify-center text-start  ${
                      theme === 'dark' ? 'text-[#ffffff]' : 'text-[#16161a]'
                    }`}
                  >
                    Tell us how this user violates the rules of the site
                  </div>
                  {/* <div className="my-5 h-[1px] bg-grayE1 dark:bg-[#A5A5A5]"></div> */}
                  <Typography
                    className={`mb-4 justify-center text-start text-[18px] ${
                      theme === 'dark' ? 'text-[#ffffff]' : 'text-[#1a1616]'
                    }`}
                  >
                    Message
                  </Typography>
                  <div className="w-full rounded-xl border border-transparent">
                    <div className="">
                      <textarea
                        className="bg-gray-50 border-gray-300 w-full resize-none rounded p-4 text-[#16161acc]"
                        placeholder="Tell us some details"
                        onChange={e => onhandleReport(e.target.value)}
                        style={{ background: '#f1f1f1' }}
                      />
                    </div>
                  </div>
                  {isValue && <div className="justify-center text-start text-[#f54747]">*Require</div>}

                  <div className="mt-5 flex justify-center gap-x-10">
                    <Button
                      className="!h-[45px] !w-[40%] rounded-full font-semibold"
                      hover={true}
                      outlineBorder={false}
                      text={'Cancel'}
                      onClick={() => setCheck(false)}
                    />
                    <button
                      className={`class="!h-[45px] !w-[40%] rounded-full  bg-grayE3 p-2   font-semibold !text-black duration-500 ease-in-out  hover:transform hover:bg-gray81  hover:bg-gradient-to-r hover:!text-white active:translate-y-1 active:scale-95 active:duration-300
                        `}
                      onClick={onSubmit}
                    >
                      Report
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
