import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/Login.vue'
import NoteBookList from '@/views/NoteBookList.vue'
import NoteDetail from '@/views/NoteDetail.vue'
import TashDetail from '@/views/TashDetail.vue'
import Edit from '@/views/Edit.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {//默认路径，进来就自动跳转到login界面
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/notebooks',
    name: 'NoteBookList',
    component: NoteBookList
  },
  {
    path: '/note',
    name: 'NoteDetail.vue',
    component: NoteDetail
  },
  {
    path: '/note',
    name: 'Edit.vue',
    component: Edit
  },
  {
    path: '/trash',
    name: 'TashDetail',
    component: TashDetail
  },

]

const router = new VueRouter({
  routes
})

export default router
