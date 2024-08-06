import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'

import UserView from '../components/UserView.vue'
import AdminView from '../components/AdminView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/user', name: 'User', component: UserView},
  { path: '/admin', name: 'Admin', component: AdminView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router