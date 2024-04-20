<template>
  <div style="display: flex;flex-direction: row">
    <div style="width: 128px;">
      <a-menu
          style="height: calc(100vh - 61.8px);border: none"
          :selectedKeys="[currentMenuItem]"
          :default-open-keys="['sub1']"
          mode="inline"
          :inline-collapsed="collapsed"
          @select="onMenuItemSelect"
      >
<!--        <a-menu-item key="1" style="margin-top: 30px">-->
<!--          <a-icon type="home"/>-->
<!--          <span>{{ $t('tools.home') }}</span>-->
<!--        </a-menu-item>-->
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>{{ $t('tools.vt') }}</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="audio" />
          <span>{{ $t('tools.at') }}</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="video-camera" />
          <span>{{ $t('tools.vg') }}</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="audio" />
          <span>{{ $t('tools.vc') }}</span>
        </a-menu-item>
      </a-menu>

    </div>

<!--    <ToolsHomePage v-if="this.currentMenuItem === '1'"></ToolsHomePage>-->
    <VideoTranslation v-if="this.currentMenuItem === '2'"></VideoTranslation>
    <AudioTranslation v-if="this.currentMenuItem === '3'"></AudioTranslation>
    <DHVideoGenerate v-if="this.currentMenuItem === '4'"></DHVideoGenerate>
    <VoiceClone v-if="this.currentMenuItem === '5'"></VoiceClone>
  </div>

</template>

<script>
import VideoTranslation from "@/components/VideoTranslation/VideoTranslation.vue";
import AudioTranslation from "@/components/AudioTranslation/AudioTranslation.vue";
// import ToolsHomePage from "@/components/ToolsPage/ToolsHomePage.vue";
import DHVideoGenerate from "@/components/DHVideoGenerate/DHVideoGenerate.vue";
import VoiceClone from "@/components/VoiceClone/VoiceClone.vue";
export default {
  props: ['passCurrentMenuItem'],
  data() {
    return {
      collapsed: false,
      currentMenuItem: ''
    };
  },
  mounted() {
    console.log("SubNavBar拿到了侧边栏索引",this.passCurrentMenuItem);
    this.currentMenuItem = this.passCurrentMenuItem;
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
    DHVideoGenerate,
    // ToolsHomePage,
    VideoTranslation,
    AudioTranslation,
    VoiceClone,
  }
};
</script>
