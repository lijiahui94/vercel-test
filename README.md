# Junlala

## Info

- Andt vue: https://www.antdv.com/components/overview
- Andt vue theme: https://www.antdv.com/theme-editor-cn
- Design: https://www.figma.com/file/vLxyqzl0Ao1vDrcqx75qxA/JunLaLa-AI?type=design&node-id=0-1&mode=design&t=VwSa4mlKuHw3bEmS-0

- 参考 icon: 
  - https://www.iconfont.cn/collections/detail?spm=a313x.search_index.0.da5a778a4.3c813a81YX3eVL&cid=1304
  - 第二级 https://www.iconfont.cn/collections/detail?spm=a313x.search_index.0.da5a778a4.3c813a81WdHSvj&cid=38662
  - https://storyset.com/doctor

## Message

message.success(content, [duration], onClose)
message.error(content, [duration], onClose)
message.info(content, [duration], onClose)
message.warning(content, [duration], onClose)
message.warn(content, [duration], onClose) // alias of warning
message.loading(content, [duration], onClose)

## SOLANA

- faucet: https://faucet.solana.com
- rpc: https://shyft.to/
- https://solana-labs.github.io/solana-web3.js/

- Phantom
https://r3byv.csb.app/
https://github.com/phantom/sandbox/blob/b57fdd0e65ce4f01290141a01e33d17fd2f539b9/src/App.tsx#L242
https://docs.phantom.app/solana/signing-a-message

## Build

到 gateway

junlala-staging
pnpm build

cd data/src/nodejs/junlala && git pull && unzip -o dist.zip
rm -rf ../dist/* && mv -f dist/* ../dist/
https://staging.junlala.network


junlala
pnpm prod

cd data/src/nodejs/junlala && git pull && unzip -o dist.zip
rm -rf ../dist/* && mv -f dist/* ../dist/
https://junlala.network/

## Note

- 账号状态分3种
  - 连了钱包，并已经获取session： store.user.isLogged && store.wallet.signedIn
  - 链接了钱包，并已签名: store.wallet.signedIn
  - 只链接了钱包：store.wallet.connected