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
  DarkLogout,
  DarkMoon,
  LightCardIcons,
  LightPersonIcons,
  LightSearchIcon,
  LightSun,
  Logout,
  PersonIcon,
  SearchIcon,
} from 'design-systems/Atoms/Icons'
import { Typography } from 'design-systems/Atoms/Typography'
import { Confirm } from 'design-systems/Molecules/Model/confirm'
import { SignUp } from 'design-systems/Molecules/Model/sign-up/SignUp'

export const DesktopHeader = ({
  theme,
  data,
  router,
  setTheme,
  setSearchBar,
  searchBar,
  rout,
  cart,
  token,
}: HeaderProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  // const token: any = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null

  return (
    <div className="flex w-screen justify-between gap-x-16">
      {theme !== 'dark' ? (
        <Image
          alt="LOGO"
          className="cursor-pointer"
          src={IMG.SmallLogo}
          style={{ height: '101px' }}
          width={108}
          onClick={() => rout.push('/')}
        />
      ) : (
        <Image
          alt="LOGO"
          className="cursor-pointer"
          src={IMG.darkLogoSmall}
          style={{ height: '101px' }}
          width={108}
          onClick={() => {
            rout.push('/')
          }}
        />
      )}

      <div className=" w-full md:block">
        {theme === 'dark' ? (
          <div className="flex justify-end gap-x-8">
            <div className="cursor-pointer" onClick={() => setSearchBar(true)}>
              <LightSearchIcon />
            </div>
            {token !== null && (
              <div className="cursor-pointer" onClick={() => setConfirm(true)}>
                <DarkLogout />
              </div>
            )}
            {/* <div className="cursor-pointer">
              <LightPersonIcons />
            </div> */}
            <div className="cursor-pointer" onClick={() => rout.push('add-to-Card')}>
              <LightCardIcons />
              <div className="yellow-gradiant absolute top-4 ml-4 flex h-[16px] w-[16px] animate-ping items-center justify-center rounded-full text-[8px] font-semibold">
                {cart ? cart.length : '0'}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-x-8">
            <div className="cursor-pointer" onClick={() => setSearchBar(true)}>
              <SearchIcon />
            </div>
            {token !== null && (
              <div className="cursor-pointer" onClick={() => setConfirm(true)}>
                <Logout />
              </div>
            )}
            {/* <div className="cursor-pointer">
              <PersonIcon />
            </div> */}
            <div className="cursor-pointer" onClick={() => rout.push('/add-to-Card')}>
              <CardIcons />
              <div className="yellow-gradiant absolute top-4 ml-4 flex h-[16px] w-[16px] animate-ping items-center justify-center rounded-full text-[8px] font-semibold">
                {cart ? cart.length : '0'}
              </div>
            </div>
          </div>
        )}

        <div className="mb-3 mt-5 h-[1px] bg-grayDA"></div>
        <div className="justify-end gap-x-16  md:block  lg:flex ">
          <div className="flex flex-wrap content-center justify-evenly gap-x-10">
            {data?.map((item: itemProps, key: number) => (
              <div className="block" key={key}>
                {item.path === '/collection' ? (
                  token !== null && (
                    <Link
                      className={`cursor-pointer text-justify font-Rubik text-lg font-normal text-black duration-300 dark:text-white ${
                        router === item.path && 'font-semibold duration-300 dark:text-white'
                      }`}
                      href={item.path}
                      key={key}
                    >
                      {item.title}
                    </Link>
                  )
                ) : (
                  <Link
                    className={`cursor-pointer text-justify font-Rubik text-lg font-normal text-black duration-300 dark:text-white ${
                      router === item.path && 'font-semibold duration-300 dark:text-white'
                    }`}
                    href={item.path}
                    key={key}
                  >
                    {item.title}
                  </Link>
                )}
                {router === item.path && <div className="width-increase h-[3px] rounded-sm bg-orange"></div>}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-x-8 sm:mt-3 md:mt-3 lg:mt-0 ">
            {theme !== 'dark' ? (
              <div className="cursor-pointer" onClick={() => setTheme('dark')}>
                <DarkMoon />
              </div>
            ) : (
              <div className="cursor-pointer" onClick={() => setTheme('light')}>
                <LightSun />
              </div>
            )}
            <TERipple>
              {token !== null ? (
                <button
                  className=" flex w-[160px] items-center justify-between gap-x-5 bg-[#F9EAE2] px-5 py-3 duration-500 ease-in-out hover:transform active:translate-y-1 active:scale-95  active:duration-300 dark:bg-[#261910]"
                  onClick={() => rout.push('/profile')}
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
      </div>
      {showModal && <SignUp buyActive={false} setShowModal={setShowModal} showModal={showModal} />}
      <Confirm setShowModal={setConfirm} showModal={confirm} />
    </div>
  )
}
