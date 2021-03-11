<template>
  <v-menu v-model="modal" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="{ ...attrs, ...customProps }" v-on="on">{{ customProps.label }}</v-btn>
    </template>

    <v-card
      ><v-card-text>
        <v-color-picker :key="btnProps.color" mode="hexa" show-swatches @input="$emit('input', $event)" :value="btnProps.value" class="ma-2"></v-color-picker>
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
    }),
    computed: {
      customProps() {
        const defaults = {
          color: 'primary',
          label: '',
          width: 40,
        }
        return { ...defaults, ...this.btnProps }
      },
      theme() {
        return this.$vuetify.theme.themes
      },
    },
  }
</script>

<style lang="scss" scoped></style>
