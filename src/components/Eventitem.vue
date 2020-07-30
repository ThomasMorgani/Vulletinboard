<template>
  <div>
    <v-card height="200" class="d-flex flex-column justify-space-between">
      <v-card-title class="justify-start">
        <div>
          <h3 class="text-left font-weight-bold primary--text  text-uppercase mb-0" v-text="article.content_title"></h3>
          <p class="text-left primary--text  text--lighten-1 description pr-4" v-text="article.content_desc"></p>
        </div>
      </v-card-title>
      <v-card-text class="text-left  primary--text " v-text="article.user_friendly_scheduled_date"></v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'eventItem',
    props: {
      article: {
        type: Object,
        default: () => {
          title: ''
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .description {
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 0.009375em;
    line-height: 1rem;
    font-family: 'Roboto', sans-serif;
    word-break: break-word;
  }
</style>
