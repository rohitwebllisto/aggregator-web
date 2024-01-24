'use client'
import Image from 'next/image'
import { useState } from 'react'

import { IMG } from 'assets/images'
import { Typography } from 'design-systems/Atoms/Typography'

const ContactUsPageTemplate: React.FC = () => {
  const [change, setChange] = useState<boolean>(false)

  return (
    <div className="flex h-screen w-full flex-col justify-end bg-[url('../../assets/images/bg.png')]">
      <div className="container">
        <div className="justify-between py-12 md:grid lg:flex">
          <div className="gap-x-24 sm:grid md:flex">
            {!change ? (
              <Image
                alt="IMG"
                className="sm: justify-self-center "
                src={IMG.MainLogoBlack}
                onMouseEnter={() => setChange(true)}
              />
            ) : (
              <Image
                alt="IMG"
                className="sm: justify-self-center "
                src={IMG.MainLogoYello}
                onMouseLeave={() => {
                  setChange(false)
                }}
              />
            )}

            <div className="sm: mt-8 grid items-center justify-center">
              <div className="sm: text-center font-normal lg:text-left" style={{ color: 'rgba(0, 0, 0, 0.70)' }}>
                <div>Navigating best of W3</div>
                <div className="sm: text-center text-2xl font-semibold italic lg:text-left">
                  Cross-Chain and Impact-Centered
                </div>
              </div>
              <a
                className="sm: w-[13.5rem] justify-self-center bg-black p-5 text-center text-xl text-white lg:justify-self-start"
                href="mailto:samir.c@webllisto.com"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="grid justify-center gap-y-4 sm:mt-8 md:mt-8 lg:self-end">
            <div className="mt-10 text-center text-lg font-normal md:text-left xl:mt-0">Part of the family</div>
            <Image alt="IMG" src={IMG.Logo} />
          </div>
        </div>
      </div>
      <div className="flex items-end bg-black py-3 text-center text-white">
        <Typography className="container">© Vyga Inc. 2023</Typography>
      </div>
    </div>
  )
}

export default ContactUsPageTemplate
