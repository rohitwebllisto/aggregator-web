// import { useSignUp } from 'hooks/apis/useSignUp'
// import { toast } from 'react-toastify'

// import { magic } from 'utils/magic'

// export const handleMagicRedirect = async (setLoader: (value: boolean) => void, setResponse: (value: any) => void) => {
//   // Check your conditions here before calling getRedirectResult
//   const LocalStorage = localStorage?.getItem('Token')
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { isSignUpLoading, postSignData, SignUp } = useSignUp()
//   // Example condition: Only proceed if LocalStorage is null
//   if (LocalStorage === null) {
//     try {
//       const result = await magic.oauth.getRedirectResult()

//       if (result && result.oauth) {
//         setResponse((prevState: SignUpBlock) => ({
//           ...prevState,
//           email: result.oauth.userInfo.email,
//           reference_key: result.oauth.accessToken,
//         }))
//         const res = result.oauth.accessToken
//         const emailres = result.oauth.userInfo.email
//         localStorage?.setItem('Token', res)
//         localStorage?.setItem('Email', emailres)
//         toast.success('Login Success', {
//           position: toast.POSITION.TOP_RIGHT,
//         })
//         postSignData({ email:emailres, reference_key: res })
//         // setTimeout(() => {
//         //   window.location.reload()
//         // }, 5000)
//       } else {
//         toast.error('Something went wrong', {
//           position: toast.POSITION.TOP_RIGHT,
//         })
//       }
//     } catch (error) {
//       console.error('Magic Redirect Error:', error)
//       toast.warning('Please Login/Signup!!!', {
//         position: toast.POSITION.TOP_RIGHT,
//       })
//     }
//   }
// }

import { useSignUp } from 'hooks/apis/useSignUp'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { magic } from 'utils/magic'

const useMagicRedirect = () => {
  const { isSignUpLoading, postSignData, SignUp } = useSignUp()
  const [token, setToken] = useState<boolean>(false)

  const handleMagicRedirect = async (setLoader?: (value: boolean) => void, setResponse?: (value: any) => void) => {
    const LocalStorage = typeof window !== 'undefined' ? window.localStorage?.getItem('Token') : null

    if (LocalStorage === null) {
      try {
        const result = await magic.oauth.getRedirectResult()

        if (result && result.oauth) {
          setResponse?.((prevState: SignUpBlock) => ({
            ...prevState,
            email: result.oauth.userInfo.email,
            reference_key: result.oauth.accessToken,
          }))

          const res = result.oauth.accessToken
          const emailres = result.oauth.userInfo.email

          toast.success('Login Success', {
            position: toast.POSITION.TOP_RIGHT,
          })

          await postSignData({ email: emailres, reference_key: res })
          setToken(true)
          localStorage?.setItem('Token', res)
          localStorage?.setItem('Email', emailres)
          setLoader?.(true)
          //       setTimeout(() => {
          //   window.location.reload()
          // }, 2000)
        } else {
          toast.error('Something went wrong', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      } catch (error) {
        setToken(true)
        console.error('Magic Redirect Error:', error)
        toast.warning('Please Login/Signup!!!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    }
  }

  return { handleMagicRedirect, tokens: token }
}

export default useMagicRedirect
