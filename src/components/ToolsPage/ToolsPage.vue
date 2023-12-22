<template>
  <div>
    <NavBar></NavBar>
    <SubNavBar></SubNavBar>
  </div>
</template>

<script>
import SubNavBar from "@/components/ToolsPage/SubNavBar.vue";
import NavBar from "@/components/ToolsPage/NavBar.vue";

export default {
  components: {
    NavBar,
    SubNavBar
  }
}
</script>
