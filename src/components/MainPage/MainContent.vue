<template>
  <div class="main-content">
    <div class="paddingt10"></div>
    <h1 class="main-title text-shadow">{{ $t('title') }}</h1>
    <div class="paddingt10"></div>
    <h2 class="subtitle">{{ $t('sub_title.1') }}<span class="highlight underline-magical">{{ $t('sub_title.2') }}</span>{{ $t('sub_title.3') }}<span class="highlight underline-magical">{{ $t('sub_title.4') }}</span></h2>
    <button class="get-start-btn btn-hollow" @click="gotoToolsPage">{{ $t('get_start_for_free') }}</button>
  </div>
</template>

<script>
import '../../global.css'
import '../../global/underline_magical.css'
import '../../global/underline_magical.js'
import '../../global/next_style_bg.scss'
import '../../global/button_style.scss'

export default {
  methods:{
    gotoToolsPage(){
      this.$router.push({name:'ToolsPage', params: { currentMenuItem: '2' }});
    }
  }
}

</script>

<style scoped>
body{
  font-family: opposans,微软雅黑,monospace;
}
.main-content {
  text-align: center;
  padding: 50px 20px;
  //background-color: #f9f9f9; /* Use the color from OpenAI website */
}

.main-title {
  letter-spacing:2px;
  font-family: opposansL, 微软雅黑, monospace;
  font-size: 3em;
  color: #333;
  /* Add rainbow effect if desired */
}

.subtitle {
  font-size: 1.5em;
  color: #333;
}

.highlight {
  /* Add rainbow effect if desired */
}

</style>

