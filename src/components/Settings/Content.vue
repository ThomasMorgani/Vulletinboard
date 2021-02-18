<template>
  <v-card tile width="100%">
    <v-card-title class="text-h4 primary--text">
      Content Settings
    </v-card-title>
    <v-card-text v-if="!isLoading">
      <!-- <Setting v-for="setting in settings" :key="setting.id" :setting="setting"></Setting> -->
      <Background :setting="settings.backgroundColor" width="100%" class="my-1"></Background>
      <ItemTimeout :setting="settings.itemTimeout" class="my-1"></ItemTimeout>
      <Ticker :tickerFeed="settings.tickerFeed" :tickerFilter="settings.tickerFilter" :tickerSpeed="settings.tickerSpeed" class="my-1"></Ticker>
    </v-card-text>
  </v-card>
</template>

<script>
  // import Setting from '@/components/Settings/Setting'
  import Background from '@/components/Settings/Content/Background'
  import ItemTimeout from '@/components/Settings/Content/ItemTimeout'
  import Ticker from '@/components/Settings/Content/Ticker'

  export default {
    name: 'ContentSettings',
    components: { Background, ItemTimeout, Ticker },
    data: () => ({
      isLoading: true,
      settings: {},
    }),
    methods: {
      onSettingInput(e) {
        console.log(e)
      },
    },
    async created() {
      const req = await this.$http.get(`${this.$api.apiUrl}manage/settings`)
      if (req?.data) {
        this.settings = req.data
      }
      this.isLoading = false
    },
  }
</script>

<style lang="scss" scoped></style>
