import { createRouter, createWebHistory } from 'vue-router'

import RootDashboard from '../components/RootDefault.vue'

import { store } from '@/store'

const routes = [
  {
    path: '/',
    component: RootDashboard,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          keepAlive: true,
        }
      },
      // {
      //   path: '/i-:code',
      //   name: 'InviteLink',
      //   component: () => import('@/views/Emotion.vue'),
      // },
      // {
      //   path: '/emotion',
      //   name: 'Emotion',
      //   component: () => import('@/views/Emotion.vue'),
      // },
      // {
      //   path: '/earn',
      //   name: 'Earn',
      //   component: () => import('@/views/AccountReward.vue'),
      // },
      {
        path: '/explore',
        name: 'Explore',
        component: () => import('@/views/Explore.vue'),
      },
      {
        path: '/ai-watch',
        name: 'AIWatch',
        component: () => import('@/views/AIWatch.vue'),
      },
      {
        path: '/ai-watch/i-:code',
        name: 'AIWatchWithCode',
        component: () => import('@/views/AIWatch.vue'),
      },
      {
        path: '/blood-glucose-monitor',
        name: 'BloodGlucoseMonitor',
        component: () => import('@/views/BloodGlucoseMonitor.vue'),
      },
      {
        path: '/research',
        name: 'ResearchGuilds',
        component: () => import('@/views/Research.vue'),
      },
      {
        path: '/involved',
        name: 'GetInvolved',
        component: () => import('@/views/Involved.vue'),
      },
      {
        path: '/launch',
        name: 'Launch',
        component: () => import('@/views/Contribute.vue'),
      },
      {
        path: '/ai-watch-overview',
        name: 'AIWatchOverview',
        component: () => import('@/views/AIWatch.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   return { y: 0, x: 0 }
  // },
})

router.beforeEach((to, from, next) => {
  const suffix = to.meta.suffix || ''
  const { user } = store

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.pageYOffset = 0;

  if (to.matched && to.matched.length) {

    next()
  } else {
    // 404
    next({ path: '/' })
    store.message.error('Page not found.')
  }
})

export default router
