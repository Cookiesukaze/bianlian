import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "@/components/MainPage/MainPage.vue";
import ToolsPage from "@/components/ToolsPage/ToolsPage.vue";
import AboutUs from "@/components/About/AboutUs.vue";

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
  {
    path:'/toolspage',
    name:'ToolsPage',
    component: ToolsPage
  },
  {
    path:'/aboutus',
    name:'AboutUs',
    component: AboutUs
  },
]

const router = new VueRouter({
  mode:"hash",
  base: process.env.BASE_URL,
  routes
})

export default router;

