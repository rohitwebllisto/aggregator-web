/* eslint-disable react-hooks/exhaustive-deps */

import { Dialog, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Fragment, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'

import { Otp } from './Otp'

import { auth } from 'api-services/auth'
import connectToWallet from 'api-services/hashconnect'
import { IMG } from 'assets/images'
import { Button } from 'design-systems/Atoms/Button'
import {
  AppleIcon,
  CancelIcon,
  CancelIconDark,
  CheckCircle,
  DarkCheck,
  DarkHashLogoIcon,
  GoogleIcons,
  MagicIcon,
} from 'design-systems/Atoms/Icons'
import { Loader } from 'design-systems/Atoms/Loader'
import { Typography } from 'design-systems/Atoms/Typography'
import { magic } from 'utils/magic'
import { useSignUp } from 'hooks/apis/useSignUp'
import { toast } from 'react-toastify'

export interface SignUpProps {
  showModal: boolean
  setShowModal: (value: boolean) => void
  buyActive?: boolean
}
export interface SignUpResponseType {
  id: number
  status: boolean
  email: string
}
export const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const SignUp: React.FC<SignUpProps> = ({ showModal, setShowModal, buyActive }) => {
  const [otpModel, setOtpModel] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)
  const [response, setResponse] = useState<SignUpBlock>({
    email: '',
    reference_key: '',
  })
  const { isSignUpLoading, postSignData, SignUp } = useSignUp()
  const [error, setError] = useState<boolean>(false)
  const cancelButtonRef = useRef(null)
  if (SignUp && (SignUp as SignUpResponseType).status === true) {
    localStorage.setItem('Email', (SignUp as SignUpResponseType).email)
  }
  const data = [
    { key: 0, icon: <GoogleIcons />, text: 'Login with Google Account', provider: 'google' },
    { key: 1, icon: <AppleIcon />, text: 'Login with Apple Account', provider: 'apple' },
  ]
  const { theme } = useTheme()
  const setLocalStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, value)
  }
  const LocalStorage = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
  // useMemo(() => {
  //   handleMagicRedirect(setLoader, setResponse)
  // }, [])

  const handleSubmit = async () => {
    try {
      if (regEx.test(response.email) && response.email !== '') {
        setError(false)
        setLoader(true)
        const result = await auth(response.email)
        if (result) {
          postSignData({ ...response, reference_key: result })
          setResponse({ ...response, reference_key: result })
          setLocalStorageItem('Token', result)
          setLocalStorageItem('Email', response.email)
          setShowModal(false)
          setLoader(false)
        }
      } else {
        setError(true)
      }
    } catch (error) {
      setLoader(false)
      console.error('Something went wrong', error)
    }
  }

  //google Login-in
  const Auth = async (provider: string) => {
    try {
      setLoader(true)
      await magic.oauth.loginWithRedirect({
        provider: provider, // OAuth provider (e.g., 'google', 'facebook', 'apple', 'github')
        redirectURI: `${window.location.origin}/`,
      })
    } catch (error) {
      console.error('OAuth Error:', error)
    }
  }

  //HashConnectWallet
  const HashConnectWallet = async () => {
    setLoader(true)
    const result = await connectToWallet()

    if (result) {
      setLoader(false)
      setLocalStorageItem('Token', result)
      setResponse({ ...response, reference_key: result })
      setTimeout(() => {
        location.reload()
      }, 12000)
      // location.reload()
      // setShowModal(false)
    }
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <>
      {!loader ? (
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
                    <Dialog.Panel className="relative transform overflow-hidden rounded-[16px] bg-white p-5 text-left shadow-xl transition-all dark:bg-black18 sm:my-8 sm:w-full sm:max-w-[642.781px] sm:p-12">
                      <div className="flex cursor-pointer justify-end " onClick={() => setShowModal(false)}>
                        {theme === 'dark' ? <CancelIconDark /> : <CancelIcon />}
                      </div>
                      <div>
                        <div className="text-center text-[36px] font-semibold">
                          {buyActive ? 'Verify your account' : 'Signup for free'}
                        </div>
                        {buyActive && (
                          <div className="m-8 flex justify-center">
                            <Image
                              alt={'ProfileAvtar'}
                              className="relative h-[70px]  w-[70px] rounded-full border-4 border-white"
                              src={IMG.personProfile}
                            />
                            <div className="absolute ml-[100px] flex h-[70px] w-[70px] items-center justify-center rounded-full border-4 border-white bg-black">
                              <MagicIcon />
                            </div>
                            {/* <Image alt={"NFTAvtar"} src={IMG.personProfile} className='border-4 absolute ml-14 border-white rounded-full h-[70px] w-[70px]' /> */}
                          </div>
                        )}

                        <div className="mt-4 grid gap-y-3">
                          <Typography
                            className={`text-[18px] font-medium ${
                              response.email === '' || (!regEx.test(response.email) && 'text-danger-600')
                            }`}
                          >
                            Email Address
                          </Typography>
                          <input
                            className={`peer w-full border-2 border-grayE1 p-3 dark:bg-black18 ${
                              response.email === '' ||
                              (!regEx.test(response.email) && '!border-danger-600 focus-visible:!border-danger-600')
                            } `}
                            placeholder="Email Address"
                            type="email"
                            onChange={e => setResponse({ ...response, email: e.target.value })}
                            onKeyPress={handleKeyPress}
                          />
                          <div className="hidden text-sm peer-invalid:flex peer-invalid:text-danger-600">
                            Please provide a valid email address.
                          </div>
                        </div>
                        <div className="mt-11">
                          <Button
                            className="peer w-full p-3"
                            disabled={(response.email === '' || !regEx.test(response.email)) && true}
                            hover={true}
                            outlineBorder={false}
                            text={'Login/Sign Up'}
                            onClick={() => {
                              // setOtpModel(true),
                              // setShowModal(false),
                              handleSubmit()
                            }}
                          />
                        </div>
                      </div>
                      <div className="m-4 text-center text-[#A5A5A5]">or continue with</div>
                      <div>
                        <div
                          className="grid cursor-pointer items-center justify-items-center  gap-x-6 bg-grayEF p-3 duration-500 ease-in-out hover:transform active:translate-y-1 active:scale-95 active:duration-300 dark:bg-black2F dark:text-white sm:flex sm:justify-center "
                          onClick={() => HashConnectWallet()}
                        >
                          <div className="flex h-[40px] w-[40px] items-center justify-center  rounded-full  bg-black">
                            <DarkHashLogoIcon />
                          </div>
                          <div>Connect with Hashpack (HBAR wallet)</div>
                        </div>
                        <div className="mt-4 grid gap-x-5 gap-y-5 sm:flex sm:gap-y-0">
                          {data.map((item, key) => {
                            return (
                              <div
                                className="flex w-full cursor-pointer items-center justify-center gap-x-5 rounded-sm bg-grayEF p-3 text-[14px] text-black5 duration-300 active:translate-y-1 active:scale-95 dark:bg-black2F dark:text-white"
                                key={key}
                                onClick={() => Auth(item.provider)}
                              >
                                <Typography className="">{item.icon}</Typography>
                                <Typography className="">{item.text}</Typography>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      {/* <div className="m-11 text-center text-[18px] text-[#A5A5A5] ">
                    Already have an account?<strong className="text-black dark:text-white" > Login</strong>
                  </div> */}
                      {buyActive ? (
                        <div className="mt-7 flex justify-center gap-x-7 text-center">
                          <div>
                            <Typography className="text-[18px] opacity-60">Privacy Policy</Typography>
                            <div>&#9679;</div>
                          </div>
                          <div>
                            <Typography className="text-[18px] opacity-60">Terms & Conditions</Typography>
                            <div>&#9679;</div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-11 flex items-center gap-x-5 text-black5 dark:text-white">
                          <div>{theme === 'dark' ? <DarkCheck /> : <CheckCircle />}</div>
                          <Typography className="">
                            By signing up to VYGA I confirm I agree with the privacy policy and terms of conditions
                          </Typography>
                        </div>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <Otp otpModel={otpModel} setOtpModel={setOtpModel} />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
