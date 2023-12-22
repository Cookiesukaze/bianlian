<template>
  <div style="margin-top:20px">
    <div class="video-container">

      <div style="display: flex;flex-direction: column;margin-left: 100px">
        <h4>{{$t('vt.input')}}</h4>
        <div class="video-box video-input-container"
             @dragover.prevent
             @drop="onDropVideo"
             @click="onBrowseClick">
          <div v-if="!inputVideoSource" class="video-text">{{$t('vt.input_text')}}</div>
          <video v-else ref="inputVideo" controls :src="inputVideoSource"></video>
          <input type="file" @change="loadVideo" v-show="false" ref="inputVideoUpload" accept="video/*">
        </div>
        <div class="controls-container">
          <select v-model="targetLanguage">
            <option value="">{{$t('vt.choose_target')}}</option>
            <option v-for="language in $t('vt.language_list')" :key="language.value" :value="language.value">
              {{ language.text }}
            </option>
          </select>

          <button @click="translateVideo">{{$t('vt.translate')}}</button>
        </div>
      </div>

      <div style="display: flex;flex-direction: column;margin-left: 10px;">
        <h4>{{$t('vt.output')}}</h4>
        <div class="video-box video-output-container">
          <div v-if="!translatedVideoUrl" class="video-box"></div>
          <div v-if="!translatedVideoUrl" class="video-text">{{$t('vt.output_text')}}</div>
          <video v-else controls :src="translatedVideoUrl"></video>
        </div>
      </div>


    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVideoSource: '',
      targetLanguage: '',
      translatedVideoUrl: ''
    }
  },
  methods: {
    onBrowseClick() {
      this.$refs.inputVideoUpload.click();
    },
    loadVideo(event) {
      const file = event.target.files[0];
      this.inputVideoSource = URL.createObjectURL(file);
    },
    onDropVideo(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length) {
        this.loadVideo({ target: { files } });
      }
    },
    async translateVideo() {
      const result = await fetch('你的视频翻译API', {
        method: 'POST',
        body: new FormData({
          language: this.targetLanguage,
          video: this.$refs.inputVideo.src
        })
      });

      const blob = await result.blob();
      this.translatedVideoUrl = URL.createObjectURL(blob);
    }
  }
}
</script>

<style scoped>
body{
  font-family: opposans, 微软雅黑, monospace;
}
.video-container {
  display: flex;
  justify-content: space-between;
}
.video-box {
  max-width: 45vw;
  min-width: 560px;
  height: 315px;
  padding-bottom: 25.25%; /* 16:9 aspect ratio */
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;
}
.video-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #bbb;
  font-size: 18px;
}
video {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}
.controls-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between; /*等距分布*/
}
</style>
