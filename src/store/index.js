import Vue from 'vue'
import Vuex from 'vuex'
import mangaStore from '@/store/routsStore/mangaStore'
import animeStore from "@/store/routsStore/animeStore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    animeStore,
    mangaStore,
  },
})