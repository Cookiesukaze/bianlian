<template>
  <div style="margin-top:20px">
    <div class="audio-container">
      <div style="display: flex;flex-direction: column;margin-left: 100px">
        <h4>{{$t('vc.input')}}</h4>
        <div class="audio-box audio-input-container"
             @dragover.prevent
             @drop="onDropAudio"
             @click="onBrowseClick">
          <div v-if="inputAudioSource" @click.stop="removeAudio" class="delete-icon">
            <a-button type="dashed" >
              <a-icon type="delete" style="margin-bottom: 5px;color: #929EAD;font-size: 1rem"/>
            </a-button>
          </div>
          <div v-if="!inputAudioSource" class="audio-text">{{$t('vc.input_text')}}</div>
          <audio v-else ref="inputAudio" controls :src="inputAudioSource"></audio>
          <input type="file" id="audioInput" @change="loadAudio" v-show="false" ref="inputAudioUpload" accept="audio/*">
        </div>
      </div>

      <div style="display: flex;flex-direction: column;margin-left: 30px;">
        <h4>{{$t('vc.output')}}</h4>
        <div class="audio-box audio-output-container">
          <div v-if="!translatedAudioUrl">
            <div v-if="translateSeconds > 0">
              <div class="audio-text">{{ translateSeconds }} s, {{$t('wait_text')}}</div>
              <div class="progress-bar-container-4">
                <div class="progress-bar-4" :style="{ width: progressBarValue + '%' }"></div>
              </div>
            </div>
            <div v-else class="audio-text">{{$t('vc.output_text')}}</div>
          </div>
          <div v-else>
            <div class="delete-icon">
              <a-button type="dashed" >
                {{ translateSeconds }} s
              </a-button>
            </div>
            <audio controls :src="translatedAudioUrl"></audio>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex;flex-direction: column;margin-left: 100px; margin-top: 20px;">
      <h4>{{$t('vc.text_input_text')}}</h4>
      <div class="text-input-container">
        <div v-if="!inputText" class="text-input-placeholder">{{$t('vc.text_input_placeholder')}}</div>
        <textarea v-model="inputText" class="text-input"></textarea>
      </div>
    </div>

    <div class="controls-container">
      <a-select v-model="chooseModel" style="width: 150px;">
        <a-select-option value="">{{$t('vc.choose_model')}}</a-select-option>
        <a-select-option v-for="model in $t('vc.model_list')" :key="model.value" :value="model.value">
          {{ model.text }}
        </a-select-option>
      </a-select>
    </div>

    <div class="center" style="margin-top:30px">
      <a-button @click="generateAudio" type="primary" size='large'>
        {{$t('vc.generate')}}
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
      inputText: '',
      chooseModel: '',
      translatedAudioUrl: '',
      translateSeconds: 0,
      logMessages: [],
      socket: null,
      progressBarValue: 0,
    }
  },
  mounted() {
    this.socket = io('http://127.0.0.1:5001');
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
    async generateAudio() {
      this.startProgressBar();

      if (!this.$refs.inputAudioUpload || !this.$refs.inputAudioUpload.files || this.$refs.inputAudioUpload.files.length === 0) {
        alert(this.$t('vc.alert_list[0].text'));
        return;
      }
      if (!this.chooseModel) {
        alert(this.$t('vc.alert_list[1].text'));
        return;
      }
      let audioFile = this.$refs.inputAudioUpload.files[0];
      let formData = new FormData();
      formData.append('text', this.inputText);
      formData.append('audio', audioFile);

      let model_path = '';
      if (this.chooseModel === 'metavoice')
        model_path = 'https://u323673-8c85-1696ded4.westb.seetacloud.com:8443/vc/metavoice';

      this.translateSeconds = 0;
      let timer = setInterval(() => {
        this.translateSeconds += 1;
      }, 1000);

      const result = await fetch(model_path, {
        method: 'POST',
        body: formData
      });

      clearInterval(timer);

      if (result.ok) {
        const blob = await result.blob();
        this.translatedAudioUrl = URL.createObjectURL(blob);
      } else {
        const error = await result.json();
        alert(error.error);
      }
    },
    startProgressBar() {
      const maxProgress = 99;
      const updateSpeed = 200;

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
body {
  font-family: opposans, 微软雅黑, monospace;
}

.progress-bar-container-4 {
  position: absolute;
  top: 50%;
  left: 20%;
  width: 60%;
  background-color: #e0e0e0;
  border-radius: 3px;
}

.progress-bar-4 {
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
  padding-bottom: 25.25%;
  /* 16:9 aspect ratio */
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

.text-input-container {
  position: relative;
  width: 560px;
}

.text-input-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #bbb;
  font-size: 18px;
  z-index: 10;
  pointer-events: none;
}

.text-input {
  background: transparent !important;
  width: 100%;
  height: 70px;
  border: 2px dashed #a2a2a2;
  border-radius: 5px;
  resize: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
