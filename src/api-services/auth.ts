import { Magic } from 'magic-sdk'
import { toast } from 'react-toastify'

export const auth = async (email: string) => {
  // const magicSecret = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
  // const magic = magicSecret && new Magic(magicSecret)
  const magic = new Magic('pk_live_857FFAFC86BEA3FC')

  // Authenticate with Magic

  if (magic) {
    try {
      const didToken = await magic.auth.loginWithMagicLink({ email })

      // console.log('Authenticated with Magic. DID Token:', didToken)
      if (didToken) {
        toast.success('Login Success', {
          position: toast.POSITION.TOP_RIGHT,
        })
        setTimeout(() => {
          location.reload()
        }, 3000)
        return didToken
      }
    } catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT,
      })
      console.error('Authentication error:', error)
      // location.reload()
    }
  } else {
    toast.error('Something went wrong', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.error('Magic instance is not available. Check NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY.')
  }

  // const res = await fetch('/api/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + didToken
  //   },
  //   body: JSON.stringify({email: email})
  // });

  // if(res.status === 200){
  //   Router.push('/profile')
  // }else{
  //   throw new Error(await res.text())
  // }

  // console.log(didToken);
}
