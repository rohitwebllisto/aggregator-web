import { useState } from 'react'

export const useAuthModal = () => {
  const [authCheck, setAuthCheck] = useState<boolean>(false)
  return {
    authCheck,
    setAuthCheck,
  }
}
