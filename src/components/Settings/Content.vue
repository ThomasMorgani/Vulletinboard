<template>
  <v-card tile width="100%">
    <v-card-title class="text-h4 primary--text">
      Board Settings
    </v-card-title>
    <v-card-text v-if="!isLoading">
      <!-- <Setting v-for="setting in settings" :key="setting.id" :setting="setting"></Setting> -->
      <Background :setting="settings.backgroundColor" width="100%" class="my-1"></Background>
      <Header
        :headerColor="settings.headerColor"
        :headerShow="settings.headerShow"
        :headerType="settings.headerType"
        :headerContent="settings.headerContent"
        width="100%"
        class="my-1"
      ></Header>
      <Item :setting="settings.Item" class="my-1"></Item>
      <Ticker :tickerFeed="settings.tickerFeed" :tickerFilter="settings.tickerFilter" :tickerShow="settings.tickerShow" :tickerSpeed="settings.tickerSpeed" class="my-1"></Ticker>
    </v-card-text>
  </v-card>
</template>

<script>
  // import Setting from '@/components/Settings/Setting'
  import Background from '@/components/Settings/Content/Background'
  import Header from '@/components/Settings/Content/Header'
  import Item from '@/components/Settings/Content/Item'
  import Ticker from '@/components/Settings/Content/Ticker'

  export default {
    name: 'ContentSettings',
    components: { Background, Header, Item, Ticker },
    data: () => ({
      isLoading: true,
      settings: {},
    }),
    computed: {
      settingsByCat() {
        const settings = {
          background: {},
          header: {},
          ticker: {},
        }
      },
    },
    methods: {
      onSettingInput(e) {
        console.log(e)
      },
    },
    async created() {
      const req = await this.$http.get(`${API_URL}manage/settings`)
      if (req?.data) {
        this.settings = req.data
      }
      this.isLoading = false
    },
  }
</script>

<style lang="scss" scoped></style>
