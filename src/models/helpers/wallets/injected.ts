import injectedModule from '@web3-onboard/injected-wallets'

export default injectedModule({
  custom: [
    // include custom (not natively supported) injected wallet modules here
  ]
  // display all wallets even if they are unavailable
  // displayUnavailable: true
  // but only show Binance and Bitski wallet if they are available
  // filter: {
  //   [ProviderLabel.Binance]: 'unavailable',
  //   [ProviderLabel.Bitski]: 'unavailable'
  // }
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  // sort: wallets => {
  //   const metaMask = wallets.find(
  //     ({ label }) => label === ProviderLabel.MetaMask
  //   )
  //   const coinbase = wallets.find(
  //     ({ label }) => label === ProviderLabel.Coinbase
  //   )

  //   return (
  //     [
  //       metaMask,
  //       coinbase,
  //       ...wallets.filter(
  //         ({ label }) =>
  //           label !== ProviderLabel.MetaMask &&
  //           label !== ProviderLabel.Coinbase
  //       )
  //     ]
  //       // remove undefined values
  //       .filter(wallet => wallet)
  //   )
  // }
  // walletUnavailableMessage: wallet => `Oops ${wallet.label} is unavailable!`
})