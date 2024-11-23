import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'
import UserView from '../components/UserView.vue'
import AdminView from '../components/AdminView.vue'
import CreateHotelView from '../components/CreateHotelView.vue'
import CreateRoomView from '../components/CreateRoomView.vue'
import SearchFreeRoomsView from '../components/SearchFreeRoomsView.vue'

const routes = [
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/user', name: 'User', component: UserView},
  { path: '/admin', name: 'Admin', component: AdminView},
  { path: '/hotel/create', name: 'CreateHotel', component: CreateHotelView},
  { path: '/room/create', name: 'CreateRoom', component: CreateRoomView},
  { path: '/', name: 'SearchFreeRooms', component: SearchFreeRoomsView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router