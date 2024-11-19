import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { createApp, ref } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next';
import App from './App.vue'
import router from './router'



const app = createApp(App).use(router);
app.use(createBootstrap());



// Ustawienie globalnej właściwości
app.config.globalProperties.$isLogged = ref(false)
app.config.globalProperties.$isAdmin = ref(false)


console.log('Global Property $isLoged:', app.config.globalProperties.$isLogged);
console.log('Global Property $isAdmin:', app.config.globalProperties.$isAdmin);

app.mount('#app')

export default app;


