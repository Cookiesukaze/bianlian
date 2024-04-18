<template>
  <div style="margin-top:20px">
    <div class="audio-container">
      <div style="display: flex;flex-direction: column;margin-left: 100px">
        <h4>{{$t('vg.input')}}</h4>
        <div class="audio-box audio-input-container"
             @dragover.prevent
             @drop="onDropAudio"
             @click="onBrowseClick">
          <div v-if="inputAudioSource" @click.stop="removeAudio" class="delete-icon">
            <a-button type="dashed" >
              <a-icon type="delete" style="margin-bottom: 5px;color: #929EAD;font-size: 1rem"/>
            </a-button>
          </div>
          <div v-if="!inputAudioSource" class="audio-text">{{$t('vg.input_text')}}</div>
          <audio v-else ref="inputAudio" controls :src="inputAudioSource"></audio>
          <input type="file" id="audioInput" @change="loadAudio" v-show="false" ref="inputAudioUpload" accept="audio/*">
        </div>
      </div>

      <div style="display: flex;flex-direction: column;margin-left: 30px;">
        <h4>{{$t('vg.output')}}</h4>
        <div class="video-box video-output-container">
          <div v-if="!translatedVideoUrl">
            <div v-if="translateSeconds > 0">
              <div class="video-text">{{ translateSeconds }} s, {{$t('wait_text')}}</div>
              <div class="progress-bar-container-3">
                <div class="progress-bar-3" :style="{ width: progressBarValue + '%' }"></div>
              </div>
            </div>
            <div v-else class="video-text">{{$t('vg.output_text')}}</div>
          </div>
          <div v-else>
            <div class="delete-icon">
              <a-button type="dashed" >
                {{ translateSeconds }} s
              </a-button>
            </div>
            <video controls :src="translatedVideoUrl"></video>
          </div>
        </div>
      </div>
    </div>

    <div class="controls-container">
      <a-select v-model="chooseModel" style="width: 150px;">
        <a-select-option value="">{{$t('vg.choose_model')}}</a-select-option>
        <a-select-option v-for="model in $t('vg.model_list')" :key="model.value" :value="model.value">
          {{ model.text }}
        </a-select-option>
      </a-select>

      <a-select v-model="chooseDigitalHuman" style="margin-left: 10px;width: 150px;">
        <a-select-option value="">{{$t('vg.choose_digital_human')}}</a-select-option>
        <a-select-option v-for="digitalHuman in $t('vg.digital_human_list')" :key="digitalHuman.value" :value="digitalHuman.value">
          {{ digitalHuman.text }}
        </a-select-option>
      </a-select>
    </div>

    <div class="center" style="margin-top:30px">
      <a-button @click="generateVideo" type="primary" size='large'>
        {{$t('vg.generate')}}
      </a-button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      inputAudioSource: '',
      chooseModel: '',
      chooseDigitalHuman: '',
      translatedVideoUrl: '',
      translateSeconds: 0,
      logMessages: [],
      socket: null,
      progressBarValue: 0,
    }
  },
  mounted() {
    this.socket = io('https://u323673-a695-9decea59.westb.seetacloud.com:8443');
    this.socket.on('message', (message) => {
      this.logMessages.push(message);
      console.log(message);
    });
  },
  methods: {
    removeAudio() {
      this.inputAudioSource = '';
    },
    onBrowseClick() {
      this.$refs.inputAudioUpload.click();
    },
    loadAudio(event) {
      const file = event.target.files[0];
      this.inputAudioSource = URL.createObjectURL(file);
    },
    onDropAudio(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length) {
        this.loadAudio({ target: { files } });
      }
    },
    async generateVideo() {
      this.startProgressBar();

      if (!this.$refs.inputAudioUpload || !this.$refs.inputAudioUpload.files || this.$refs.inputAudioUpload.files.length === 0) {
        alert(this.$t('vg.alert_list[0].text'));
        return;
      }
      if (!this.chooseModel || !this.chooseDigitalHuman) {
        alert(this.$t('vg.alert_list[1].text'));
        return;
      }
      let audioFile = this.$refs.inputAudioUpload.files[0];
      let formData = new FormData();
      formData.append('digital_human', this.chooseDigitalHuman);
      formData.append('audio', audioFile);
      let model_path =''
      if(this.chooseModel==='genefacepp')
        model_path = 'https://u323673-a695-9decea59.westb.seetacloud.com:8443/vg/genefacepp/audio2video';

      this.translateSeconds = 0;
      let timer = setInterval(() => {
        this.translateSeconds += 1;
      }, 1000);

      const result = await fetch(model_path, {
        method: 'POST',
        body: formData
      });
      clearInterval(timer);

      const blob = await result.blob();
      this.translatedVideoUrl = URL.createObjectURL(blob);
    },
    startProgressBar() {
      const maxProgress = 99;
      const updateSpeed = 500;

      const interval = setInterval(() => {
        if (this.progressBarValue >= maxProgress) {
          clearInterval(interval);
        } else {
          this.progressBarValue += 1;
        }
      }, updateSpeed);
    },
  }
}
</script>

<style scoped>
body{
  font-family: opposans, 微软雅黑, monospace;
}

.progress-bar-container-3 {
  position: absolute;
  top: 50%;
  left: 20%;
  width: 60%;
  background-color: #e0e0e0;
  border-radius: 3px;
}

.progress-bar-3 {
  height: 10px;
  background-color: #4caf50;
  width: 0%;
  border-radius: 3px;
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
  top: 40%;
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
.audio-container {
  display: flex;
  justify-content: space-between;
}
.audio-box {
  max-width: 45vw;
  min-width: 560px;
  height: 70px;
  border: 2px dashed #a2a2a2;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}
.audio-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #bbb;
  font-size: 18px;
  z-index: 10;
}
audio {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}
</style>
