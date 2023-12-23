<template>
  <div id="demopage1">
    <div class="left" style="margin-top:18vh; text-align: left;margin-left: 10vw;">
      <h1 style="font-size: 2rem">{{ $t('demo1.h1_list.h1_1') }}</h1>
      <h1 style="font-size: 3rem">{{ $t('demo1.h1_list.h1_2') }}</h1>
      <h1 style="font-size: 4rem">{{ $t('demo1.h1_list.h1_3') }}</h1>
      <h1 style="font-size: 6rem">{{ $t('demo1.h1_list.h1_4') }}</h1>
    </div>
    <div class="right" style="margin-top:15vh">
      <ImageComparison :images="imageList"></ImageComparison>
      <div class="description" style="margin-top:2vh">
        <transition name="slide-fade">
          <p>{{ $t('demo1.desc_text') }}</p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComparison from "@/components/MainPage/ImageComparison.vue";

export default {
  data(){
    return{
      imageList: ["https://cdn.pixabay.com/photo/2019/02/10/09/21/lecture-3986809_640.jpg","https://cdn.pixabay.com/photo/2020/01/22/09/39/teacher-4784916_640.jpg"]
    }
  },
  name: 'DemoPage1',
  components: {
    ImageComparison,
  }
}
</script>

<style scoped>
#demopage1 {
  display: flex;
  justify-content: space-between;
  height: 100vh;
}

.left {
  width: 30%;
  text-align: center;
  padding: 50px;
  color: #333;
}

h1 {
  font-size: 2.5em;
  letter-spacing:2px;
  font-weight: bold;
  text-shadow: 5px 1px 5px #fffdf7;
}

.right {
  width: 70%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image {
  flex: 2;
  width: 100%;
  text-align: center;
}

.description {
  flex: 1;
  width: 100%;
  text-align: center;
}

p {
  color: #666;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
