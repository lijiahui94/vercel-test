import { createApp } from 'vue'
import './assets/style/main.scss'
import App from './App.vue'
// import Antd from 'ant-design-vue';
import router from './router'

createApp(App)
  .use(router).mount('#app')

