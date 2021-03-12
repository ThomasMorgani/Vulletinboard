<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text">
      Item
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemColor.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemColor.description }}</p>
          <Colorpicker @input="setItem('itemColor', $event)" :btnProps="{ color: itemColor.value, value: itemColor.value }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemTextTitle.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemTextTitle.description }}</p>
          <Colorpicker @input="setItem('itemTextTitle', $event)" :btnProps="{ color: itemTextTitle.value, value: itemTextTitle.value }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemTextSubtitle.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemTextSubtitle.description }}</p>
          <Colorpicker @input="setItem('itemTextSubtitle', $event)" :btnProps="{ color: itemTextSubtitle.value, value: itemTextSubtitle.value }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemTextDescription.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemTextDescription.description }}</p>
          <Colorpicker @input="setItem('itemTextDescription', $event)" :btnProps="{ color: itemTextDescription.value, value: itemTextDescription.value }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ itemTextFooter.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ itemTextFooter.description }}</p>
          <Colorpicker @input="setItem('itemTextFooter', $event)" :btnProps="{ color: itemTextFooter.value, value: itemTextFooter.value }"></Colorpicker>
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
    props: {
      itemColor: {
        type: Object,
        required: true,
      },
      itemTextDescription: {
        type: Object,
        required: true,
      },
      itemTextFooter: {
        type: Object,
        required: true,
      },
      itemTextSubtitle: {
        type: Object,
        required: true,
      },
      itemTextTitle: {
        type: Object,
        required: true,
      },
      itemTimeout: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      metric: 'seconds',
      metricOptions: ['seconds', 'minutes', 'hours'],
    }),
    computed: {
      actionDisabled() {
        return false
      },
      timeout: {
        get() {
          return this.fromMilliseconds(this.itemTimeout.value)
        },
        set(e) {
          this.$emit('input', { setting: 'itemTimeout', value: toMilliseconds($event.target.value) })
        },
      },
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
        console.log('irevertSettings')
      },
      setItem(item, val) {
        this.$emit('setItem', { item, val })
      },
      setUnit() {
        const timeout = this.itemTimeout
        switch (true) {
          case timeout < 60000:
            this.metric = 'seconds'
            break
          case time >= 60000 && time < 3600000:
            this.metric = 'minutes'
            break
          case time >= 3600000:
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
    mounted() {
      // this.itemTimeout = this.setting.value
      // this.setUnit()
    },
  }
</script>

<style lang="scss" scoped></style>
