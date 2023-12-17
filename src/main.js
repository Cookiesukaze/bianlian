import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.css'

import i18n from "@/i18n";


Vue.use(ElementUI);


Vue.config.productionTip = false


import axios from 'axios'
axios.defaults.baseURL="http://192.168.1.102:8080/"
Vue.prototype.$http=axios

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
