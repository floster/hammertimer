import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import directives from './directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

directives.forEach((directive) => app.directive(directive.name, directive))

app.use(pinia)
app.use(router)

app.mount('#app')
