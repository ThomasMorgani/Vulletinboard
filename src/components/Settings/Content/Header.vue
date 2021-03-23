<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text pb-2">
      Header
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ headerShow.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ headerShow.description }}</p>
          <v-switch v-model="show" color hide-details :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'" class="mt-0"> </v-switch>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ headerColor.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ headerColor.description }}</p>
          <Colorpicker @input="color = $event.hexa" :btnProps="{ color: color, label: '     ', value: color }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="" :disabled="!show">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ headerType.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ headerType.description }}</p>
          <v-select color v-model="type" :items="typeOptions" :messages="type === 'text' ? 'Solid color with text.' : 'Select an image to use as a banner.'"> </v-select>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ headerContent.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ headerContent.description }}</p>
          <v-text-field
            v-model="content"
            color="primary"
            :messages="type === 'text' ? 'Enter display text' : 'Enter image url'"
            :prepend-inner-icon="type === 'text' ? 'mdi-format-text' : 'mdi-link-variant'"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ headerContentAlign.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ headerContentAlign.description }}</p>
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
    props: {
      headerColor: {
        type: Object,
        required: true,
      },
      headerContent: {
        type: Object,
        required: true,
      },
      headerContentAlign: {
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
      align: 'start',
      alignOptions: ['start', 'center', 'end'],
      color: null,
      content: '',
      currentSettings: {
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
        return false
        // return JSON.stringify(this?.currentTheme?.[mode]) === JSON.stringify(this?.$vuetify?.theme?.themes?.[mode]) || this.loadingSave
      },
    },
    methods: {
      revertSettings() {
        this.color = this.headerColor.value
        this.show = this.headerShow.value
        this.content = this.headerContent.value
        this.type = this.headerType.value
      },
      async saveHeader() {
        const resp = await this.$store.dispatch('apiPost', { endpoint: 'manage/settings/header', postData: theme })
        if (resp.status === 'success') {
        }
        //dispatch sb
        this.loadingSave = false
        this.$store.dispatch('snackbar', {})
        console.log(resp)
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
