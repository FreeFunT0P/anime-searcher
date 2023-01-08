<template>
<div class="rightBar">
  <div class="wrapper">
    <h3>{{ $tc('RightBar.FilterName1') }}</h3>
    <div class="slider1">
      <el-slider
        v-model="params.yearSliderValue"
        range
        show-stops
        :min="1907"
        :max="2022"
      />
    </div>
    <h3>{{ $tc('RightBar.FilterName2') }}</h3>
    <div class="slider2">
      <el-slider
        v-model="params.popularitySliderValue"
        range
        show-stops
        :min="1"
        :max="100"
        :format-tooltip="formatTooltip"
      />
    </div>
    <div>
      <h3>{{ $tc('RightBar.FilterName3') }}</h3>
      <el-select
        size="large"
        v-model="params.selectValueArr"
        multiple
        collapse-tags
        :placeholder="$tc('RightBar.Select')"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-button
        type="primary"
        class="search"
        @click="getTable()"
    >{{ $tc('RightBar.Search') }}</el-button>
  </div>
</div>
</template>

<script>

import {mapActions} from "vuex";
import eventBus from "@/helpers/event-bus";

export default {
  name: 'RightBar',
  data() {
    return {
      currentLocale: '',
      params: {
        yearSliderValue: [1907, 2022],
        popularitySliderValue: [1, 100],
        selectValueArr: [],
      },
      pagination: {
        currentPage: 1,
        perPage: 10,
      },
      options: [{
        value: 'comedy',
        label: this.$tc('RightBar.CategoryName1')
      }, {
        value: 'romance',
        label: this.$tc('RightBar.CategoryName2')
      }, {
        value: 'mecha',
        label: this.$tc('RightBar.CategoryName3')
      }, {
        value: 'drama',
        label: this.$tc('RightBar.CategoryName4')
      }, {
        value: 'adventure',
        label: this.$tc('RightBar.CategoryName5')
      }, {
        value: 'fantasy',
        label: this.$tc('RightBar.CategoryName6')
      }, {
        value: 'horror',
        label: this.$tc('RightBar.CategoryName7')
      }, {
        value: 'science-fiction',
        label: this.$tc('RightBar.CategoryName8')
      }, {
        value: 'steampunk',
        label: this.$tc('RightBar.CategoryName9')
      }, {
        value: 'harem',
        label: this.$tc('RightBar.CategoryName10')
      }, {
        value: 'kids',
        label: this.$tc('RightBar.CategoryName11')
      }],
    }
  },
  methods: {
    ...mapActions({
      setAnimeFilters: 'animeStore/setFilters',
      loadAnimeTableData: 'animeStore/loadTableData',
      setMangaFilters: 'mangaStore/setFilters',
      loadMangaTableData: 'mangaStore/loadTableData',
    }),
    formatTooltip(val) {
      return val + '%';
    },

    async getTable() {
      this.pagination.currentPage = 1
      if (this.$route.name === 'anime') {
        await this.setAnimeFilters({filterName: 'pagination', payload: this.pagination})
        await this.setAnimeFilters({filterName: 'params', payload: this.params})

        await this.loadAnimeTableData()
      }
      if (this.$route.name === 'manga') {
        await this.setMangaFilters({filterName: 'pagination', payload: this.pagination})
        await this.setMangaFilters({filterName: 'params', payload: this.params})

        await this.loadMangaTableData()
      }
    },
    catchTotal(e) {
      this.$notify.error({
        title: 'Error',
        message: e.message,
        duration: 5 * 1000,
        customClass: 'custom-notify',
      })
    },
  },
  watch: {
  },
  mounted() {
    eventBus.$on('changePerPage', perPage => {
      this.pagination.perPage = perPage
    })
  }
}
</script>

<style scoped>
.rightBar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.slider1 {
  width: 80%;
  height: 40px;
}
.slider2 {
  width: 80%;
  height: 40px;
}
h3{
  margin: 0 0 0 30px;
}
.wrapper {
  width: auto;
  height: auto;
  margin-left: 30px;
  margin-top: 30px;
}
.search {
  margin: 20px 0 0 60px;
}

</style>