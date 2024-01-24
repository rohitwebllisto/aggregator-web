'use client'
import React, { useMemo } from 'react'
import { PropsWithChildren, useState, useEffect } from 'react'

import { Loader } from '../Loader'

const NoFirstRender: React.FC<PropsWithChildren> = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false)
  useEffect(() => {
    setHydrated(true)
  }, [])

  return <>{hydrated ? children : <Loader />}</>
}

export default NoFirstRender
