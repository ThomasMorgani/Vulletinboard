<template>
  <div class="d-flex flex-column justify-start articleColumn">
    <v-card flat color="primary" class="white--text" ref="eventListTitleCard" @click="$emit('showNextEvent')">
      <v-card-title class="d-flex justify-space-between headline">
        <v-icon color="white">mdi mdi-calendar-blank-outline</v-icon>
        EVENTS

        <v-icon color="white">mdi mdi-calendar-blank-outline</v-icon>
      </v-card-title>
    </v-card>
    <div class="articleList">
      <EventItem v-for="article in articles" :key="article.id" :article="article" class="ma-1"></EventItem>
    </div>
  </div>
</template>

<script>
  import EventItem from '@/components/Eventitem'

  export default {
    name: 'EventList',
    components: {
      EventItem,
    },
    props: {
      articles: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style lang="scss" scoped>
  .articleColumn {
    box-sizing: border-box;
    max-width: 480px;
    min-width: 420px;
  }

  .articleList {
    height: calc(100vh - 260px); /* TODO: When all values in settings data, calc this is js*/
    overflow-y: scroll;
    width: 100%;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .articleList::-webkit-scrollbar {
    display: none;
  }
</style>
