<template>
  <v-card tile width="100%">
    <v-card-title class="text-h4 primary--text">
      Board Settings
    </v-card-title>
    <v-card-text v-if="!isLoading">
      <Background :setting="settings.boardBackground" width="100%" class="my-1"></Background>
      <Header
        :headerColor="settings.headerColor"
        :headerShow="settings.headerShow"
        :headerType="settings.headerType"
        :headerContent="settings.headerContent"
        width="100%"
        class="my-1"
      ></Header>
      <Item v-bind="settingsByCat.item" @setItem="settingUpdate" class="my-1"></Item>
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
      settingsSaved: {},
    }),
    computed: {
      settingsByCat() {
        const settings = {
          board: {},
          header: {},
          item: {},
          theme: {},
          ticker: {},
        }
        let test = ''
        Object.keys(this.settings).forEach(setting => {
          const str = setting.substring(0, 4)
          switch (str) {
            case 'boar':
              settings.board[setting] = this.settings[setting]
              break
            case 'head':
              settings.header[setting] = this.settings[setting]
              break
            case 'item':
              settings.item[setting] = this.settings[setting]
              break
            case 'them':
              settings.theme[setting] = this.settings[setting]
              break
            case 'tick':
              settings.ticker[setting] = this.settings[setting]
              break
            default:
              console.log(str, 'is not found')
              break
          }
        })
        return settings
      },
    },
    methods: {
      onSettingInput(e) {
        console.log(e)
      },
      settingUpdate({ item, val }) {
        this.settings[item].value = val
      },
    },
    async created() {
      const req = await this.$http.get(`${API_URL}manage/settings`)
      if (req?.data) {
        this.settings = { ...req.data }
        this.settingsSaved = { ...req.data }
      }
      this.isLoading = false
    },
  }
</script>

<style lang="scss" scoped></style>
