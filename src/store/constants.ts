import {
  iHappyDefault, iHappyActive,
  iSadDefault, iSadActive,
  iAngryDefault, iAngryActive,
  iConfusedDefault, iConfusedActive,
  iDisgustedDefault, iDisgustedActive,
  iSurprisedDefault, iSurprisedActive,
  iCalmDefault, iCalmActive,
  iFearDefault, iFearActive,
  iUnknownDefault, iUnknownActive
} from '@/components/icons'

export const constants = {
  app: {
    isProd: import.meta.env.VITE_APP_ENV === 'production',
    url: import.meta.env.VITE_APP_URL,
    x: import.meta.env.VITE_APP_OFFICIAL_TWITTER,
    telegram: import.meta.env.VITE_APP_OFFICIAL_TELEGRAM,
    api: import.meta.env.VITE_APP_API_PATH,
    infuraKey: import.meta.env.VITE_APP_INFURA_KEY,
    blocknativeKey: import.meta.env.VITE_APP_BLOCKNATIVE_KEY
  },
  user: {
    logInSignMessageText: `Welcome to Junlala.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.`
  },
  tweet: {
    hashtags: ['Junlala']
  },
  network: {
    id: import.meta.env.VITE_APP_NETWORK_ID,
    rpc: import.meta.env.VITE_APP_EVM_RPC,
    symbol: import.meta.env.VITE_APP_CHAIN_SYMBOL,
    explorer: import.meta.env.VITE_APP_EXPLORER_SITE
  },
  cacheKey: {
    WALLET_ACCOUNTS_LOGIN_SIGN: '_WALLET_ACCOUNTS_',
    TAROT_LIST: '_TAROT_'
  },
  storageKey: {
    ACCOUNT: '__JUNLALA_GLOBAL_ACCOUNT__',
    TWITTER_INFO_STATUS: '__JUNLALA_GLOBAL_REQ__getTwitterInfoByUsername_queue',
    WALLET: '__JUNLALA_GLOBAL_WALLET__',
    I18N: '__JUNLALA_GLOBAL_I18N__',
    SIGN_TEXT_CONTENT: '__JUNLALA_SIGN_TEXT_CONTENT',
    TON_PAYLOAD: '__JUNLALA_TON_PAYLOAD',
    SESSION: '__JUNLALA_SESSION',
    PAIDS: '__JUNLALA_PAIDS__'
  },
  auth2: {
    telegramLoginBot: import.meta.env.VITE_APP_TELEGRAM_LOGIN_BOT
  },
  emojis: {
    happy: { label: 'happy', default: iHappyDefault, active: iHappyActive },
    sad: { label: 'sad', default: iSadDefault, active: iSadActive },
    angry: { label: 'angry', default: iAngryDefault, active: iAngryActive },
    confused: { label: 'confused', default: iConfusedDefault, active: iConfusedActive },
    disgusted: { label: 'disgusted', default: iDisgustedDefault, active: iDisgustedActive },
    surprised: { label: 'surprised', default: iSurprisedDefault, active: iSurprisedActive },
    calm: { label: 'calm', default: iCalmDefault, active: iCalmActive },
    fear: { label: 'fear', default: iFearDefault, active: iFearActive },
    unknown: { label: 'unknown', default: iUnknownDefault, active: iUnknownActive },
  },
  contract: {
    checkIn: import.meta.env.VITE_APP_CHECK_IN_CONTRACT,
    presale1u: import.meta.env.VITE_APP_PRESALE_1U_TREASURY,
    usdt: import.meta.env.VITE_APP_USDT_CONTRACT,
    desciPortfolio: import.meta.env.VITE_APP_DESCI_PORTFOLIO_CONTRACT,
    emo: import.meta.env.VITE_APP_EMO_COIN_CONTRACT
  }
}