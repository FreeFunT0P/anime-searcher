<template>
  <div class="main-page">
    <div class="header">
      <header-bar />
    </div>
    <div class="right">
      <right-bar />
    </div>
    <div class="contentBar">
      <content-wrapper />
    </div>
  </div>
</template>


<script>

import RightBar from "@/components/RightBar";
import ContentWrapper from "@/components/ContentWrapper";
import HeaderBar from "@/components/HeaderBar"


export default {
  name: 'MainPage',
  components: {
    HeaderBar,
    RightBar,
    ContentWrapper,
  },
  data () {
    return {
    }
  },
  methods: {
    goto(name) {
      if (name === this.$router.history.current.name) {
        return
      }

      switch (name) {
        case 'contentBar1':
          this.$router.push({ name: 'contentBar1', params: { id: '1' } })
          break
        case 'contentBar2':
          this.$router.push({ name: 'contentBar2', params: { id: '2' } })
          break
        case 'contentBar3':
          this.$router.push({ name: 'contentBar3', params: { id: '3' } })
      }
    }
  }
}
</script>


<style>

.main-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.right {
  height: calc(100vh - 100px);
  width: 400px;
  background-color: darkgray;
  float: right;
}
.contentBar {
  height: calc(100vh - 80px);
  width: calc(100vw - 400px);
  background-color: white;
}
.header {
  height: 80px;
  width: 100vw;
  background-color: blue;
}
</style>