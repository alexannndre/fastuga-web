import { createPinia } from 'pinia'
import { createApp } from 'vue'

import axios from 'axios'
import moment from 'moment'
import { io } from 'socket.io-client'
import Toast from 'vue-toastification'
import { darkModeKey } from '@/config.js'
import { useStyleStore } from '@/stores/style.js'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'

import './css/main.css'

/* API and Webserver */
const apiDomain = import.meta.env.VITE_API_DOMAIN
const wsConnection = import.meta.env.VITE_WS_CONNECTION

/* Init Pinia */
const pinia = createPinia()

/* Toast options */
const toastOptions = {
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
}

/* Create Vue app */
const app = createApp(App).use(router).use(pinia).use(Toast, toastOptions)

/* Set API domain */
pinia.state.value.apiDomain = `${apiDomain}/api`

/* Provide global variables */
app.provide('apiDomain', apiDomain)
app.provide(
  'axios',
  axios.create({
    baseURL: `${apiDomain}/api`,
    headers: {
      'Content-type': 'application/json',
    },
  })
)
app.provide('socket', io(wsConnection))
app.provide('moment', moment)

const styleStore = useStyleStore(pinia)

/* App style */
styleStore.setStyle()

/* Dark mode */
if (
  (!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  localStorage[darkModeKey] === '1'
) {
  styleStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'Fastuga'

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} — ${defaultDocumentTitle}` : defaultDocumentTitle
})

app.mount('#app')
