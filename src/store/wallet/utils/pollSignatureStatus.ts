import { Connection } from '@solana/web3.js';
import { notification } from 'ant-design-vue';

import { TLog } from '../types';

const POLLING_INTERVAL = 1000; // one second
const MAX_POLLS = 30;

export const pollSignatureStatus = async (
  signature: string,
  connection: Connection,
  notificationKey?: string
): Promise<void> => {
  let count = 0;
  const key = notificationKey

  const interval = setInterval(async () => {
    // 未能及时交易
    if (count === MAX_POLLS) {
      clearInterval(interval);

      notification.error({
        key,
        message: 'signAndSendTransaction',
        description: `Transaction: ${signature}
Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`
      });

      return;
    }

    const { value } = await connection.getSignatureStatus(signature);
    const confirmationStatus = value?.confirmationStatus;

    if (confirmationStatus) {
      const hasReachedSufficientCommitment = confirmationStatus === 'confirmed' || confirmationStatus === 'finalized';

      notification[hasReachedSufficientCommitment ? 'success' : 'info']({
        key,
        message: 'signAndSendTransaction',
        description: `Transaction: ${signature}
Status: ${confirmationStatus.charAt(0).toUpperCase() + confirmationStatus.slice(1)}`
      })

      if (hasReachedSufficientCommitment) {
        clearInterval(interval);
        return;
      }
    } else {
      notification.info({
        key,
        message: 'signAndSendTransaction',
        description: `Transaction: ${signature}
Status: Waiting on confirmation...`
      })
    }

    count++;
  }, POLLING_INTERVAL);
};

