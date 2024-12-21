import { Transaction } from '@solana/web3.js';
import { notification } from 'ant-design-vue';

import { ProviderMix } from '../types';

export const handleSignAndSendTransaction = async (provider: ProviderMix, transaction: Transaction, notificationKey?: string): Promise<string> => {
  const key = notificationKey

  try {
    const { signature } = await provider.signAndSendTransaction(transaction);

    return signature;
  } catch (error: any) {
    notification.warn({
      key,
      message: `SignAndSendTransaction`,
      description: error.message,
    })

    throw new Error(error.message);
  }
};

