<template>
  <v-container fluid class="mainContainer">
    <v-row wrap align-center ref="mainRow" >
    <!--EVENT LIST -->
      <v-col cols="4" class="pa-0" >
        <EventList :articles="articles" @showNextEvent="showNextEvent"></EventList>
      </v-col cols="4">
    <!--IMAGE -->
      <v-col cols="8" class="text-center">
        <v-slide-x-transition leave-absolute>
          <EventImage :key="displayedEventImage" :image="displayedEventImage"></EventImage>
        </v-slide-x-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {seedData} from '@/assets/store/data.js'
  const {articles:articlesData, settings:appSettings} = seedData


  import EventList from '@/components/Bulletinboard/Eventlist'  
  import EventImage from '@/components/Bulletinboard/Eventimage'  
    
  export default {
    name: 'Bulletinboard',
    components: { 
      EventList,
      EventImage
    },
    data: () => ({
      activeEvent: 0,
      articles: [],
      attrMainRow: {
        height: 0,
        width: 0,
      },
      articleTimer: 7000,
      initialEventCount: 2,
      intervalId: null,
      isMounted: false,

    }),
    methods: {
      async getArticles() {
        //fetch articles here
        console.log(articlesData)
        return [...articlesData] || []
      },

      selectEvent(id) {
        this.activeEvent = id
      },

      showNextEvent() {
        if (Array.isArray(this.articles)) {
          const article = this.articles.shift()
          this.articles.push(article)
        }
        return
        //TODO: DELETE, CONFIRM NOT NEEDED
        if (parseInt(this.activeEvent) < this.articles.length - 1) {
          this.activeEvent++
          currentelement = 'listItem' + this.activeEvent
          element = document.getElementById(currentelement)
          console.log(element)
          if (!element) return
          if (this.activeEvent % 2 === 0) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
          //TESTING INFINITE SCROLL
          // if (this.$refs.eventList.$el.scrollTop > 0) {
          //   console.log('push')
          //   this.eventList.push(this.eventList.shift())
          // }
        } else if (parseInt(this.activeEvent) >= this.articles.length - 1) {
          // this.$http.get('https://eipl.org/bulletinboard/?getarticles=true').then(
          //         function(data){ this.setData(data)} ).then(
          //             function(){this.showSelectedEvent("0")}).then(
          //                 function(){var currentelement = 'listItem' + this.displayedArticle
          //                     .scrollIntoView()})
          this.activeEvent = 0
          currentelement = 'listItem' + this.activeEvent
          element = document.getElementById(currentelement)
          if (!element) return
          element.scrollIntoView({ behavior: 'smooth' })
        } else {
          //console.log('error')
        }
      },
    },
    computed: {
      displayedEventImage: function() {
        return this.articles && this.activeEvent ? this.articles[this.activeEvent]['content_media'] : ''
      },
    },
    created() {
      console.log(articlesData)
      // console.log(articles)
    },
    async mounted() {
      this.articles = await this.getArticles()
      return
      if (this.articles) {
        this.initialEventCount = this.articles.length
        this.intervalId = setInterval(this.showNextEvent, this.articleTimer)
      }
    },
    beforeDestroy() {
      clearInterval(this.intervalId)
    },
  }
</script>

<style scoped>
  .container {
    padding: .25em 1em;
  }

  
</style>
