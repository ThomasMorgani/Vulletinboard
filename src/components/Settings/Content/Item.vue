<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text">
      {{ setting.label }}
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <p class="">
        {{ setting.description }}
      </p>
      <v-sheet class="d-flex align-center justify-space-around">
        <v-text-field
          v-model="timeout"
          color="primary"
          :error-messages="!itemTimeout || itemTimeout < 1 ? 'must be greater than 0' : null"
          min="1"
          type="number"
          class="mx-2"
        ></v-text-field>
        <v-select color="primary" v-model="metric" :items="metricOptions" class="mx-2"></v-select>
      </v-sheet>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn tile color="success" :disabled="setting.value === itemTimeout || itemTimeout < 1" width="150">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="setting.value === itemTimeout" @click="revertSetting">REVERT </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'itemList',
    props: {
      headerColor: {
        type: String,
        required: true,
      },
      headerText: {
        type: String,
        required: true,
      },
      itemColor: {
        type: String,
        required: true,
      },
      itemTextDescription: {
        type: String,
        required: true,
      },
      itemTextFooter: {
        type: String,
        required: true,
      },
      itemTextSubtitle: {
        type: String,
        required: true,
      },
      itemTextTitle: {
        type: String,
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
      revertSetting() {
        this.itemTimeout = this.setting.value
        this.setUnit()
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
