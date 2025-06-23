import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../views/UserList.vue';

const routes = [
  { path: '/', name: 'users', component: UserList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
