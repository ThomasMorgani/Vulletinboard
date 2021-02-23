import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: {},
    header: {},
    items: [],
    snackbar: {},
    ticker: {},
  },
  getters: {},
  actions: {
    async apiGet({ commit, state }, endpoint) {
      const { data } = await axios.get(`${API_URL}${endpoint}`)
      return data
    },
    itemsSet({ commit }, items) {
      commit('COMMIT_ITEMS', items)
    },
    async initBulletinboard({ dispatch, commit }) {
      const endpoint = 'bulletinboard'
      const data = await dispatch('apiGet', endpoint)
      console.log(data)
      if (data) {
        for (let item in data) {
          const mutation = `COMMIT_${item.toUpperCase()}`
          commit(mutation, data[item])
        }
      }
    },
  },
  mutations: {
    COMMIT_BOARD(state, board) {
      state.board = { ...board }
    },
    COMMIT_HEADER(state, header) {
      state.header = { ...header }
    },
    COMMIT_ITEMS(state, items) {
      state.items = [...items]
    },
    COMMIT_SNACKBAR(state, snackbar) {
      state.snackbar = { ...snackbar }
    },
    COMMIT_TICKER(state, ticker) {
      state.ticker = { ...ticker }
    },
  },
})
