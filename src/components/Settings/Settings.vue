<template>
  <v-card flat height="8rem" max-height="8rem">
    <v-card-title>
      <v-row>
        <v-col cols="8">
          <v-tabs v-model="tabs">
            <v-tab width="50"> <v-icon left> mdi-cog </v-icon> SETTINGS </v-tab>
            <v-tab> <v-icon left> mdi-account </v-icon> USERS </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-btn block color="success"> <v-icon left>mdi-content-save</v-icon>SAVE </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-tabs-items v-model="tabs">
      <v-tab-item key="settings">
        <v-sheet color="transparent" height="100%" class="d-flex">
          <ContentSettings></ContentSettings>
        </v-sheet>
      </v-tab-item>
      <v-tab-item key="users" disabled>USERS </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import ContentSettings from '@/components/Settings/Content'
  export default {
    name: 'Settings',
    components: { ContentSettings },
    data: () => ({
      tabs: 'settings',
    }),
  }
</script>

<style lang="scss" scoped></style>
