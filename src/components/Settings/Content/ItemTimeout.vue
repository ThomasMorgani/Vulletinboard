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
          :error-messages="!timeoutVal || timeoutVal < 1 ? 'must be greater than 0' : null"
          min="1"
          type="number"
          class="mx-2"
        ></v-text-field>
        <v-select color="primary" v-model="metric" :items="metricOptions" class="mx-2"></v-select>
      </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-btn tile color="success" :disabled="setting.value === timeoutVal || timeoutVal < 1" width="150">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="setting.value === timeoutVal" @click="timeoutVal = setting.value">REVERT </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingItemTimeout',
    props: {
      setting: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      metric: 'seconds',
      metricOptions: ['seconds', 'minutes', 'hours'],
      timeoutVal: null,
    }),
    computed: {
      timeout: {
        get() {
          return this.fromMilliseconds(this.timeoutVal)
        },
        set(e) {
          this.timeoutVal = this.toMilliseconds(e)
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
      this.timeoutVal = this.setting.value
    },
  }
</script>

<style lang="scss" scoped></style>
