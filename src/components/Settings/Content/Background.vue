<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text">
      {{ setting.label }}
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <p class="">
        {{ setting.description }}
      </p>
      <v-sheet class="d-flex align-center justify-space-around"> <v-color-picker class="ma-2" hide-inputs v-model="color"></v-color-picker> </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-btn tile color="success" :disabled="setting.value === color" width="150">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="setting.value === color" @click="color = setting.value">REVERT </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingBackground',
    props: {
      setting: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      color: null,
    }),
    mounted() {
      this.color = this.setting.value
    },
  }
</script>

<style lang="scss" scoped></style>
