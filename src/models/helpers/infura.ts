import Web3 from 'web3'
import { constants } from '@/store/constants'

import { DEFAULT_NETWORK_ID } from './constant'



export default {
  /**
   * @param {number|string} param 当前配置的网络 ID
   * @param {string} infuraKey
   * @return {!Object}
   */
  create({
    networkId = DEFAULT_NETWORK_ID,
    infuraKey = '',
  } = {}) {
    const NETWORK_ID = +networkId || DEFAULT_NETWORK_ID
    const RPC_URL = constants.network.rpc

    return {
      web3: new Web3(RPC_URL),
      RPC_URL
    }
  }
}