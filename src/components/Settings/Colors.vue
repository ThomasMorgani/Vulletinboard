<template>
  <v-card tile width="100%">
    <v-card-title class=" text-h4 primary--text">
      Base Colors
    </v-card-title>
    <v-card-text>
      <v-card outlined class="">
        <v-card-text class="d-flex flex-column align-start">
          <v-card tile flat>
            <v-card-title class="text-h5 primary--text pl-0">
              Mode
            </v-card-title>
            <v-card-text class="px-0">
              <ThemeToggle prepend="mdi-theme-light-dark"></ThemeToggle>
            </v-card-text>
          </v-card>
          <v-card tile flat>
            <v-card-title class="text-h5 primary--text pl-0">
              Primary
            </v-card-title>
            <v-card-text class="px-0">
              <Colorpicker @input="setColor($event, 'primary')" :btnProps="{ color: 'primary', label: '     ', value: theme.primary, width: 200 }"></Colorpicker>
            </v-card-text>
          </v-card>
          <v-card tile flat>
            <v-card-title class="text-h5 primary--text pl-0">
              Secondary
            </v-card-title>
            <v-card-text class="px-0">
              <Colorpicker @input="setColor($event, 'secondary')" :btnProps="{ color: 'secondary', label: '     ', value: theme.secondary, width: 200 }"></Colorpicker>
            </v-card-text>
          </v-card>
          <v-card tile flat>
            <v-card-title class="text-h5 primary--text pl-0">
              Accent
            </v-card-title>
            <v-card-text class="px-0">
              <Colorpicker @input="setColor($event, 'accent')" :btnProps="{ color: 'accent', label: '     ', value: theme.accent, width: 200 }"></Colorpicker>
            </v-card-text>
          </v-card>
          <v-card tile flat>
            <v-card-title class="text-h5 primary--text pl-0">
              Background
            </v-card-title>
            <v-card-text class="px-0">
              <Colorpicker @input="setColor($event, 'background')" :btnProps="{ color: 'background', label: '     ', value: theme.background, width: 200 }"></Colorpicker>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-btn color="success" :disabled="actionsDisabled" :loading="loadingSave" tile width="150" @click="saveColors">SAVE {{ isDark ? ' DARK' : ' LIGHT' }}</v-btn>
          <v-btn color="warning" :disabled="actionsDisabled" tile @click="resetColors">REVERT {{ isDark ? ' DARK' : ' LIGHT' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
  import Colorpicker from '@/components/Controls/PickerColor'
  import ThemeToggle from '@/components/Controls/SwitchTheme'

  export default {
    name: 'SettingColors',
    components: { Colorpicker, ThemeToggle },
    data: () => ({
      currentTheme: null,
      loadingSave: false,
    }),
    computed: {
      isDark() {
        return this.$vuetify.theme.isDark
      },
      actionsDisabled() {
        const mode = this.isDark ? 'dark' : 'light'
        return JSON.stringify(this?.currentTheme?.[mode]) === JSON.stringify(this?.$vuetify?.theme?.themes?.[mode]) || this.loadingSave
      },
      theme() {
        const { dark, light } = this.$vuetify.theme.themes
        return this.isDark ? dark : light
      },
      vtfy() {
        return this.$vuetify.theme
      },
    },
    methods: {
      resetColors() {
        this.isDark ? (this.$vuetify.theme.themes.dark = { ...this.currentTheme.dark }) : (this.$vuetify.theme.themes.light = { ...this.currentTheme.light })
      },
      async saveColors() {
        this.loadingSave = true
        const theme = {
          isDark: this.isDark,
          theme: this.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light,
        }
        const resp = await this.$store.dispatch('apiPost', { endpoint: 'manage/settings/theme', postData: theme })
        if (resp.status === 'success') {
          const mode = this.isDark ? 'dark' : 'light'
          this.currentTheme = { ...this.currentTheme, [mode]: { ...theme.theme } }
          this.$store.dispatch('themeSet', { $vuetify: this.$vuetify, theme })
        }
        //dispatch sb
        this.loadingSave = false
        this.$store.dispatch('snackbar', {})
        console.log(resp)
      },
      setColor(data = '', color) {
        const { dark, light } = this.$vuetify.theme.themes
        const isDark = this.$vuetify.theme.isDark
        const val = data.substr(0, 1) === '#' ? data : light[data] || ''
        isDark ? (dark[color] = val) : (light[color] = val)
      },
    },
    mounted() {
      const { light, dark } = this.$vuetify.theme.themes
      this.currentTheme = { light: { ...light }, dark: { ...dark } }
    },
  }
</script>

<style lang="scss" scoped>
  .test {
    position: sticky;
    top: 80px;
  }
</style>
