<template>
  <v-card flat class="mx-0 mt-6">
    <v-card-title class="titleTabs  px-0">
      <v-tabs v-model="tabs" class="px-0">
        <v-tab width="50"> <v-icon left> mdi-cog </v-icon> SETTINGS </v-tab>
        <v-tab> <v-icon left> mdi-account </v-icon> USERS </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text class="content px-0">
      <v-tabs-items v-model="tabs">
        <v-tab-item key="settings">
          <v-sheet color="transparent" height="100%" class="d-flex flex-column">
            <ColorsSettings class="mt-2"></ColorsSettings>
            <ContentSettings class="mt-2"></ContentSettings>
          </v-sheet>
        </v-tab-item>
        <v-tab-item key="users" disabled>USERS </v-tab-item>
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
      tabs: 'settings',
    }),
  }
</script>

<style lang="scss" scoped>
  .titleTabs {
    position: sticky;
    top: 64px;
    left: 0px;
    z-index: 2;
  }
  // .content {
  //   height: 80vh;
  //   overflow-y: scroll;
  // }
</style>
