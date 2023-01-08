<template>
  <div class="contentBar">
    <div class="tableWrapper">
      <el-table
          :data="tableData"
          v-loading="loading"
          :default-sort = "{prop: 'mangaName', order: 'descending'}"
          @sort-change="setSort"
          style="width: 100%"
      >
        <el-table-column type="expand" v-slot="props">
          <div class="slot">
            <img :src="props.row.poster" alt="">
            <p>{{ props.row.synopsis }}</p>

            <el-button type="text" @click="openManga(props.row.id)">{{$tc('ContentBarManga.GoTo')}}</el-button>
          </div>
        </el-table-column>
        <el-table-column
            prop="mangaName"
            :label="$tc('ContentBarManga.ColumnName1')"
            width="180">
        </el-table-column>
        <el-table-column
            prop="popularityRank"
            :label="$tc('ContentBarManga.ColumnName2')"
            sortable="true"
            :sort-orders="['ascending', 'descending']"
            width="180">
        </el-table-column>
        <el-table-column
            prop="startDate"
            :label="$tc('ContentBarManga.ColumnName3')"
            sortable="true"
            :sort-orders="['ascending', 'descending']"
            width="180">
        </el-table-column>
        <el-table-column
            prop="endDate"
            :label="$tc('ContentBarManga.ColumnName4')"
            sortable="true"
            :sort-orders="['ascending', 'descending']"
            width="180"
        />
        <el-table-column
            prop="chapterCount"
            :label="$tc('ContentBarManga.ColumnName5')"
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
  </div>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import eventBus from "@/helpers/event-bus";

export default {
name: 'ContentBarManga',
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
    }
  },
  methods: {
    ...mapActions({
      setFilters: 'mangaStore/setFilters',
      loadTableData: 'mangaStore/loadTableData',
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

    openManga(id) {
      open('https://kitsu.io/manga/' + id)
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
        'mangaStore',
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
</style>