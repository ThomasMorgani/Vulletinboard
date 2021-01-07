<template>
  <v-app id="app">
    <Header></Header>
    <v-main>
      <router-view />
    </v-main>
    <Ticker v-if="$route.name === 'Bulletinboard'"></Ticker>
  </v-app>
</template>
<script>
  import Header from '@/components/Header'
  import Ticker from '@/components/Bulletinboard/Ticker'
  export default {
    name: 'Vulletinboard',
    components: {
      Header,
      Ticker,
    },
  }
</script>
<style lang="scss">
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
