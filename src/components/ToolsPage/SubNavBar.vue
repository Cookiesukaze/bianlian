<template>
  <div style="display: flex;flex-direction: row">
    <div style="width: 128px;">
      <a-menu
          style="height: calc(100vh - 61.8px);border: none"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          mode="inline"
          :inline-collapsed="collapsed"
          @select="onMenuItemSelect"
      >
        <a-menu-item key="1" style="margin-top: 30px">
          <a-icon type="home"/>
          <span>{{ $t('tools.home') }}</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>{{ $t('tools.vt') }}</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="audio" />
          <span>{{ $t('tools.at') }}</span>
        </a-menu-item>
      </a-menu>

    </div>

    <VideoTranslation v-if="currentMenuItem === '2'"></VideoTranslation>
    <AudioTranslation v-if="currentMenuItem === '3'"></AudioTranslation>
  </div>

</template>

<script>
import VideoTranslation from "@/components/VideoTranslation/VideoTranslation.vue";
import AudioTranslation from "@/components/AudioTranslation/AudioTranslation.vue";
export default {
  data() {
    return {
      collapsed: false,
      currentMenuItem: ''
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    onMenuItemSelect(e) {
      this.currentMenuItem = e.key;
    }
  },
  components: {
    VideoTranslation,
    AudioTranslation
  }
};
</script>
