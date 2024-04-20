<template>
  <div id="demopage2">
    <div class="left" style="margin-top:15vh">
      <ImageComparison :images="imageList"></ImageComparison>
      <div class="description" style="margin-top:2vh">
        <transition name="slide-fade">
          <p>{{ $t('demo2.desc_text') }}</p>
        </transition>
      </div>
    </div>
    <div class="right" style="margin-top:18vh; text-align: right; margin-right: 10vw;">
      <h1 style="font-size: 2rem">{{ $t('demo2.h2_list.h2_1') }}</h1>
      <h1 style="font-size: 3rem">{{ $t('demo2.h2_list.h2_2') }}</h1>
      <h1 style="font-size: 4rem">{{ $t('demo2.h2_list.h2_3') }}</h1>
      <h1 style="font-size: 6rem">{{ $t('demo2.h2_list.h2_4') }}</h1>
    </div>
  </div>
</template>

<script>
import ImageComparison from "@/components/MainPage/ImageComparison.vue";

export default {
  data(){
    return{
      imageList: ["https://cdn.pixabay.com/photo/2016/01/10/21/05/mic-1132528_1280.jpg","https://cdn.pixabay.com/photo/2014/01/04/13/38/tin-can-238488_1280.jpg"]
    }
  },
  name: 'DemoPage2',
  components: {
    ImageComparison,
  }
}
</script>

<style scoped>
#demopage2 {
  display: flex;
  justify-content: space-between;
  height: 100vh;
}

.left {
  width: 70%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right {
  width: 30%;
  text-align: right;
  padding: 50px;
  color: #333;
}

h1 {
  font-size: 2.5em;
  letter-spacing:2px;
  font-weight: bold;
  text-shadow: 5px 1px 5px #fffdf7;
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
