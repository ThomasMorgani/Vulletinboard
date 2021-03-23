<template>
  <v-menu v-model="modal" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{ on, attrs }">
      <!-- <v-btn v-bind="{ ...attrs, ...customProps }" v-on="on">{{ customProps.label }}</v-btn> -->
      <v-btn v-bind="{ ...attrs, ...customProps }" v-on="on" :class="`${textColor}--text`">{{ btnProps.label }}</v-btn>
    </template>

    <v-card
      ><v-card-text>
        <v-select v-model="selection" color="primary" :items="predefined" label="Predefined colors">
          <template #selection="{item}">
            <span class="text-capitalize">
              {{ item }}
            </span>
          </template>
          <template #item="{item, attrs, on}">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-avatar>
                <v-avatar :color="theme.light[item]"> </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content class="text-h6 text-capitalize">{{ item }}</v-list-item-content>
            </v-list-item>
          </template>
        </v-select>
        <v-color-picker v-model="pickerColor" mode="hexa" show-swatches class="ma-2"></v-color-picker>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: 'ColorPickerBtn',
    props: {
      btnProps: {
        type: Object,
        required: false,
      },
    },
    data: () => ({
      modal: false,
      picker: '',
      predefined: ['primary', 'secondary', 'accent', 'background', 'custom'],
      select: null,
    }),
    computed: {
      pickerColor: {
        get() {
          return this.picker
        },
        set(v) {
          this.picker = v
          const themeColor = this.findThemeColor(v)
          if (themeColor) {
            this.select = themeColor
            this.$emit('input', this.select)
          } else {
            this.select = 'custom'
            this.$emit('input', v)
          }
        },
      },
      selection: {
        get() {
          return this.select
        },
        set(v) {
          this.select = v
          if (this.select !== 'custom') {
            const themes = this.$vuetify.theme.themes
            this.picker = this.$vuetify.theme.isDark ? themes.dark[v] : themes.light[v]
            this.$emit('input', v)
          }
        },
      },
      customProps() {
        const defaults = {
          color: 'primary',
          label: this.btnProps.value || '',
          ripple: false,
          width: 200,
        }
        return { ...defaults, ...this.btnProps }
      },
      textColor() {
        // attribution
        // https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html
        const color = this.picker
        if (color?.substr(0, 1) !== '#') {
          return 'black'
        }
        const R = parseInt(color.substr(1, 2), 16)
        const G = parseInt(color.substr(3, 2), 16)
        const B = parseInt(color.substr(5, 2), 16)
        const hsp = Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068)
        return hsp > 127.5 ? 'black' : 'white'
      },
      theme() {
        return this.$vuetify.theme.themes
      },
    },
    methods: {
      findThemeColor(val) {
        //for now only showing light theme colors in predefined list
        for (let color in this.theme.light) {
          if (this.theme.light[color] == val) {
            return color
          }
        }
        return false
      },
    },
    created() {
      if (this.predefined.indexOf(this.btnProps.color) > -1) {
        this.select = this.btnProps.color
        this.picker = this.$vuetify.theme.themes.light[this.btnProps.color]
      } else {
        this.picker = this.btnProps.color
        this.select = 'custom'
      }
    },
  }
</script>

<style lang="scss" scoped>
  .v-btn::before {
    background-color: transparent;
  }
</style>
