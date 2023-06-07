import { createApp,ref } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



const app = createApp(App)
const ifLogin=ref(false)
const ID=ref()
app.use(ElementPlus)
app.provide('ifLogin', ifLogin)
app.provide('ID',ID)
app.use(router).mount('#app')
