import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Vuetify from '../plugins/vuetify'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appLoading: true,
    board: {},
    header: {},
    items: [],
    snackbar: {},
    theme: {},
    ticker: {},
  },
  getters: {
    isAdmin() {
      //placeholder for when auth is implemented
      return true
    },
    isAuth() {
      //placeholder for when auth is implemented
      return true
    },
  },
  actions: {
    async apiGet({ commit, state }, endpoint) {
      let response = {}
      try {
        response = await axios.get(`${API_URL}${endpoint}`)
      } catch (err) {
        response = err.response
      }
      if (response?.status === 401) {
        if (router?.currentRoute?.name !== 'Login') router.push({ name: 'Login', params: response })
      }
      return response.data
    },

    async init({ commit, dispatch, state }, $vuetify) {
      console.log($vuetify)
      const data = await dispatch('apiGet', '')
      commit('COMMIT_APPLOADING', false)
      if (data) {
        if (data.theme) {
          dispatch('themeSet', { $vuetify, theme: data.theme })
        }
      }
    },
    async initBulletinboard({ dispatch, commit }) {
      const endpoint = 'bulletinboard'
      const data = await dispatch('apiGet', endpoint)
      if (data) {
        for (let item in data) {
          const mutation = `COMMIT_${item.toUpperCase()}`
          commit(mutation, data[item])
        }
      }
    },
    itemsSet({ commit }, items) {
      commit('COMMIT_ITEMS', items)
    },
    themeSet({ commit }, { $vuetify, theme }) {
      commit('COMMIT_THEME', theme)
      $vuetify.theme.isDark = theme.isDark
      $vuetify.theme.themes.dark = { ...$vuetify.theme.themes.dark, ...theme.dark }
      $vuetify.theme.themes.light = { ...$vuetify.theme.themes.light, ...theme.light }
    },
  },
  mutations: {
    COMMIT_APPLOADING(state, isLoading) {
      state.appLoading = isLoading
    },
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
    COMMIT_THEME(state, theme) {
      state.theme = { ...theme }
    },
  },
})
