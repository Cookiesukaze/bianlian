<template>
  <div style="margin-top:20px">
    <div class="audio-container">

      <div style="display: flex;flex-direction: column;margin-left: 100px">
        <h4>{{$t('at.input')}}</h4>
        <div class="audio-box audio-input-container"
             @dragover.prevent
             @drop="onDropAudio"
             @click="onBrowseClick">
          <div v-if="inputAudioSource" @click.stop="removeAudio" class="delete-icon">
            <a-button type="dashed" >
              <a-icon type="delete" style="margin-bottom: 5px;color: #929EAD;font-size: 1rem"/>
            </a-button>
          </div>
          <div v-if="!inputAudioSource" class="audio-text">{{$t('at.input_text')}}</div>
          <audio v-else ref="inputAudio" controls :src="inputAudioSource"></audio>
          <input type="file" id="audioInput" @change="loadAudio" v-show="false" ref="inputAudioUpload" accept="audio/*">
        </div>

      </div>

      <div style="display: flex;flex-direction: column;margin-left: 30px;">
        <h4>{{$t('at.output')}}</h4>
        <div class="audio-box audio-output-container">
          <div v-if="!translatedAudioUrl">
            <div v-if="translateSeconds > 0" class="audio-text">{{ translateSeconds }} s, {{$t('wait_text')}}</div>
            <div v-else class="audio-text">{{$t('at.output_text')}}</div>
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

    <div class="controls-container">
      <a-select v-model="targetLanguage" style="width: 220px;">
        <a-select-option value="">{{$t('at.choose_target')}}</a-select-option>
        <a-select-option v-for="language in $t('at.language_list')" :key="language.value" :value="language.value">
          {{ language.text }}
        </a-select-option>
      </a-select>

      <a-select v-model="chooseTone" style="margin-left: 10px;width: 170px;">
        <a-select-option value="">{{$t('at.choose_tone')}}</a-select-option>
        <a-select-option v-for="tone in $t('at.tone_list')" :key="tone.value" :value="tone.value">
          {{ tone.text }}
        </a-select-option>
      </a-select>

    </div>
    <div class="center" style="margin-top:30px">
      <a-button @click="translateAudio" type="primary" size='large'>
        {{$t('at.translate')}}
      </a-button>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      inputAudioSource: '',
      targetLanguage: '',
      chooseTone: '',
      translatedAudioUrl: '',
      translateSeconds: 0,  // 计时器
    }
  },
  methods: {
    removeAudio(){
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
        this.loadAudio({target: {files}});
      }
    },
    async translateAudio(){
      if (!this.$refs.inputAudioUpload || !this.$refs.inputAudioUpload.files || this.$refs.inputAudioUpload.files.length === 0){
        alert(this.$t('at.alert_list[0].text'));
        return;
      }
      if(!this.targetLanguage || !this.chooseTone){
        alert(this.$t('at.alert_list[1].text'));
        return;
      }
      let audioFile = this.$refs.inputAudioUpload.files[0];
      let formData = new FormData();
      formData.append('language', this.targetLanguage);
      formData.append('tone', this.chooseTone);
      formData.append('audio', audioFile);

      let model_path = '/at/baidu'

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
      this.translatedAudioUrl = URL.createObjectURL(blob);
    }
  }
}
</script>

<style scoped>
body{
  font-family: opposans, 微软雅黑, monospace;
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
.controls-container {
  margin-left: 100px;
  margin-top: 30px;
  display: flex;
//justify-content: space-between; /*等距分布*/
  justify-content: flex-start;
}
.delete-icon {
  position: absolute;
  right: 5px;
  top: 2audiopx;
  cursor: pointer;
  z-index: 10;
}
</style>
