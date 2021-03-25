<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text">
      Ticker
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ tickerSettings.tickerShow.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerShow.description }}</p>
          <v-switch color v-model="show" :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'" class="mt-0"> </v-switch>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="" :disabled="!show">
        <v-card-title class="text-h5 primary--text">
          {{ tickerSettings.tickerFeed.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerFeed.description }}</p>
          <v-select color v-model="feed" :items="feedOptions">
            <template #append-outer>
              <v-btn small icon color="primary" :href="feed" target="_blank">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
          </v-select>
        </v-card-text>
      </v-card>
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ tickerSettings.tickerFilter.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerFilter.description }}</p>
          <v-combobox v-model="filter" chips clearable color="primary" deletable-chips full-width item-color="primary" multiple>
            <template #selection="data">
              <v-chip color="primary" close :key="JSON.stringify(data.item)" v-bind="data.attrs" :input-value="data.selected">
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-card-text>
      </v-card>
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ tickerSettings.tickerSpeed.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerSpeed.description }}</p>
          <v-sheet color="transparent" width="50%" class="mt-4">
            <v-slider v-model="speed" color="primary" :max="5" :min="1" step="1" thumb-color="primary" thumb-label="always" ticks="always">
              <template #append>fast</template>
              <template #prepend>slow</template>
            </v-slider>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn tile color="success" :disabled="actionDisabled" width="150">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="actionDisabled" @click="revertSettings">REVERT </v-btn>
      <v-spacer></v-spacer>
      <v-btn tile :disabled="actionDisabled" color="primary" @click="toggleTicker">PREVIEW </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingTicker',
    data: () => ({
      feed: null,
      feedOptions: [
        {
          id: 1,
          text: 'ABC NEWS',
          value: 'http://abcnews.go.com/abcnews/topstories',
        },
      ],
      filter: [],
      show: true,
      speed: 1,
    }),
    computed: {
      actionDisabled() {
        return !this.show
      },
      tickerSettings() {
        return this?.$store?.getters?.settingsByCat?.ticker || {}
      },
    },
    methods: {
      revertSettings() {
        const currentSettings = {
          feed: this.tickerSettings.tickerFeed.value,
          filter: this.tickerSettings.tickerFilter.value ? JSON.parse(this.tickerSettings.tickerFilter.value) : [],
          show: this.tickerSettings.tickerShow.value,
          speed: this.tickerSettings.tickerSpeed.value,
        }
        for (let setting in currentSettings) {
          this[setting] = currentSettings[setting]
        }
        // this.setUnit()
        this.currentSettings = { ...currentSettings }
      },
      toggleTicker() {
        console.log('toggle ticker')
      },
    },
    mounted() {
      this.revertSettings()
    },
  }
</script>

<style lang="scss" scoped></style>
