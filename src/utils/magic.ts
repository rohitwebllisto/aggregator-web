import { OAuthExtension } from '@magic-ext/oauth'
import { Magic } from 'magic-sdk'
let magic: any // Declare the variable without initializing it
const PublicKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || ''
if (typeof window !== 'undefined') {
  // Initialize Magic SDK only on the client side
  magic = new Magic('pk_live_857FFAFC86BEA3FC', {
    extensions: [new OAuthExtension()],
  })
}

export { magic } // Export the initialized magic variable or undefined
