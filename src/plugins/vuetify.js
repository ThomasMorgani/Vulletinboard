import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        background: '#a1b2cc',
        primary: '#2c4776',
        secondary: '#FFFFFF',
        accent: '#a1b2cc',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        background: '#a1b2cc',
        primary: '#2c4776',
        secondary: '#FFFFFF',
        accent: '#a1b2cc',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
})
