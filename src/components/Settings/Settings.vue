<template>
  <v-card flat tile class="mx-0 pb-4" v-if="!isLoading">
    <v-card-title class="titleTabs  pa-0">
      <v-tabs v-model="tabs" @change="onTabChange" class="text-center px-0">
        <v-tab href="#settings"> <v-icon left> mdi-cog </v-icon> APP </v-tab>
        <v-tab href="#board"> <v-icon left> mdi-tablet-dashboard </v-icon> BOARD </v-tab>
        <v-tab href="#users"> <v-icon left> mdi-account </v-icon> USERS </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text class="content pa-0 pr-2">
      <v-tabs-items v-model="tabs">
        <v-tab-item value="board">
          <v-sheet color="transparent" height="100%" class="d-flex flex-column">
            <ContentSettings class="mt-2"></ContentSettings>
          </v-sheet>
        </v-tab-item>
        <v-tab-item value="settings">
          <v-sheet color="transparent" height="100%" class="d-flex flex-column">
            <!-- MAKE APPSETTINGS< MOVE GENERAL, COLOR  -->
            <GeneralSettings></GeneralSettings>
            <ColorsSettings class="mt-2"></ColorsSettings>
          </v-sheet>
        </v-tab-item>
        <v-tab-item value="users" disabled>USERS </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
  import ColorsSettings from '@/components/Settings/App/Colors'
  import GeneralSettings from '@/components/Settings/App/General'
  import ContentSettings from '@/components/Settings/Content'
  export default {
    name: 'Settings',
    components: { ColorsSettings, ContentSettings, GeneralSettings },
    data: () => ({
      isLoading: true,
      tabs: 'settings',
    }),
    methods: {
      onTabChange(e) {
        console.log(e)
        localStorage.setItem('settingsView', e)
      },
    },
    async created() {
      const view = localStorage.getItem('settingsView')
      if (view) {
        this.tabs = view
      }
      const settings = await this.$store.dispatch('apiGet', 'manage/settings')
      if (settings) {
        this.$store.dispatch('settingsSet', settings)
      }
      this.isLoading = false
    },
  }
</script>

<style lang="scss" scoped>
  .titleTabs {
    position: sticky;
    top: 80px;
    left: 0px;
    z-index: 2;
  }
  .titleText {
    align-self: flex-start;
    position: sticky;
    top: 70px;
    left: 0;
    z-index: 24;
  }
  .v-window__container {
    height: 100%;
  }
  // .content {
  //   height: 80vh;
  //   overflow-y: scroll;
  // }
</style>
