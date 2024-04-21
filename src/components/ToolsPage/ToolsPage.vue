<template>
  <div>
    <NavBar></NavBar>
    <SubNavBar :passCurrentMenuItem="this.$route.params.currentMenuItem"></SubNavBar>
  </div>
</template>

<script>
import SubNavBar from "@/components/ToolsPage/SubNavBar.vue";
import NavBar from "@/components/ToolsPage/NavBar.vue";

export default {
  components: {
    NavBar,
    SubNavBar
  },
  mounted() {
    console.log("ToolsPage拿到了侧边栏索引",this.$route.params.currentMenuItem)
  },
}
</script>
