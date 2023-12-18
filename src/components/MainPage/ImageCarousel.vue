<template>
  <div class="center paddingt5 ">
    <div class="scroll-container">
      <div class="left scroll-shadow-left" style="z-index: 1"></div>
      <div class="scroll-wrapper" :style="{animationDuration: duration + 's'}">
        <div class="scroll-item" v-for="item in items.concat(items)" :key="item.id">
          <img :src="item.src" alt="" />
        </div>
      </div>
      <div class="right scroll-shadow-right"></div>
    </div>
  </div>
</template>

<script>
import "../../global.css"
export default {
  data() {
    return {
      items: [
        // 你的图片列表
        {id: 1, src: 'https://s11.ax1x.com/2023/12/17/pi5ygEV.png'},
        {id: 2, src: 'https://s11.ax1x.com/2023/12/17/pi5cmWD.png'},
        {id: 3, src: 'https://s11.ax1x.com/2023/12/17/pi5y2NT.png'},
        {id: 4, src: 'https://s11.ax1x.com/2023/12/17/pi5ctfS.png'},
        {id: 5, src: 'https://s11.ax1x.com/2023/12/17/pi5calQ.png'},
        // 更多图片...
      ],
      duration: 50 // 根据需要调整滚动速度
    };
  },
};
</script>

<style scoped>
.carousel {
  background-color: #f9f9f9; /* Use the color from OpenAI website */
}
.scroll-container {
  width: 400px;
  height: 150px;
  overflow: hidden;
  position: relative;
}

.scroll-wrapper {
  display: flex;
  position: absolute;
  animation: scroll linear infinite;
}

.scroll-item {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  margin-right: 40px; /* 你可以根据需要调整间距 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.scroll-shadow-left{
  position: absolute;
  width: 50px;
  height: 100px;
  background-image: linear-gradient(to right, rgba(249, 251, 251, 1), rgba(255, 255, 255, 0));
}
.scroll-shadow-right{
   position: absolute;
   width: 50px;
   height: 100px;
   background-image: linear-gradient(to left, rgba(249, 251, 251, 1), rgba(255, 255, 255, 0));
 }
</style>
