<template>
  <v-card flat>
    <v-card-title class="text-h4 primary--text">
      {{ setting.name }}
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <p>{{ setting.description }}</p>
      <v-text-field color="primary" :value="setting.value" @input="onInput"></v-text-field>
      <!-- text -->
      <!-- boolean -->
      <!-- number -->
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingCard',
    props: {
      setting: {
        type: Object,
        required: true,
      },
    },
    methods: {
      onInput(e) {
        this.$emit('input', e)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
