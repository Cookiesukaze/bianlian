<template>
  <div class="">
    <div class="page-100vh">
      <NavBar></NavBar>
      <MainContent></MainContent>
      <ImageCarousel></ImageCarousel>
    </div>
    <DemoPage1></DemoPage1>
  </div>
</template>

<script>
import NavBar from "@/components/MainPage/NavBar.vue";
import MainContent from "@/components/MainPage/MainContent.vue";
import ImageCarousel from "@/components/MainPage/ImageCarousel.vue";
import '../../global/hue_bg.scss'
import DemoPage1 from "@/components/MainPage/DemoPage1.vue";

export default {
  name: 'MainPage',
  components:{
    NavBar,MainContent,ImageCarousel,DemoPage1
  },
  data() {
    return {
    };
  },
}
</script>

<style>
.page-100vh{
  height: 100vh;
}
</style>
