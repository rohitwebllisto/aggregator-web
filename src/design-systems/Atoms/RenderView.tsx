'use client'
import useMagicRedirect from 'api-services/magicRedirect'
import { Footer } from 'design-systems/Organisms/Footer'
import Header from 'design-systems/Organisms/Header'
import React, { useEffect } from 'react'
import { Loader } from './Loader'

const RenderView = ({ children }: { children: React.ReactNode }) => {
  const { handleMagicRedirect, tokens } = useMagicRedirect()
  const localToken = typeof window !== 'undefined' ? localStorage?.getItem('Token') : undefined

  useEffect(() => {
    handleMagicRedirect()
  }, [])

  return (
    <>
      {localToken || tokens ? (
        <div className="m-0 min-h-screen overflow-x-hidden p-0 font-Rubik">
          <Header />
          <div className="mt-44 min-h-[calc(100vh-230px)] w-screen xs:mt-24 md:mt-44 md:min-h-[calc(100vh-159px)] lg:mt-48">
            {children}
          </div>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default RenderView
