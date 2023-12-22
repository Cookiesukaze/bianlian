import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
//设置的字体在appvue里，要在bootstrapcss的下面import才起作用
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
import i18n from "@/i18n";
import './global.css'


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
