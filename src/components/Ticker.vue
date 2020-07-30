<template>
  <v-toolbar bottom flat color="primary" height="65" class="align-center">
    <span class="navbar-brand mb-0 h1"><div id="txt" class="bottomClock">time</div></span>
    <div style="border-left:1px solid #FFF;height:50px" class="px-1"></div>
    <v-icon class="text-sm-left pr-1" color="white">mdi mdi-newspaper</v-icon>

    <div class="newsFeedDiv" id="testElement">
      <!-- <font class="text-white headline pr-1">HEADLINES:</font> -->
      <span class="marquee">
        <p class="marquee-text">{{ displayedNewsFeedMarquee }}</p>
      </span>
    </div>
    <v-spacer></v-spacer>
    <div id="weatherDiv" v-if="this.weatherData != ''">
      <p class="text-xs-center weathertempPtag">
        <font class="weatherTemp">{{ this.weatherData.item.condition.temp }}&#176;</font>
      </p>
      <img class="weatherIcon" v-bind:src="this.weatherIcon" />
    </div>
  </v-toolbar>
</template>

<script>
  import RSSParser from 'rss-parser'
  export default {
    data: () => ({
      name: 'ticker',
      displayedArticle: '',
      displayedImage: '',
      displayedNewsItem: 0,
      displayedNewsItemTitle: '',
      displayedNewsFeedMarquee: 'TEST TEXT',
      newsfeed: null,
      newsfeedCount: '',
      newsfeedLoading: true,
      weatherData: '',
      weatherIcon: '',
    }),
    methods: {
      async getFeed() {
        const corsproxy = 'https://cors-anywhere.herokuapp.com/'
        const rssfeed = 'http://abcnews.go.com/abcnews/topstories'
        const parser = new RSSParser()

        try {
          const feed = await parser.parseURL(corsproxy + rssfeed)
          console.log(feed)
        } catch (err) {
          console.log('get feed error', err)
        }
      },
    },
    created() {
      this.getFeed()
    },
  }
</script>

<style lang="scss" scoped></style>
