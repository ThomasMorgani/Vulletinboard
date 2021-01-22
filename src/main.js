import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import axios from 'axios'
// import axiosConfig from './Configs/axiosConfig'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

import { apiSettings } from '../.env'
Vue.prototype.$api = apiSettings

Vue.use(VueAxios, axios)
new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
