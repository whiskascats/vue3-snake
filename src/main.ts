import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/assets/scss/style.scss'

const pinia = createPinia()
function piniaPlugin(){
  return {
    title: '貪吃蛇'
  }
}
pinia.use(piniaPlugin);
createApp(App)
.use(router)
.use(pinia)
.mount('#app')
