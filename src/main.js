import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'




const app = createApp(App).use(router);

// Ustawienie globalnej właściwości
app.config.globalProperties.$isLogged = ref(false)
app.config.globalProperties.$isAdmin = ref(false)


console.log('Global Property $isLoged:', app.config.globalProperties.$isLogged);
console.log('Global Property $isAdmin:', app.config.globalProperties.$isAdmin);

app.mount('#app')


