import { notification } from 'ant-design-vue';
import { Transaction } from '@solana/web3.js';

import { ProviderMix } from '../types'

export const handleSignTransaction = async (provider: ProviderMix, transaction: Transaction, notificationKey?: string): Promise<Transaction> => {
  try {
    const signedTransaction = await provider.signTransaction(transaction)

    return signedTransaction;
  } catch (error: any) {
    notification.warn({
      key: notificationKey,
      message: `SignTransaction`,
      description: error.message,
    })

    throw new Error(error.message);
  }
}

