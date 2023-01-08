import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '@/conf/apiConfig'
import { formatDateDayOnly } from '@/modules/helpers/time_formatter'

Vue.use(Vuex)

const state = {
  forShow: {
    tableData: [],
    error: null,
    loading: false,

    pagination: {
      totalEntries: 0,
      pagesSizes: [5, 10, 15, 20],
    },
  },

  forSearch: {
    params: {
      categoryArr: [],
      yearArr: [],
      ratingArr: []
    },
    sort: {
      column: '',
      direction: '',
    },
    pagination: {
      currentPage: 1,
      perPage: 10,
    },
    typeOfSearch: '/anime',
  },
}

const getters = {
  tableData: state => state.forShow.tableData,
  error: state => state.forShow.error,
  loading: state => state.forShow.loading,

  currentPage: state => state.forSearch.pagination.currentPage,
  perPage: state => state.forSearch.pagination.perPage,
  totalEntries: state => state.forShow.pagination.totalEntries,
  pagesSizes: state => state.forShow.pagination.pagesSizes,
}

const mutations = {
  SET_PARAMS(state, { selectValueArr, yearSliderValue, popularitySliderValue }) {
    state.forSearch.params.categoryArr = selectValueArr
    state.forSearch.params.yearArr = yearSliderValue
    state.forSearch.params.ratingArr = popularitySliderValue
  },
  SET_SORT(state, { column, direction }) {
    state.forSearch.sort.column = column
    state.forSearch.sort.direction = direction
  },
  SET_PAGINATION(state, { currentPage, perPage }) {
    state.forSearch.pagination.currentPage = currentPage
    state.forSearch.pagination.perPage = perPage
  },
  RESET_DATA_BEFORE_SEND_REQUEST(state) {
    state.forShow.loading = true
    state.forShow.tableData = []
    state.forShow.error = null
  },
  UPDATE_AFTER_REQUEST(state, { tableData, totalEntries }) {
    state.forShow.loading = false
    state.forShow.tableData = tableData
    state.forShow.pagination.totalEntries = totalEntries
  },
  SET_ERROR(state, error) {
    state.forShow.error = error
  },
}

const actions = {
  setFilters({ commit }, { filterName, payload }) {
    switch (filterName) {
      case 'params':
        commit('SET_PARAMS', payload)
        break
      case 'sort':
        commit('SET_SORT', payload)
        break
      case 'pagination':
        commit('SET_PAGINATION', payload)
        console.log(payload)
        break
      default:
        break
    }
  },
  async loadTableData({commit, state}) {
    await getTableData(commit, state)
  }
}

function getCategoryString(arr) {
  let string = ''
  for (let item in arr) {
    string += arr[item]
    if (+item !== (arr.length-1)) {string += ','}
  }
  return string
}

function getYearOrRatingString(arr) {
  return arr[0] + '..' + arr[1]
}

function mapAllParamsBeforeGetTable(state) {
  const params = {
    'filter[year]': getYearOrRatingString(state.forSearch.params.yearArr),
    'filter[averageRating]': getYearOrRatingString(state.forSearch.params.ratingArr),

    'page[limit]': state.forSearch.pagination.perPage,
    'page[offset]': state.forSearch.pagination.perPage * (state.forSearch.pagination.currentPage - 1),
  }

  if (getCategoryString(state.forSearch.params.categoryArr).length) {
    params['filter[categories]'] = getCategoryString(state.forSearch.params.categoryArr)
  }

  if (state.forSearch.sort.column) {
    params.sort = state.forSearch.sort.direction + state.forSearch.sort.column
  }

  return params
}

async function getTableData(commit, state) {
  commit('RESET_DATA_BEFORE_SEND_REQUEST')

  const params = mapAllParamsBeforeGetTable(state)

  await axios
    .get(api.getAnime(state.forSearch.typeOfSearch), { params })
    .then(({ data }) => {
      const payload = mapTableDataAfterRequest(data)
      commit('UPDATE_AFTER_REQUEST', payload)
    })
    .catch(e => {
      commit('SET_ERROR', e)
    })
}

function mapTableDataAfterRequest(data) {
  console.log(data)
  return {
    tableData: mapTable(data.data),
    totalEntries: data.meta.count,
  }
}

function mapTable(table) {
  const getYoutubeId = youtubeId => {
    if (!youtubeId) {
      return youtubeId
    }

    if (youtubeId.startsWith('https://youtu.be/')) {
      const arr = youtubeId.split('/')
      return arr[arr.length - 1]
    }

    return youtubeId
  }

  return table.map(row => ({
    id: row.id,
    animeName: row.attributes.canonicalTitle ? row.attributes.canonicalTitle : '-',
    popularityRank: row.attributes.popularityRank ? row.attributes.popularityRank : '-',
    endDate: row.attributes.endDate ? formatDateDayOnly(+new Date(row.attributes.endDate)) : '-',
    poster: row.attributes.posterImage.tiny,
    synopsis: row.attributes.synopsis,
    startDate: row.attributes.startDate ? formatDateDayOnly(+new Date(row.attributes.startDate)) : '-',
    episodeLength: row.attributes.episodeLength ? row.attributes.episodeLength : '-',
    youtubeVideoId: getYoutubeId(row.attributes.youtubeVideoId),
  }))
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}