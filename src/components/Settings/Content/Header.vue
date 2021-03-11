<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text">
      Header
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ headerShow.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ headerShow.description }}</p>
          <v-switch color v-model="show" :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'" class="mt-0"> </v-switch>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="" :disabled="!show">
        <v-card-title class="text-h5 primary--text">
          {{ headerType.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ headerType.description }}</p>
          <v-select color v-model="type" :items="typeOptions" :messages="type === 'text' ? 'Solid color with text.' : 'Select an image to use as a banner.'"> </v-select>
          <v-sheet v-if="type === 'text'" height="500">
            <v-card flat width="100%" class="">
              <v-card-title class="text-h5 primary--text">
                {{ headerColor.label }}
              </v-card-title>
              <v-card-text class="d-flex flex-column align-start">
                <p>{{ headerColor.description }}</p>
                <v-color-picker class="ma-2" hide-inputs v-model="color"></v-color-picker>
              </v-card-text>
            </v-card>
            <v-card flat width="100%" class="">
              <v-card-title class="text-h5 primary--text">
                {{ headerContent.label }}
              </v-card-title>
              <v-card-text class="d-flex flex-column align-start">
                <p>{{ headerContent.description }}</p>
                <v-text-field color="primary" v-model="content"></v-text-field>
              </v-card-text>
            </v-card>
          </v-sheet>
          <v-sheet v-else height="500"></v-sheet>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn tile color="success" :disabled="actionDisabled" width="150">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="actionDisabled" @click="revertSettings">REVERT </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingHeader',
    props: {
      headerColor: {
        type: Object,
        required: true,
      },
      headerContent: {
        type: Object,
        required: true,
      },
      headerShow: {
        type: Object,
        required: true,
      },
      headerType: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      color: null,
      content: '',
      show: true,
      type: 'text',
      typeOptions: ['banner', 'text'],
    }),
    computed: {
      actionDisabled() {
        return !this.show
      },
    },
    methods: {
      revertSettings() {
        this.show = this.headerShow.value
        this.content = this.headerContent.value
        this.type = this.headerType.value
      },
      toggleHeader() {
        console.log('toggle header')
      },
    },
    mounted() {
      this.revertSettings()
    },
  }
</script>

<style lang="scss" scoped></style>
