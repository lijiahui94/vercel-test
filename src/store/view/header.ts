import {
  iSlidersH,
  iHome,
  iSend,
  iFlag,
  iTablet,
  iTelegram,
  iWatch,
  iGitbook
} from '../../components/icons'

type THeader = {
  nav: Array<{ id?: string, prefix?: string, text: string, to?: string, href?: string, component?: any }>
  menu: {
    open: boolean
  }
}

const header: THeader = {
  nav: [
    { id: 'Home', text: 'Home', to: '/', component: iHome },
    // { id: 'Emotion', prefix: 'i-', text: 'Emotional Training', to: '/emotion', component: iSlidersH },
    // { id: 'Explore', text: 'Explore', to: '/explore', component: iTablet },
    { id: 'AIWatch', prefix: 'AIWatch', text: 'DeDate DePIN', to: '/ai-watch', component: iWatch },
    { id: 'ResearchGuilds', text: 'Research', to: '/research', component: iSlidersH },
    { id: 'GetInvolved', text: 'Involved', to: '/involved', component: iTablet },
    { id: 'Launch', text: 'Launch', to: '/launch', component: iFlag },
    { id: 'MiniApp', text: 'Mini App', href: 'https://t.me/junlalaaibot/miniapp', component: iTelegram },
    // { id: 'Earn', text: 'Earn', href: 'https://t.me/junlalaaibot/miniapp?startapp=nGa6yYMFh1XarUwUVwS', component: iSend },
    { id: 'Docs', text: 'Docs', href: 'https://docs.junlala.network/', component: iGitbook },
  ],
  menu: {
    open: false
  }
}

export default header