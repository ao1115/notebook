import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import SideBar from '@/components/SideBar.vue'
import Icon from '@/components/Icon.vue'
import Nav from '@/components/Nav.vue'

Vue.component('SideBar', SideBar);
Vue.component('Icon', Icon);
Vue.component('Nav', Nav);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
