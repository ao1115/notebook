import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/Login.vue'
import NoteBookList from '@/views/NoteBookList.vue'
import NoteDetail from '@/views/NoteDetail.vue'
import TashDetail from '@/views/TashDetail.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/notebooks',
    name: 'NoteBookList',
    component: NoteBookList
  },
  {
    path: '/note/:noteId',
    name: 'NoteDetail.vue',
    component: NoteDetail
  },
  {
    path: '/trash/:noteId',
    name: 'TashDetail',
    component: TashDetail
  },

]

const router = new VueRouter({
  routes
})

export default router
