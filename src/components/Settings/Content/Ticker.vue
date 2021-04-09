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
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ tickerSettings.tickerColor.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerColor.description }}</p>
          <Colorpicker @input="color = $event.hexa" :btnProps="{ color: color, label: '     ', value: color }"></Colorpicker>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="" :disabled="!show">
        <v-card-title class="text-h5 primary--text">
          {{ tickerSettings.tickerFeed.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerFeed.description }}</p>
          <v-select color v-model="feed" :items="feedOptions" item-value="id">
            <template #append-outer>
              <v-btn small icon color="primary" :href="feedUrl()" target="_blank">
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
          <v-combobox v-model="filter" @change="sortFilter" chips clearable color="primary" deletable-chips full-width item-color="primary" multiple>
            <template #selection="data">
              <v-chip color="primary" close :key="JSON.stringify(data.item)" v-bind="data.attrs" :input-value="data.selected">
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-card-text>
      </v-card>
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ tickerSettings.tickerHeight.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerHeight.description }}</p>
          <v-text-field v-model="height" color="primary" type="number" min="0"></v-text-field>
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
      <v-card :disabled="!show" flat width="100%" class="">
        <v-card-title class="text-h5 primary--text pb-2">
          {{ tickerSettings.tickerTextColor.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSettings.tickerTextColor.description }}</p>
          <Colorpicker @input="textColor = $event.hexa" :btnProps="{ color: textColor, label: '     ', value: textColor }"></Colorpicker>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn tile color="success" :disabled="actionDisabled" width="150" @click="saveTicker">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="actionDisabled" @click="revertSettings">REVERT </v-btn>
      <v-spacer></v-spacer>
      <v-btn tile :disabled="actionDisabled" color="primary" @click="toggleTicker">PREVIEW </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import Colorpicker from '@/components/Controls/PickerColor'

  export default {
    name: 'SettingTicker',
    components: { Colorpicker },
    data: () => ({
      color: null,
      feed: null,
      feedOptions: [
        {
          id: 1,
          text: 'ABC NEWS',
          value: 'https://abcnews.go.com/abcnews/topstories',
        },
      ],
      filter: ['LIVE:', 'WATCH:'],
      height: null,
      show: true,
      speed: 1,
      textColor: null,
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
      feedUrl() {
        return '#'
        //feedOptions.find(f => f.id === feed).value
      },
      revertSettings() {
        const currentSettings = {
          color: this.tickerSettings.tickerColor.value,
          feed: parseInt(this.tickerSettings.tickerFeed.value),
          filter: this.tickerSettings.tickerFilter.value ? JSON.parse(this.tickerSettings.tickerFilter.value) : [],
          height: this.tickerSettings.tickerHeight.value,
          show: this.tickerSettings.tickerShow.value,
          speed: this.tickerSettings.tickerSpeed.value,
          textColor: this.tickerSettings.tickerTextColor.value,
        }
        for (let setting in currentSettings) {
          this[setting] = currentSettings[setting]
        }
        // this.setUnit()
        this.currentSettings = { ...currentSettings }
      },
      async saveTicker() {
        console.log('saveHeader')
        const postData = {
          tickerColor: this.color,
          tickerFeed: this.feed,
          tickerFilter: JSON.stringify(this.filter),
          tickerImage: this.height,
          tickerShow: this.show,
          tickerText: this.speed,
          tickerTextColor: this.textColor,
        }
        this.loadingSave = true
        const resp = await this.$store.dispatch('apiPost', { endpoint: 'manage/settings/ticker', postData })
        if (resp.status === 'success') {
          this.$store.dispatch('settingsSet', postData)
          this.revertSettings()
        }
        this.loadingSave = false
        const { status: color, message } = resp
        this.$store.dispatch('snackbar', { color, message, value: true })
      },
      sortFilter() {
        this.filter = this.filter.sort((a, b) => a > b)
      },
      toggleTicker() {
        const ticker = {
          tickerColor: this.color,
          tickerFeed: this.feed,
          tickerFilter: this.filter,
          tickerImage: this.height,
          tickerRss: this.feedOptions.find(f => f.id === this.feed).value,
          tickerShow: this.show,
          tickerText: this.speed,
          tickerTextColor: this.textColor,
        }
        const tickerPreview = !this.$store?.state?.ticker?.tickerPreview || false
        this.$store.dispatch('tickerSet', { ...ticker, tickerPreview })
      },
    },
    mounted() {
      this.revertSettings()
    },
  }
</script>

<style lang="scss" scoped></style>
