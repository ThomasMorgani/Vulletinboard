<template>
  <v-sheet :color="background" height="100%" width="100%" class="d-flex flex-no-wrap align-start justify-start">
    <!--EVENT LIST -->
    <EventList :articles="articles" @showNextEvent="showNextEvent" @selectItem="itemSelect"></EventList>
    <!--IMAGE -->
    <EventImage :key="displayedEventImage" :image="displayedEventImage" class="d-flex flex-grow-1 flex-shrink-0"></EventImage>
  </v-sheet>
</template>

<script>
  import { seedData } from '@/assets/store/data.js'
  const { articles: articlesData, settings: appSettings } = seedData

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
      articles: [],
      attrMainRow: {
        height: 0,
        width: 0,
      },
      articleTimer: 8000,
      background: 'grey',
      intervalId: null,
    }),
    computed: {
      displayedEventImage() {
        return this.articles?.['0']?.content_media
      },
    },
    methods: {
      async getArticles() {
        //fetch articles here
        console.log(articlesData)
        return [...articlesData] || []
      },
      itemSelect(item) {
        const el = this.$el.getElementsByClassName('eventTop')[0]
        if (el) {
          el.scrollIntoView(true, { behavior: 'smooth' })
        }

        this.articles = [item, ...this.articles.filter(i => i.id != item.id)]
        this.resetInterval(this.showNextEvent, this.articleTimer)
      },
      resetInterval(cb, time) {
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
        this.intervalId = setInterval(cb, time)
      },
      selectEvent(id) {
        this.activeEvent = id
      },
      showNextEvent() {
        if (Array.isArray(this.articles)) {
          const articles = [...this.articles]
          articles.push(articles.shift())
          this.articles = [...articles]
        }
        return
      },
    },

    async created() {
      this.articles = await this.getArticles()
      this.resetInterval(this.showNextEvent, this.articleTimer)
      return
    },
    beforeDestroy() {
      clearInterval(this.intervalId)
    },
  }
</script>

<style scoped></style>
