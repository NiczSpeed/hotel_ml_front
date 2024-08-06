import { createApp } from 'vue'
import App from './App.vue'
import router from './router'




const app = createApp(App).use(router);

// Ustawienie globalnej właściwości
app.config.globalProperties.$isLogged = false


console.log('Global Property $isLoged:', app.config.globalProperties.$isLogged);

app.mount('#app')


