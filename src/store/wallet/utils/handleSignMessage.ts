import { notification } from 'ant-design-vue';
import bs58 from 'bs58'
import { ProviderMix } from '../types'
import { wallet } from '../index'

export const handleSignMessage = async (provider: ProviderMix, message: string): Promise<string> => {
  try {
    const encodedMessage = new TextEncoder().encode(message)
    // 转 string
    const { signature } = await provider.signMessage(encodedMessage)
    // NOTE: or
    // Buffer.from(signature).toString('base64')

    return bs58.encode(signature)
  } catch (error: any) {
    // update
    wallet.signing = false

    notification.error({
      message: `SignMessage`,
      description: error.message,
    })

    throw new Error(error.message)
  }
}