<template>
  <div class="header">
    <el-button type="warning" round @click="goto('ContentBarAnime')">{{ $tc('header.textA') }}</el-button>
    <el-button type="warning" round @click="goto('ContentBarManga')">{{ $tc('header.textB') }}</el-button>
    <el-select
      v-model="currentLocale"
      class="lang"
      placeholder="Select"
      @change="changeLang"
      size="mini"
    >
      <el-option
        v-for="item in langList"
        :key="item.value"
        :disabled="item.disabled"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>


<script>

import eventBus from '@/helpers/event-bus'

export default {
  name: 'HeaderBar',
  data () {
    return {
      currentLocale: '',
      langList: [
        {
          value: 'ru',
          label: 'Ру',
        },
        {
          value: 'ua',
          label: 'Укр',
        },
        {
          value: 'en',
          label: 'En',
        },
      ],
    }
  },
  methods: {
    goto(val) {
      eventBus.$emit('goto', val)
    },
    changeLang(lang) {
      localStorage.setItem('lang', lang)
      this.$locale.change(lang)

      eventBus.$emit('changed-locale')
    },
  },
  created() {
    const lang = localStorage.getItem('lang')

    if (lang) {
      this.currentLocale = lang
    } else {
      this.currentLocale = 'en'
    }
  },
}

</script>


<style lang="scss">

.header{
  display: flex;
  align-items: center;
  .el-select {
    .el-input {
      .el-input__inner {
        width: 130px;
        height: 30px;
      }
    }
  }
  .el-button:first-of-type{
    margin-left: 5vw;
  }
  .el-button:last-of-type{
    margin-right: 72vw;
  }
}
</style>