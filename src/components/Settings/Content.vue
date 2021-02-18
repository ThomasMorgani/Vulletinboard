<template>
  <v-card tile width="100%">
    <v-card-title class="title-text primary--text">
      Content Settings
    </v-card-title>
    <v-card-text @input="onSettingInput" v-if="!isLoading">
      <!-- <Setting v-for="setting in settings" :key="setting.id" :setting="setting"></Setting> -->
      <Background width="100%"></Background>
      <ItemTimeout :setting="settings.itemTimeout"></ItemTimeout>
    </v-card-text>
  </v-card>
</template>

<script>
  // import Setting from '@/components/Settings/Setting'
  import Background from '@/components/Settings/Content/Background'
  import ItemTimeout from '@/components/Settings/Content/ItemTimeout'

  export default {
    name: 'ContentSettings',
    components: { Background, ItemTimeout },
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
