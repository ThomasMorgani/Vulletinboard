<template>
  <v-sheet :color="settings.backgroundColor" height="100%" width="100%" class="d-flex flex-no-wrap align-start justify-start">
    <!--EVENT LIST -->
    <EventList v-if="!isLoading" @showNext="itemCycle" @selectItem="itemSelect"></EventList>
    <!--IMAGE -->
    <EventImage :key="displayedEventImage" :image="displayedEventImage" class="d-flex flex-grow-1 flex-shrink-0"></EventImage>
  </v-sheet>
</template>

<script>
  // import { seedData } from '@/assets/store/data.js'
  // const { items: itemsData, settings: appSettings } = seedData
  import { mapState } from 'vuex'

  import EventList from '@/components/Bulletinboard/Eventlist'
  import EventImage from '@/components/Bulletinboard/Eventimage'

  export default {
    name: 'Bulletinboard',
    components: {
      EventList,
      EventImage,
    },
    data: () => ({
      activeEvent: 0,
      attrMainRow: {
        height: 0,
        width: 0,
      },
      intervalId: null,
      isLoading: true,
    }),
    computed: {
      ...mapState({
        items: state => state.items,
        settings: state => state.board,
      }),
      displayedEventImage() {
        return this.items?.['0']?.content_media
      },
    },
    methods: {
      async init() {
        console.log('apiCall')
        await this.$store.dispatch('initBulletinboard')
        this.resetInterval(this.itemCycle, this.settings.itemTimeout)
        this.isLoading = false
      },
      itemSelect(item) {
        const el = this.$el.getElementsByClassName('eventTop')[0]
        if (el) {
          el.scrollIntoView(true, { behavior: 'smooth' })
        }
        const items = [item, ...this.items.filter(i => i.id != item.id)]
        this.$store.dispatch('itemsSet', items)
        this.resetInterval(this.itemCycle, this.settings.itemTimeout)
      },
      resetInterval(cb, time) {
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
        this.intervalId = setInterval(cb, time)
      },
      itemCycle() {
        if (Array.isArray(this.items)) {
          const items = [...this.items]
          items.push(items.shift())
          this.$store.dispatch('itemsSet', items)
        }
        return
      },
    },
    async created() {
      this.init()
      return
    },
    beforeDestroy() {
      clearInterval(this.intervalId)
    },
  }
</script>

<style scoped></style>
