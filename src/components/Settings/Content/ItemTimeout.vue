<template>
  <v-card class="">
    <v-card-title class="title-text primary--text">
      {{ setting.label }}
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <p class="">
        {{ setting.description }}
      </p>
      <v-sheet class="d-flex align-center justify-space-around">
        <v-text-field color="primary" type="number" v-model="timeout" class="mx-2"></v-text-field>
        <v-select color="primary" v-model="metric" :items="metricOptions" class="mx-2"></v-select>
      </v-sheet>
    </v-card-text>
    <v-card-actions>
      <v-btn text color=""> </v-btn>
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
