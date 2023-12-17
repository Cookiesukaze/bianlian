import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "@/components/MainPage/MainPage.vue";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect:'/mainpage'
  },
  {
    path:'/mainpage',
    name:'MainPage',
    component: MainPage
  },
]

const router = new VueRouter({
  mode:"hash",
  base: process.env.BASE_URL,
  routes
})

export default router;

