<template>
  <div class="content-wrapper">
    <router-view />
  </div>
</template>

<script>
import eventBus from '@/helpers/event-bus'

export default {
  name: 'ContentWrapper',
  mounted() {
    eventBus.$on('goto', componentName => {
      switch(componentName) {
        case 'ContentBarAnime':
          if (this.$route.name !== 'anime') this.$router.push('/anime')
          break
        case 'ContentBarManga':
          if (this.$route.name !== 'manga') this.$router.push('/manga')
          break

        default:
          break
      }
    });
  },
  created() {
    if (this.$route.name !== 'anime') this.$router.push('/anime')
  }
}
</script>

<style scoped>
.content-wrapper {
  height: 90vh;
  width: 80vw;
}
</style>