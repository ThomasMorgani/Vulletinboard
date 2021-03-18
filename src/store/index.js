import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appLoading: true,
    board: {},
    header: {},
    items: [],
    snackbar: {
      options: {
        app: true,
        centered: true,
        outlined: true,
        text: true,
        timeout: 2500,
        top: true,
      },
      color: '',
      message: '',
      value: false,
    },
    theme: {},
    user: {
      roles: ['admin', 'content', 'user'],
    },
    ticker: {},
  },
  getters: {
    isAdmin(state) {
      return state?.user?.roles?.indexOf('admin') > -1
    },
    isAuth(state) {
      return state?.user?.roles?.indexOf('user') > -1
    },
  },
  actions: {
    async apiGet({ commit, state }, endpoint) {
      let response = {}
      try {
        response = await axios.get(`${process.env.VUE_APP_API_URL}${endpoint}`)
      } catch (err) {
        response = err.response
        console.log(err)
      }
      if (response?.status === 401) {
        if (router?.currentRoute?.name !== 'Login') router.push({ name: 'Login', params: response })
      }
      return response.data
    },
    async apiPost({ commit, state }, { endpoint, postData }) {
      let response = {}
      try {
        response = await axios.post(`${process.env.VUE_APP_API_URL}${endpoint}`, postData)
      } catch (err) {
        response = err.response
      }
      if (response?.status === 401) {
        if (router?.currentRoute?.name !== 'Login') router.push({ name: 'Login', params: response })
      }
      return response.data
    },

    async init({ commit, dispatch, state }, $vuetify) {
      const data = await dispatch('apiGet', '')
      commit('COMMIT_APPLOADING', false)
      const darkStored = localStorage.getItem('isDark')
      if (data?.theme) {
        if (darkStored === null) {
          localStorage.setItem('isDark', data.theme.isDark)
        } else {
          data.theme.isDark = darkStored === 'true'
        }
        dispatch('themeSet', { $vuetify, theme: data.theme })
      }
    },
    async initBulletinboard({ dispatch, commit }) {
      const endpoint = 'bulletinboard'
      const data = await dispatch('apiGet', endpoint)
      if (data && typeof data === 'object') {
        for (let item in data) {
          const mutation = `COMMIT_${item.toUpperCase()}`
          commit(mutation, data[item])
        }
      }
    },
    itemsSet({ commit }, items) {
      commit('COMMIT_ITEMS', items)
    },
    snackbar({ commit, state }, { color, message, value }) {
      // toggleSnackbar(color, message, value) {
      const sb = {
        ...state.snackbar,
        options: {
          ...state.snackbar.options,
          color,
        },
        message,
        value,
      }
      commit('COMMIT_SNACKBAR', sb)
    },
    themeSet({ commit }, { $vuetify, theme }) {
      commit('COMMIT_THEME', theme)
      $vuetify.theme.dark = theme.isDark
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
