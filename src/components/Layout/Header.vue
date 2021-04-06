<template>
  <v-app-bar
    app
    :color="color"
    min-height="1"
    :height="height"
    max-height="105"
    :src="imageShow"
    @mouseenter="menuShow = !menuShow"
    @mouseleave="menuShow = !menuShow"
    :style="textStyle"
  >
    <v-toolbar-title @click="menuShow = !menuShow" v-text="text" class="text-h5"></v-toolbar-title>
    <template v-slot:img="{ props }">
      <v-img v-bind="props" contain content-class="imgclass" position="left center" height="100%" min-height="100%" class="banner"></v-img>
    </template>
    <v-toolbar-items v-if="showMenu" transition="scroll-y-transition" class="primary">
      <!-- <v-btn text class="secondary--text"> <v-icon left>mdi-plus</v-icon>Add New </v-btn> -->
      <v-btn text class="secondary--text" exact :to="{ name: 'Bulletinboard' }"> <v-icon left>mdi-pin</v-icon>Bulletinboard </v-btn>
      <v-btn text class="secondary--text" :to="{ name: 'Manage' }"> <v-icon left>mdi-clipboard-text</v-icon>Content </v-btn>
      <v-btn v-if="isAdmin" text class="secondary--text" :to="{ name: 'Settings' }"><v-icon left>mdi-cog</v-icon>ADMIN</v-btn>
      <v-menu v-model="userMenu" bottom :close-on-content-click="false" offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="secondary" text v-bind="attrs" v-on="on"> <v-icon left>mdi-account-circle</v-icon>Profile </v-btn>
        </template>
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon color="primary">mdi-theme-light-dark</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-center  primary--text">
              <ThemeToggle></ThemeToggle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item a href="https://eipl.org/bulletinboard/user">
            <v-list-item-avatar>
              <v-icon color="primary">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-left primary--text">
              <v-list-item-title class="font-weight-bold">PROFILE</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item a href="https://eipl.org/bulletinboard/login/logout">
            <v-list-item-avatar>
              <v-icon color="primary">mdi-logout-variant</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="text-left primary--text">
              <v-list-item-title class=" font-weight-bold">LOGOUT</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  import ThemeToggle from '@/components/Controls/SwitchTheme'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Header',
    components: { ThemeToggle },
    data: () => ({
      menuShow: false,
      userMenu: false,
      titlebarimg: '/images/banner33.jpg',
    }),
    computed: {
      ...mapGetters(['isAdmin', 'isAuth', 'settingsByCat']),
      color() {
        return this.isBulletinboard ? this.settings.boardHeaderColor : 'primary'
      },
      height() {
        return this.isBulletinboard ? this.settings.boardHeaderHeight : '80'
      },
      imageShow() {
        if (this.isBulletinboard) {
          return this.settings.boardHeaderType === 'image' ? this.settings.boardHeaderImage : ''
        }
      },
      isBulletinboard() {
        return this.$route.name === 'Bulletinboard'
      },
      showMenu() {
        return this.userMenu || (this.isAuth && this.menuShow)
      },
      settings() {
        return this.$store.state.header
      },
      text() {
        if (this.isBulletinboard) {
          return this.settings.boardHeaderType === 'image' ? '' : this.settings.boardHeaderText
        }
        return this.isBulletinboard ? this.settings.boardHeaderText : this.settingsByCat?.app?.appName?.value || ''
      },
      textShow() {
        return this.$route.name !== 'Bulletinboard' || this.settings.boardHeaderType === 'text'
      },
      textStyle() {
        const align = this.isBulletinboard ? this.settings.boardHeaderContentAlign : 'start'
        const color = this.isBulletinboard ? this.settings.boardHeaderTextColor : this.theme.secondary

        return {
          'align-content': 'center',
          color,
          'justify-content': align,
          display: 'flex',
          width: '100%',
        }
      },
      theme() {
        const { dark, light } = this.$vuetify.theme.themes
        return this.isDark ? dark : light
      },
    },
  }
</script>
c5-r
<style lang="scss" scoped>
  .imgclass {
    widows: 20%;
  }
  .logo {
    letter-spacing: 0.25rem;
    font-weight: bold;
    font-size: 2.5em;
  }
  .v-toolbar__items {
    position: fixed;
    top: 0;
    right: 0;
  }
</style>
