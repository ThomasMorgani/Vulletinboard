<template>
  <v-card flat tile class="mx-0" v-if="!isLoading">
    <v-card-title class="titleTabs  px-0">
      <v-tabs v-model="tabs" class="px-0">
        <v-tab width="50" href="#settings"> <v-icon left> mdi-cog </v-icon> SETTINGS </v-tab>
        <v-tab href="#users"> <v-icon left> mdi-account </v-icon> USERS </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text class="content px-0">
      <v-tabs-items v-model="tabs">
        <v-tab-item value="settings">
          <v-sheet color="transparent" height="100%" class="d-flex flex-column">
            <ColorsSettings class="mt-2"></ColorsSettings>
            <ContentSettings class="mt-2"></ContentSettings>
          </v-sheet>
        </v-tab-item>
        <v-tab-item value="users" disabled>USERS </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
  import ColorsSettings from '@/components/Settings/Colors'
  import ContentSettings from '@/components/Settings/Content'
  export default {
    name: 'Settings',
    components: { ColorsSettings, ContentSettings },
    data: () => ({
      isLoading: true,
      tabs: 'settings',
    }),
    async created() {
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
    top: 64px;
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
