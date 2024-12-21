import { Transaction } from '@solana/web3.js';
import { notification } from 'ant-design-vue';

import { ProviderMix } from '../types';

export const handleSignAllTransactions = async (
  provider: ProviderMix,
  transactions: Array<Transaction>,
  notificationKey?: string
): Promise<Transaction[]> => {
  try {
    return await provider.signAllTransactions(transactions);
  } catch (error: any) {
    notification.error({
      message: `SignAllTransactions`,
      description: error.message,
    })

    throw new Error(error.message);
  }
};

