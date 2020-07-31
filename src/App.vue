<template>
  <v-app id="app">
    <Header></Header>
    <v-main>
      <Bulletinboard></Bulletinboard>
    </v-main>
    <Ticker></Ticker>
  </v-app>
</template>

<script>
  import Bulletinboard from './components/Bulletinboard.vue'
  import Header from './components/Header.vue'
  import Ticker from './components/Ticker.vue'

  export default {
    name: 'Vulletinboard',
    components: { Bulletinboard, Header, Ticker },
    data: () => ({}),
    created() {
      console.log(this.$vuetify)
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 62.5%;
    margin: 0;
    padding: 0;
  }

  .titlebartext {
    z-index: 1;
  }
</style>
