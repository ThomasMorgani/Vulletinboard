<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text pb-2">
      Header
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ boardSettings.boardHeaderShow.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ boardSettings.boardHeaderShow.description }}</p>
          <v-switch v-model="show" color hide-details :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'" class="mt-0"> </v-switch>
        </v-card-text>
      </v-card>
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ boardSettings.boardHeaderColor.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ boardSettings.boardHeaderColor.description }}</p>
          <Colorpicker @input="setColor" :btnProps="{ color: color, label: '     ', value: color }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ boardSettings.boardHeaderType.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ boardSettings.boardHeaderType.description }}</p>
          <v-select color v-model="type" :items="typeOptions" :messages="type === 'text' ? 'Solid color with text.' : 'Select an image to use as a banner.'"> </v-select>
        </v-card-text>
      </v-card>
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ boardSettings.boardHeaderContent.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ boardSettings.boardHeaderContent.description }}</p>
          <v-text-field
            v-model="content"
            color="primary"
            :messages="type === 'text' ? 'Enter display text' : 'Enter image url'"
            :prepend-inner-icon="type === 'text' ? 'mdi-format-text' : 'mdi-link-variant'"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ boardSettings.boardHeaderContentAlign.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ boardSettings.boardHeaderContentAlign.description }}</p>
          <v-select v-model="align" color="primary" :items="alignOptions"></v-select>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn tile color="success" :disabled="actionDisabled" :loading="loadingSave" width="150" @click="saveHeader">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="actionDisabled" @click="revertSettings">REVERT </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import Colorpicker from '@/components/Controls/PickerColor'

  export default {
    name: 'SettingHeader',
    components: { Colorpicker },
    data: () => ({
      align: 'start',
      alignOptions: ['start', 'center', 'end'],
      color: null,
      content: '',
      currentSettings: {
        align: null,
        color: null,
        content: null,
        show: null,
        type: null,
      },
      loadingSave: false,
      show: true,
      type: 'text',
      typeOptions: ['banner', 'text'],
    }),
    computed: {
      actionDisabled() {
        const settings = {
          align: this.align,
          color: this.color,
          content: this.content,
          show: this.show,
          type: this.type,
        }
        const isChanged = JSON.stringify(settings) === JSON.stringify(this.currentSettings)
        return isChanged || this.loadingSave
      },
      boardSettings() {
        return this?.$store?.getters?.settingsByCat?.board || {}
      },
    },
    methods: {
      revertSettings() {
        const currentSettings = {
          align: this.boardSettings.boardHeaderContentAlign.value,
          color: this.boardSettings.boardHeaderColor.value,
          content: this.boardSettings.boardHeaderContent.value,
          show: this.boardSettings.boardHeaderShow.value,
          type: this.boardSettings.boardHeaderType.value,
        }
        for (let setting in currentSettings) {
          this[setting] = currentSettings[setting]
        }
        this.currentSettings = { ...currentSettings }
      },
      async saveHeader() {
        console.log('saveHeader')
        const postData = {
          boardHeaderColor: this.color,
          boardHeaderContent: this.content,
          boardHeaderContentAlign: this.align,
          boardHeaderShow: this.show,
          boardHeaderType: this.type,
        }
        this.loadingSave = true
        const resp = await this.$store.dispatch('apiPost', { endpoint: 'manage/settings/header', postData })
        if (resp.status === 'success') {
          this.$store.dispatch('settingsSet', postData)
          this.revertSettings()
        }
        this.loadingSave = false
        const { status: color, message } = resp
        this.$store.dispatch('snackbar', { color, message, value: true })
      },
      setColor(e) {
        this.color = e
      },
    },
    created() {
      this.revertSettings()
    },
  }
</script>

<style lang="scss" scoped></style>
