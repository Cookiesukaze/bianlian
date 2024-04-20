<template>
  <div id="aboutpage">
    <div class="back-button" @click="goBack">
      {{ $t('about.return_text') }}
    </div>
    <div class="left">
      <h1>{{ $t('about.aboutus') }}</h1>
      <div style="margin-top: 70px;">
        <p>{{ $t('about.aboutus_text_1') }}</p>
        <p>{{ $t('about.aboutus_text_2') }}</p>
        <p>{{ $t('about.aboutus_text_3') }}</p>
        <p>{{ $t('about.aboutus_text_4') }}</p>
      </div>
    </div>
    <div class="right">
      <img src="https://p1.ssl.qhmsg.com/t0125dc16bb7040817f.jpg" alt="About Us Image">
    </div>
  </div>
</template>

<script>
import '../../global/next_style_bg.scss'

export default {
  name: 'AboutPage',
  methods: {
    goBack() {
      this.$router.push('/'); // 替换为您的主页路由路径
    }
  }
}
</script>

<style scoped>
#aboutpage {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
}

.left {
  width: 60%;
  padding-left: 80px;
  padding-top: 150px;
  text-align: left;
}

h1 {
  font-size: 3rem;
  margin-bottom: 30px;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #666;
}

.right {
  width: 40%;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 100%;
  max-height: 80vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
