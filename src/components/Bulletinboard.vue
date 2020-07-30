<template>
  <v-container fluid class="mainContainer" v-resize="onResize">
    <!--TOP BANNER -->

    <!--MID EVENT LIST/IMAGE -->
    <v-row wrap align-center ref="mainRow" >
      <v-col cols="4" class="pa-0" >
        <EventList :articles="articles" @showNextEvent="showNextEvent"></EventList>
   
      </v-col cols="4">
      <v-flex>
        <v-slide-x-transition leave-absolute>
          <v-img
            contain
            :src="'https://eipl.org/bulletinboard/assets/images/' + displayedImage"
            style="background-color: rgba(0,0,0,0.05);"
            :key="displayedImage"
            transition="v-slide-x-transition"
          ></v-img>
        </v-slide-x-transition>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  import {seedData} from '@/assets/store/data.js'
  const {articles:articlesData, settings:appSettings} = seedData

  import EventList from '@/components/Eventlist'  
    
  export default {
    name: 'Bulletinboard',
    components: { 
      EventList,
    },
    data: () => ({
      activeEvent: 0,
      articles: [],
      attrMainRow: {
        height: 0,
        width: 0,
      },
      eventChangeInterval: 7000,
      eventList: [],
      initialEventCount: 0,
      isMounted: false,

    }),
    methods: {
      getArticles() {
        //fetch articles here
        return [...articlesData] || []
      },
      onResize() {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        this.setStyleMainRow()
        this.setStyleEventList()
      },
      selectEvent(id) {
        this.activeEvent = id
      },
      setStyleEventList: function() {
        if (this.$refs.eventListTitleCard) this.$set(this.styleEventList, 'height', this.attrMainRow['height'] - this.$refs.eventListTitleCard.$el['clientHeight'] + 'px')
      },
      setStyleMainRow: function() {
        if (this.$refs.bannerRow) {
          this.$set(this.attrMainRow, 'height', this.windowSize.y - this.$refs.bannerRow['clientHeight'])
          this.$set(this.styleMainRow, 'height', this.windowSize.y - this.$refs.bannerRow['clientHeight'] + 'px')
        }
      },
      showNextEvent: function() {
        var element, currentelement
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
      displayedImage: function() {
        return this.articles && this.activeEvent ? this.articles[this.activeEvent]['content_media'] : ''
      },
    },
    created() {
      console.log(articlesData)
      // console.log(articles)
    },
    mounted() {
      this.articles = this.getArticles()
      return
      if (this.articles) {
        setTimeout(this.onResize, 2000)
        this.initialEventCount = this.articles.length
        this.articles = this.getArticles()
        setInterval(this.showNextEvent, this.eventChangeInterval)
      }
    },
  }
</script>

<style scoped>
  .container {
    padding: .25em 1em;
  }
</style>
