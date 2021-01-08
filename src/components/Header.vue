<template>
  <v-app-bar app text color="primary" min-height="1" height="100" max-height="105">
    <v-toolbar-title class="secondary--text logo" v-text="title"></v-toolbar-title>
    <!-- <template v-slot:img="{ props }">
      <v-img v-bind="props" contain position="left center" height="100%" min-height="100%" class="banner"></v-img>
    </template> -->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text class="secondary--text"> <v-icon left>mdi-plus</v-icon>Add New </v-btn>
      <v-btn text class="secondary--text"> <v-icon left>mdi-clipboard-text</v-icon>Manage Content </v-btn>
      <v-btn text class="secondary--text"><v-icon left>mdi-cog</v-icon>ADMIN</v-btn>
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="secondary" text v-bind="attrs" v-on="on"> <v-icon left>mdi-account-circle</v-icon>Profile </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon color="primary" dark>mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="blue--text">
              <v-list-item-title class="primary--text">PROFILE</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item a href="https://eipl.org/bulletinboard/login/logout">
            <v-list-item-avatar>
              <v-icon color="primary" dark>mdi-logout-variant</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="primary--text">
              <v-list-item-title>LOGOUT</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header',
    data: () => ({
      title: 'VULLETINBOARD',
      titlebarimg: '/images/banner33.jpg',
    }),
  }
</script>

<style lang="scss" scoped>
  ::v-deep .v-toolbar__image {
    z-index: 1;
  }

  .logo {
    letter-spacing: 0.25rem;
    font-weight: bold;
    font-size: 2.5em;
  }
</style>
