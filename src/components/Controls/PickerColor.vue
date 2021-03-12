<template>
  <v-menu v-model="modal" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="{ ...attrs, ...customProps }" v-on="on">{{ customProps.label }}</v-btn>
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
          const themes = this.$vuetify.theme.themes
          const colorsDark = { ...themes.dark }
          const colorsLight = { ...themes.light }
          this.picker = v
          if ([...Object.values(colorsDark), ...Object.values(colorsLight)].indexOf(v) < 0) {
            this.select = 'custom'
            this.$emit('input', v)
          } else {
            this.$emit('input', this.select)
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
          width: 200,
        }
        return { ...defaults, ...this.btnProps }
      },
      theme() {
        return this.$vuetify.theme.themes
      },
    },
    mounted() {
      console.log('created')
      console.log(this.btnProps.color)
      if (this.predefined.indexOf(this.btnProps.color) > -1) {
        this.selection = this.btnProps.color
        this.picker = this.$vuetify.theme.themes.light[this.btnProps.color]
      } else {
        this.picker = this.btnProps.color
        this.select = 'custom'
      }
    },
  }
</script>

<style lang="scss" scoped></style>
