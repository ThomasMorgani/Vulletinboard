<template>
  <v-card tile width="100%">
    <v-card-title class="text-h4 primary--text">
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
          <v-btn color="success" :disabled="actionsDisabled" tile width="150">SAVE {{ isDark ? ' DARK' : ' LIGHT' }}</v-btn>
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
    }),
    computed: {
      isDark() {
        return this.$vuetify.theme.isDark
      },
      actionsDisabled() {
        const mode = this.isDark ? 'dark' : 'light'
        // console.log(JSON.stringify(this.currentTheme[mode]))
        // console.log(JSON.stringify(this.$vuetify.theme.themes[mode]))
        return JSON.stringify(this?.currentTheme?.[mode]) === JSON.stringify(this?.$vuetify?.theme?.themes?.[mode])
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
        const currentTheme = JSON.parse(this.currentTheme)
        this.isDark ? (this.$vuetify.theme.themes.dark = { ...currentTheme.dark }) : (this.$vuetify.theme.themes.light = { ...currentTheme.light })
      },
      setColor(data, color) {
        console.log(data, color)
        const { dark, light } = this.$vuetify.theme.themes
        const isDark = this.$vuetify.theme.isDark
        const val = data || ''
        isDark ? (dark[color] = val) : (light[color] = val)
      },
    },
    mounted() {
      const { light, dark } = this.$vuetify.theme.themes
      this.currentTheme = { light: { ...light }, dark: { ...dark } }
      console.log(this.currentTheme)
    },
  }
</script>

<style lang="scss" scoped></style>
