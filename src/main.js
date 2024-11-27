import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { createApp, ref } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next';
import App from './App.vue'
import router from './router'
import mitt from 'mitt';
import InfoModal from "./components/InfoModal.vue";

const app = createApp(App).use(router);
const eventBus = mitt();
app.use(createBootstrap());

app.config.globalProperties.$isLogged = ref(false)
app.config.globalProperties.$isAdmin = ref(false)
app.config.globalProperties.$eventBus = eventBus;
app.component("InfoModal", InfoModal);

console.log('Global Property $isLoged:', app.config.globalProperties.$isLogged);
console.log('Global Property $isAdmin:', app.config.globalProperties.$isAdmin);

app.mount('#app')

export default app;


