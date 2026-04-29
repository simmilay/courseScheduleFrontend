import { createRouter, createWebHistory } from 'vue-router'
import ScheduleLayout from '../layouts/ScheduleLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Schedule',
    component: ScheduleLayout,
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: Login },
      { path: 'register', name: 'Register', component: Register },
      { path: '/login', redirect: '/auth/login' },
      { path: '/register', redirect: '/auth/register' },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
