import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/Login.vue'
import NoteBookList from '@/views/NoteBookList.vue'
import NoteDetail from '@/views/NoteDetail.vue'
import TashDetail from '@/views/TashDetail.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {//默认路径，进来就自动跳转到login界面
    path: '/',
    redirect: '/notebooks'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/notebooks',
    name: 'NoteBookList',
    component: () => import('@/views/NoteBookList.vue')
  },
  {
    path: '/note',
    name: 'NoteDetail.vue',
    component: () => import('@/views/NoteDetail.vue')
  },
  {
    path: '/trash',
    name: 'TashDetail',
    component: () => import('@/views/TashDetail.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
