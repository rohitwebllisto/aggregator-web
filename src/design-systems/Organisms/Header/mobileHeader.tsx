/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { TERipple } from 'tw-elements-react'

import { HeaderProps, itemProps } from './interface'

import { IMG } from 'assets/images'
import { Button } from 'design-systems/Atoms/Button'
import {
  CardIcons,
  DarkBackIcons,
  DarkLogout,
  DarkMenu,
  DarkMoon,
  LightCardIcons,
  LightMenu,
  LightPersonIcons,
  LightSearchIcon,
  LightSun,
  LightbackIcons,
  Logout,
  PersonIcon,
  SearchIcon,
} from 'design-systems/Atoms/Icons'
import { SignUp } from 'design-systems/Molecules/Model/sign-up/SignUp'
import { Typography } from 'design-systems/Atoms/Typography'
import { Confirm } from 'design-systems/Molecules/Model/confirm'

export const MobileHeader = ({ theme, data, router, setTheme, setSearchBar, rout, cart, token }: HeaderProps) => {
  const [show, setShow] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  // const [token, setToken] = useState<string | null>('')
  // useEffect(() => {
  //   setToken(localStorage.getItem('Token'))
  // })
  // const token = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null
  return (
    <div className="md:hidden">
      {!show && (
        <div className="flex w-full flex-wrap justify-between">
          <div className="flex items-center gap-x-8">
            {theme !== 'dark' ? (
              <>
                <Image alt="Logo" src={IMG.mobileMainIcon} />
                <div onClick={() => setSearchBar(true)}>
                  <SearchIcon />
                </div>
              </>
            ) : (
              <>
                <Image alt="Logo" src={IMG.mobileDarkMainIcon} />
                <div onClick={() => setSearchBar(true)}>
                  <LightSearchIcon />
                </div>
              </>
            )}
          </div>
          {theme !== 'dark' ? (
            <div className="flex items-center gap-x-8 xs:gap-x-4 sm:gap-x-8">
              <div className="cursor-pointer" onClick={() => setTheme('dark')}>
                <DarkMoon />
              </div>
              {token != null && (
                <div className="cursor-pointer" onClick={() => setConfirm(true)}>
                  <Logout />
                </div>
              )}
              <div className="cursor-pointer" onClick={() => rout.push('add-to-Card')}>
                <CardIcons />
                <div className="yellow-gradiant absolute top-6 ml-4 flex h-[16px] w-[16px] animate-ping items-center justify-center rounded-full text-[8px] font-semibold">
                  {cart ? cart.length : '0'}
                </div>
              </div>

              <div onClick={() => setShow(!show)}>{theme !== 'dark' ? <LightMenu /> : <DarkMenu />}</div>
            </div>
          ) : (
            <div className="flex items-center gap-x-8 xs:gap-x-4 sm:gap-x-8">
              <div className="cursor-pointer" onClick={() => setTheme('light')}>
                <LightSun />
              </div>
              {token !== null && (
                <div className="cursor-pointer" onClick={() => setConfirm(true)}>
                  <DarkLogout />
                </div>
              )}
              <div className="cursor-pointer" onClick={() => rout.push('add-to-Card')}>
                <LightCardIcons />
                <div className="yellow-gradiant absolute top-6 ml-4 flex h-[16px] w-[16px] animate-ping items-center justify-center rounded-full text-[8px] font-semibold">
                  {cart ? cart.length : '0'}
                </div>
              </div>

              <div className="cursor-pointer" onClick={() => setShow(!show)}>
                {theme !== 'dark' ? <LightMenu /> : <DarkMenu />}
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <div className="absolute left-[1px] top-[0.2px] z-50 grid h-[100vh] w-[100%] content-between bg-white dark:bg-black ">
          <div className="mt-3 flex  justify-between p-6 ">
            <div className=" grid gap-y-5">
              {data.map((item: itemProps, key: number) => {
                return (
                  <>
                    {item.path === '/collection' ? (
                      token !== null && (
                        <Link
                          className={`cursor-pointer text-justify font-Rubik text-lg font-normal text-black dark:text-white ${
                            router === item.path && 'font-semibold dark:text-white'
                          }`}
                          href={item.path}
                          key={key}
                          onClick={() => setShow(false)}
                        >
                          {item.title}
                        </Link>
                      )
                    ) : (
                      <Link
                        className={`cursor-pointer text-justify font-Rubik text-lg font-normal text-black dark:text-white ${
                          router === item.path && 'font-semibold dark:text-white'
                        }`}
                        href={item.path}
                        key={key}
                        onClick={() => setShow(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </>
                )
              })}
            </div>
            <div>
              {theme === 'dark' ? (
                <div className="mt-1" onClick={() => setShow(false)}>
                  <LightbackIcons />
                </div>
              ) : (
                <div className="mt-1" onClick={() => setShow(false)}>
                  <DarkBackIcons />
                </div>
              )}
            </div>
          </div>
          <div className="relative bottom-16 flex justify-center">
            <TERipple>
              {token != null ? (
                <button
                  className=" flex w-[160px] items-center justify-between gap-x-5 bg-[#F9EAE2] px-5 py-3 duration-500 ease-in-out hover:transform active:translate-y-1 active:scale-95  active:duration-300 dark:bg-[#261910]"
                  onClick={() => {
                    rout.push('profile'), setShow(false)
                  }}
                >
                  <Typography className="text-[16px] font-semibold">0 HBAR</Typography>
                  <div>{theme === 'dark' ? <LightPersonIcons /> : <PersonIcon />}</div>
                </button>
              ) : (
                <Button
                  className={'w-40 cursor-pointer'}
                  hover={true}
                  outlineBorder={false}
                  text={'Login/Signup'}
                  onClick={() => setShowModal(true)}
                />
              )}
            </TERipple>
          </div>
        </div>
      )}
      <SignUp buyActive={false} setShowModal={setShowModal} showModal={showModal} />
      <Confirm setShowModal={setConfirm} showModal={confirm} />
    </div>
  )
}
