<template>
  <v-sheet id="itemList" ref="itemList" color="transparent" class="articleColumn d-flex flex-column justify-start  ma-1">
    <v-card flat tile color="primary" ref="eventListTitleCard" @click="$emit('showNextEvent')" class="white--text ">
      <v-card-title class="d-flex justify-space-between headline">
        <v-icon color="white">mdi mdi-calendar-blank-outline</v-icon>
        EVENTS
        <v-icon color="white">mdi mdi-calendar-blank-outline</v-icon>
      </v-card-title>
    </v-card>
    <div group class="articleList">
      <div class="eventTop"></div>
      <transition-group appear name="fade">
        <EventItem
          v-for="(article, key) in articles"
          :key="article.id"
          :id="`listItem${article.id}`"
          :article="article"
          :isActive="key === 0"
          @itemClicked="$emit('selectItem', article)"
          class="eventItem my-1"
        ></EventItem>
      </transition-group>
    </div>
  </v-sheet>
</template>

<script>
  import EventItem from '@/components/Bulletinboard/Eventitem'

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
    height: 100%;
    width: 30vw;
    max-width: 450px;
    box-sizing: border-box;
    z-index: 5;
  }

  .articleList {
    height: calc(100vh - 225px); /* TODO: When all values in settings data, calc this is js*/
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .articleList::-webkit-scrollbar {
    display: none;
  }

  .eventItem {
    transition: all 2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(80px);
  }

  .fade-leave-active {
    position: absolute;
    width: 30vw;
    z-index: 1;
    opacity: 0.5;
  }
</style>
