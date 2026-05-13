import { createRouter, createWebHistory } from 'vue-router'
import ScheduleLayout from '../layouts/ScheduleLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import Login from '../views/Login.vue'
import Home from '../views/ScheduleView.vue'
import DataView from '../views/DataView.vue'
import Settings from '../views/Settings.vue'
import Register from '../views/Register.vue'
import ClassroomList from '@/components/data/ClassroomList.vue'
import CourseList from '@/components/data/CourseList.vue'
import TeacherList from '@/components/data/TeacherList.vue'
import RequirementList from '@/components/data/RequirementList.vue'
import RoomList from '@/components/data/RoomList.vue'
const routes = [
  {
    path: '/',
    name: 'Schedule',
    component: ScheduleLayout,
    children: [
      { path: 'home', name: 'Home', component: Home },
      { path: 'data', name: 'Data', component: DataView },
      { path: 'settings', name: 'Settings', component: Settings },
      { path: '/', redirect: '/home' },
      {
        path: '/teachers',
        name: 'Teachers',
        component: TeacherList,
      },
      {
        path: '/classrooms',
        name: 'Classrooms',
        component: ClassroomList,
      },
      {
        path: '/courses',
        name: 'Courses',
        component: CourseList,
      },
      {
        path: '/requirements',
        name: 'Requirements',
        component: RequirementList,
      },
      {
        path: '/rooms',
        name: 'Rooms',
        component: RoomList,
      },
    ],
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
