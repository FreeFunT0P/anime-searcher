<template>
  <div class="contentBar">
    <div class="tableWrapper">
      <el-table
        :data="tableData"
        v-loading="loading"
        :default-sort = "{prop: 'animeName', order: 'descending'}"
        @sort-change="setSort"
        style="width: 100%"
      >
        <el-table-column type="expand" v-slot="props">
          <div class="slot">
            <img :src="props.row.poster" alt="">
            <p>{{ props.row.synopsis }}</p>

            <el-button v-if="props.row.youtubeVideoId" type="text" @click="openYoutubeDialog(props.row.youtubeVideoId)">{{$tc('ContentBarAnime.YoutubeVideo')}}</el-button>
          </div>
        </el-table-column>
        <el-table-column
            prop="animeName"
            :label="$tc('ContentBarAnime.ColumnName1')"
            width="180">
        </el-table-column>
        <el-table-column
            prop="popularityRank"
            :label="$tc('ContentBarAnime.ColumnName2')"
            sortable="true"
            :sort-orders="['ascending', 'descending']"
            width="180">
        </el-table-column>
        <el-table-column
            prop="startDate"
            :label="$tc('ContentBarAnime.ColumnName3')"
            sortable="true"
            :sort-orders="['ascending', 'descending']"
            width="180">
        </el-table-column>
        <el-table-column
          prop="endDate"
          :label="$tc('ContentBarAnime.ColumnName4')"
          sortable="true"
          :sort-orders="['ascending', 'descending']"
          width="180"
        />
        <el-table-column
            prop="episodeLength"
            :label="$tc('ContentBarAnime.ColumnName5')"
            width="180">
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationWrapper">
      <el-pagination
        ref="pagination"

        :current-page="currentPage"
        :page-size="perPage"
        :page-sizes="pagesSizes"
        :total="totalEntries"

        layout="total, sizes, prev, pager, next, jumper"
        @current-change="setCurrentPage"
        @size-change="setPerPage"
      />
    </div>
    <div v-for="item of tableData" v-bind:key="item.id" class="crutch">
      <img :src="item.poster" alt="">
    </div>

    <!-- eslint-disable -->
    <el-dialog
      :visible.sync="dialogs.visible.youtubeDialog"
      align-center="true"
      custom-class="dialog-youtube"
      style="text-align: left"
      @closed="clearYoutubeDialogModel"
    >
      <youtube
        v-if="dialogs.model.youtubeDialog.link"
        :video-id="dialogs.model.youtubeDialog.link"
        class="video"
      />
    </el-dialog>
    <!-- eslint-enable -->
  </div>
</template>


<script>

import {mapGetters,mapActions} from 'vuex'
import eventBus from '@/helpers/event-bus'

export default {
  name: 'ContentBarAnime',
  components: {
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 10,
      },
      sort: {
        column: '',
        direction: '',
      },
      dialogs: {
        visible: {
          youtubeDialog: false,
        },
        model: {
          youtubeDialog: {
            link: '',
          },
        },
      },

      dialogVisible: false,
    }
  },
  methods: {
    ...mapActions({
      setFilters: 'animeStore/setFilters',
      loadTableData: 'animeStore/loadTableData',
    }),

    async setSort({prop, order}) {
      this.sort.column = prop
      this.sort.direction = order === 'ascending' ? '' : '-'
      this.pagination.currentPage = 1

      await this.setFilters({ filterName: 'sort', payload: this.sort })

      await this.loadTableData()
    },

    async setCurrentPage(currentPage) {
      this.pagination.currentPage = currentPage

      await this.setFilters({ filterName: 'pagination', payload: this.pagination })

      await this.loadTableData()
    },
    async setPerPage(perPage) {
      this.pagination.perPage = perPage
      this.pagination.currentPage = 1
      eventBus.$emit('changePerPage', perPage)

      await this.setFilters({ filterName: 'pagination', payload: this.pagination })
      await this.loadTableData()
    },

    openYoutubeDialog(link) {
      this.dialogs.model.youtubeDialog.link = link
      this.dialogs.visible.youtubeDialog = true
    },
    clearYoutubeDialogModel() {
      this.dialogs.model.youtubeDialog.link = ''
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
  computed: {
    ...mapGetters(
        'animeStore',
        [
          'tableData',
          'error',
          'loading',

          'currentPage',
          'perPage',
          'totalEntries',
          'pagesSizes',
        ]
    ),

  },
  watch: {
  }
}
</script>


<style lang="scss">

.tableWrapper{
  width: 100%;
  height: 95%;
  background-color: white;
  overflow-y: scroll;
}
.paginationWrapper{
  width: 100%;
  height: 5%;
  background-color: white;

  .el-pagination {
    .el-pagination__sizes {
      .el-select {
        .el-input {
          width: 130px;
        }
      }
    }
  }
}
.slot{
  display: flex;
  flex-direction: row;
  padding-left: 10px;
}
image{
  width: 10%;
}
.slot > p{
  width: 90%;
  height: 100%;
  margin: 10px;
}
.crutch{
  position: absolute;
  right: 1000000px;
  bottom: 1000000px;
  margin: 0;
  padding: 0;
}

.el-dialog__wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dialog {
  margin: 0 !important;

  &.dialog-youtube {
    height: 450px;
    width: 703px;
    padding: 32px;
    font-family: Roboto, serif;
    display: flex;
    flex-direction: column;

    .el-dialog__header {
      padding: 20px 0 0 0;
    }

    .el-dialog__body {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .el-dialog__footer {
    }
  }
}
</style>