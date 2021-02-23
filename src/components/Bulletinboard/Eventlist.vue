<template>
  <v-sheet id="itemList" ref="itemList" color="transparent" class="itemColumn d-flex flex-column justify-start  ma-1">
    <v-card flat tile color="primary" ref="eventListTitleCard" @click="$emit('showNext')" class="white--text ">
      <v-card-title class="d-flex justify-space-between headline">
        <v-icon color="white">mdi mdi-calendar-blank-outline</v-icon>
        EVENTS
        <v-icon color="white">mdi mdi-calendar-blank-outline</v-icon>
      </v-card-title>
    </v-card>
    <div group class="itemList">
      <div class="eventTop"></div>
      <transition-group appear name="fade">
        <EventItem
          v-for="(item, key) in items"
          :key="item.id"
          :id="`listItem${item.id}`"
          :item="item"
          :isActive="key === 0"
          @itemClicked="$emit('selectItem', item)"
          class="eventItem my-1"
        ></EventItem>
      </transition-group>
    </div>
  </v-sheet>
</template>

<script>
  import { mapState } from 'vuex'
  import EventItem from '@/components/Bulletinboard/Eventitem'

  export default {
    name: 'EventList',
    components: {
      EventItem,
    },
    computed: {
      ...mapState({
        items: state => state.items,
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .itemColumn {
    height: 100%;
    width: 30vw;
    max-width: 450px;
    box-sizing: border-box;
    z-index: 5;
  }

  .itemList {
    height: calc(100vh - 225px); /* TODO: When all values in settings data, calc this is js*/
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .itemList::-webkit-scrollbar {
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
