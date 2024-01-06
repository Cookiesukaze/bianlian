<template>
  <div style="margin-top:20px">
    <div class="video-container">

      <div style="display: flex;flex-direction: column;margin-left: 100px">
        <h4>{{$t('vt.input')}}</h4>
        <div class="video-box video-input-container"
             @dragover.prevent
             @drop="onDropVideo"
             @click="onBrowseClick">
          <div v-if="inputVideoSource" @click.stop="removeVideo" class="delete-icon">
            <a-button type="dashed" >
              <a-icon type="delete" style="margin-bottom: 5px;color: #929EAD;font-size: 1rem"/>
            </a-button>
          </div>
          <div v-if="!inputVideoSource" class="video-text">{{$t('vt.input_text')}}</div>
          <video v-else ref="inputVideo" controls :src="inputVideoSource"></video>
          <input type="file" id="videoInput" @change="loadVideo" v-show="false" ref="inputVideoUpload" accept="video/*">
        </div>

      </div>

      <div style="display: flex;flex-direction: column;margin-left: 30px;">
        <h4>{{$t('vt.output')}}</h4>
        <div class="video-box video-output-container">
          <div v-if="!translatedVideoUrl">
            <div v-if="translateSeconds > 0" class="video-text">{{ translateSeconds }} s, {{$t('wait_text')}}</div>
            <div v-else class="video-text">{{$t('vt.output_text')}}</div>
          </div>
          <div v-else>
            <div class="delete-icon">
              <a-button type="dashed" >
                {{ translateSeconds }} s
              </a-button>
            </div>
            <video  controls :src="translatedVideoUrl"></video>
          </div>
        </div>
      </div>


    </div>

    <div class="controls-container">
      <a-select v-model="targetLanguage" style="width: 220px;">
        <a-select-option value="">{{$t('vt.choose_target')}}</a-select-option>
        <a-select-option v-for="language in $t('vt.language_list')" :key="language.value" :value="language.value">
          {{ language.text }}
        </a-select-option>
      </a-select>

      <a-select v-model="chooseModel" style="margin-left: 10px;width: 150px;">
        <a-select-option value="">{{$t('vt.choose_model')}}</a-select-option>
        <a-select-option v-for="model in $t('vt.model_list')" :key="model.value" :value="model.value">
          {{ model.text }}
        </a-select-option>
      </a-select>

      <a-select v-model="chooseTone" style="margin-left: 10px;width: 170px;">
        <a-select-option value="">{{$t('vt.choose_tone')}}</a-select-option>
        <a-select-option v-for="tone in $t('vt.tone_list')" :key="tone.value" :value="tone.value">
          {{ tone.text }}
        </a-select-option>
      </a-select>

    </div>
    <div class="center" style="margin-top:30px">
      <a-button @click="translateVideo" type="primary" size='large'>
        {{$t('vt.translate')}}
      </a-button>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      inputVideoSource: '',
      targetLanguage: '',
      chooseModel: '',
      chooseTone: '',
      translatedVideoUrl: '',
      translateSeconds: 0,  // 计时器
      logMessages: [],  // 用来储存日志消息
      socket: null,     // 用来储存 WebSocket 连接
    }
  },
  mounted() {//专用于监听后端log
    // 初始化 WebSocket 连接
    this.socket = io('http://127.0.0.1:5000');
    // 监听新的日志消息
    this.socket.on('message', (message) => {
      this.logMessages.push(message);
      console.log(message);  // 在控制台打印日志消息
    });
  },
  methods: {
    removeVideo(){
      this.inputVideoSource = '';
    },
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
        this.loadVideo({target: {files}});
      }
    },
    async translateVideo(){
      if (!this.$refs.inputVideoUpload || !this.$refs.inputVideoUpload.files || this.$refs.inputVideoUpload.files.length === 0){
        alert(this.$t('vt.alert_list[0].text'));
        return;
      }
      if(!this.targetLanguage || !this.chooseModel || !this.chooseTone){
        alert(this.$t('vt.alert_list[1].text'));
        return;
      }
      let videoFile = this.$refs.inputVideoUpload.files[0];
      let formData = new FormData();
      formData.append('language', this.targetLanguage);
      formData.append('model', this.chooseModel);
      formData.append('tone', this.chooseTone);
      formData.append('video', videoFile);

      let model_path = '/vt/wav2lip'
      if(this.chooseModel==="wav2lip") {model_path = '/vt/wav2lip'}


      // 开始计时
      this.translateSeconds = 0;
      let timer = setInterval(() => {
        this.translateSeconds += 1;
      }, 1000);

      const result = await fetch(model_path, {
        method: 'POST',
        body: formData
      });
      clearInterval(timer);  // 结束计时

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
  border: 2px dashed #a2a2a2;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}
.video-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #bbb;
  font-size: 18px;
  z-index: 10;
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
  margin-left: 100px;
  margin-top: 30px;
  display: flex;
  //justify-content: space-between; /*等距分布*/
  justify-content: flex-start;
}
.delete-icon {
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
  z-index: 10;
}
</style>
