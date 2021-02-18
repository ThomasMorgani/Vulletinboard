<template>
  <v-card outlined class="">
    <v-card-title class="text-h5 primary--text">
      Ticker
    </v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ tickerFeed.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerFeed.description }}</p>
          <v-select color v-model="feed" :items="feedOptions"></v-select>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ tickerFilter.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerFilter.description }}</p>
          <v-combobox v-model="filter" chips clearable color="primary" deletable-chips full-width item-color="primary" multiple>
            <template #selection="data">
              <v-chip color="primary" close :key="JSON.stringify(data.item)" v-bind="data.attrs" :input-value="data.selected">
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-card-text>
      </v-card>
      <v-card flat width="100%" class="">
        <v-card-title class="text-h5 primary--text">
          {{ tickerSpeed.label }}
        </v-card-title>
        <v-card-text class="d-flex flex-column align-start">
          <p>{{ tickerSpeed.description }}</p>
          <v-sheet color="transparent" width="50%" class="mt-4">
            <v-slider v-model="speed" color="primary" min="10" max="1000" thumb-color="primary" thumb-label="always">
              <template #append>fast</template>
              <template #prepend>slow</template>
            </v-slider>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn tile color="success" :disabled="actionDisabled" width="150">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="actionDisabled" @click="ticker = setting.value">REVERT </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'SettingTicker',
    props: {
      tickerFeed: {
        type: Object,
        required: true,
      },
      tickerFilter: {
        type: Object,
        required: true,
      },
      tickerSpeed: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      feed: null,
      feedOptions: [
        {
          text: 'ABC NEWS',
          value: 'http://abcnews.go.com/abcnews/topstories',
        },
      ],
      filter: [],
      speed: 200,
    }),
    computed: {
      actionDisabled() {
        return false
      },
    },
    mounted() {
      this.feed = this.tickerFeed.value
      this.filter = this.tickerFilter.value
      this.speed = this.tickerSpeed.value
    },
  }
</script>

<style lang="scss" scoped></style>
