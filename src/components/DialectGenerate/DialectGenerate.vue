<template>
  <div style="margin-top:20px">
    <div class="audio-container">
      <div style="display: flex;flex-direction: column;margin-left: 100px">
        <h4>{{$t('dg.text_input_text')}}</h4>
        <div class="text-input-container">
          <div v-if="!inputText" class="text-input-placeholder">{{$t('dg.text_input_placeholder')}}</div>
          <textarea v-model="inputText" class="text-input"></textarea>
        </div>
      </div>

      <div style="display: flex;flex-direction: column;margin-left: 30px;">
        <h4>{{$t('dg.output')}}</h4>
        <div class="audio-box audio-output-container">
          <div v-if="!translatedAudioUrl">
            <div v-if="translateSeconds > 0">
              <div class="audio-text">{{ translateSeconds }} s, {{$t('wait_text')}}</div>
              <div class="progress-bar-container-5">
                <div class="progress-bar-5" :style="{ width: progressBarValue + '%' }"></div>
              </div>
            </div>
            <div v-else class="audio-text">{{$t('dg.output_text')}}</div>
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

    <div class="controls-container" style="margin-left: 100px; margin-top: 20px;">
      <a-select v-model="chooseTarget" style="width: 150px;">
        <a-select-option value="">{{$t('dg.choose_target')}}</a-select-option>
        <a-select-option v-for="language in $t('dg.language_list')" :key="language.value" :value="language.value">
          {{ language.text }}
        </a-select-option>
      </a-select>

      <a-select v-model="chooseModel" style="width: 150px; margin-left: 10px;">
        <a-select-option value="">{{$t('dg.choose_model')}}</a-select-option>
        <a-select-option v-for="model in $t('dg.model_list')" :key="model.value" :value="model.value">
          {{ model.text }}
        </a-select-option>
      </a-select>

      <a-select v-model="chooseTone" style="width: 150px; margin-left: 10px;">
        <a-select-option value="">{{$t('dg.choose_tone')}}</a-select-option>
        <a-select-option v-for="tone in $t('dg.tone_list')" :key="tone.value" :value="tone.value">
          {{ tone.text }}
        </a-select-option>
      </a-select>
    </div>

    <div class="center" style="margin-top:30px">
      <a-button @click="generateAudio" type="primary" size='large'>
        {{$t('dg.generate')}}
      </a-button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      inputText: '',
      chooseTarget: '',
      chooseModel: '',
      chooseTone: '',
      translatedAudioUrl: '',
      translateSeconds: 0,
      logMessages: [],
      socket: null,
      progressBarValue: 0,
    }
  },
  mounted() {
    this.socket = io('http://127.0.0.1:5005');
    this.socket.on('message', (message) => {
      this.logMessages.push(message);
      console.log(message);
    });
  },
  methods: {
    async generateAudio() {
      this.startProgressBar();

      if (!this.inputText) {
        alert(this.$t('dg.alert_list[0].text'));
        return;
      }
      if (!this.chooseTarget || !this.chooseModel || !this.chooseTone) {
        alert(this.$t('dg.alert_list[1].text'));
        return;
      }

      let formData = {
        text: this.inputText,
        dialect: this.chooseTarget,
        speaker: this.chooseTone
      };

      let model_path = 'http://127.0.0.1:5005/dg/moegoe';

      this.translateSeconds = 0;
      let timer = setInterval(() => {
        this.translateSeconds++;
      }, 1000);

      try {
        let response = await fetch(model_path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const blob = await response.blob();
          this.translatedAudioUrl = URL.createObjectURL(blob);
        } else {
          const error = await response.json();
          alert(error.error);
        }
      } catch (error) {
        console.error(error);
        alert(this.$t('dg.alert_list[3].text'));
      } finally {
        clearInterval(timer);
        this.stopProgressBar();
      }
    },
    startProgressBar() {
      this.progressBarValue = 0;
      this.progressBarInterval = setInterval(() => {
        if (this.progressBarValue < 100) {
          this.progressBarValue += 1;
        } else {
          clearInterval(this.progressBarInterval);
        }
      }, 100);
    },
    stopProgressBar() {
      clearInterval(this.progressBarInterval);
      this.progressBarValue = 100;
    }
  }
}
</script>

<style scoped>
body {
  font-family: opposans, 微软雅黑, monospace;
}

.progress-bar-container-5 {
  position: absolute;
  top: 50%;
  left: 20%;
  width: 60%;
  background-color: #e0e0e0;
  border-radius: 3px;
}

.progress-bar-5 {
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
