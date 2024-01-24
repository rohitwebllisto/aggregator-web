import { HashConnect } from 'hashconnect'
import { toast } from 'react-toastify'

const connectToWallet = async () => {
  try {
    const hashconnect = new HashConnect()

    const appData = {
      name: 'VYGA Demo',
      description: 'This is VYGA Demo',
      icon: 'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsmall-logo.d4265237.png&w=128&q=75',
    }
    toast.success('Initializing HashPack...', {
      position: toast.POSITION.TOP_RIGHT,
    })

    const initData = await hashconnect.init(appData, 'testnet', false)

    if (!initData) {
      console.error('Failed to initialize HashConnect.')
      toast.error('Failed to initialize HashConnect.', {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }

    // const privateKey = initData.privkey

    const state = await hashconnect.connect()
    // const topic = state.topic
    const pairingString = hashconnect.generatePairingString(state, 'testnet', false)

    // Connect to a local wallet (if local wallets are found)
    hashconnect.connectToLocalWallet(pairingString)
    return pairingString
  } catch (error) {
    console.error('Error connecting to wallet:', error)
    return toast.error('Error connecting to wallet', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export default connectToWallet
