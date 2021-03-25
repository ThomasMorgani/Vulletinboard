<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text">
      Item
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemSettings.itemColor.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemSettings.itemColor.description }}</p>
          <Colorpicker @input="setItem('color', $event)" :btnProps="{ color: color }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemSettings.itemTextTitle.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemSettings.itemTextTitle.description }}</p>
          <Colorpicker @input="setItem('title', $event)" :btnProps="{ color: title }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemSettings.itemTextSubtitle.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemSettings.itemTextSubtitle.description }}</p>
          <Colorpicker @input="setItem('subtitle', $event)" :btnProps="{ color: subtitle }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemSettings.itemTextDescription.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemSettings.itemTextDescription.description }}</p>
          <Colorpicker @input="setItem('description', $event)" :btnProps="{ color: description }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemSettings.itemTextFooter.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemSettings.itemTextFooter.description }}</p>
          <Colorpicker @input="setItem('footer', $event)" :btnProps="{ color: footer }"></Colorpicker>
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
  import Colorpicker from '@/components/Controls/PickerColor'
  export default {
    name: 'SettingsItem',
    components: { Colorpicker },
    data: () => ({
      currentSettings: {},
      color: null,
      title: null,
      subtitle: null,
      description: null,
      footer: null,
      metric: 'seconds',
      metricOptions: ['seconds', 'minutes', 'hours'],
      timout: null,
    }),
    computed: {
      actionDisabled() {
        return false
      },
      itemSettings() {
        return this?.$store?.getters?.settingsByCat?.item || {}
      },
      // timeout: {
      //   get() {
      //     return this.fromMilliseconds(this.itemTimeout.value)
      //   },
      //   set(e) {
      //     this.$emit('input', { setting: 'itemTimeout', value: this.toMilliseconds(e.target.value) })
      //   },
      // },
    },
    methods: {
      fromMilliseconds(val) {
        switch (this.metric) {
          case 'seconds':
            return val / 1000
            break
          case 'minutes':
            return val < 60000 ? 0 : val / 60 / 1000
            break
          case 'hours':
            return val < 3600000 ? 0 : val / 60 / 60 / 1000
            break
        }
      },
      revertSettings() {
        const currentSettings = {
          background: this.itemSettings.itemColor.value,
          description: this.itemSettings.itemTextDescription.value,
          footer: this.itemSettings.itemTextFooter.value,
          subtitle: this.itemSettings.itemTextSubtitle.value,
          timeout: this.itemSettings.itemTimeout.value,
          title: this.itemSettings.itemTextTitle.value,
        }
        for (let setting in currentSettings) {
          this[setting] = currentSettings[setting]
        }
        // this.setUnit()
        this.currentSettings = { ...currentSettings }
      },
      setItem(item, val) {
        this[item] = val
      },
      setUnit() {
        const timeout = this.timeout
        switch (true) {
          case timeout < 60000:
            this.metric = 'seconds'
            break
          case timeout >= 60000 && time < 3600000:
            this.metric = 'minutes'
            break
          case timeout >= 3600000:
            this.metric = 'hours'
            break
          default:
            break
        }
      },
      toMilliseconds(val) {
        switch (this.metric) {
          case 'seconds':
            return val * 1000
            break
          case 'minutes':
            return val * 60 * 1000
            break
          case 'hours':
            return val * 60 * 60 * 1000
            break
        }
      },
    },
    created() {
      this.revertSettings()
    },
  }
</script>

<style lang="scss" scoped></style>
