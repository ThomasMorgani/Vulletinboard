<template>
    <v-card 
    :elevation="isActive ? '6' : '1'" 
    :color="isActive ? 'primary' : 'secondary'" 
    height="200" 
    min-width="350" 
    :outlined="isActive"
    tile
    @click="$emit('itemClicked', article)"
    class="item d-flex flex-column justify-space-between" 
    :class="isActive ? 'secondary--text' : 'primary--text'" 
    :style="isActive && activeStyle" 
    >
      <v-card-title class="justify-start">
        <div>
          <h3 class="text-left font-weight-bold  text-uppercase mb-0" v-text="article.content_title"></h3>
          <p class="text-left  description pr-4" v-text="article.content_desc"></p>
        </div>
      </v-card-title>
      <v-card-text class="text-left" :class="isActive ? 'secondary--text' : 'primary--text'"  v-text="article.user_friendly_scheduled_date"></v-card-text>
    </v-card>
  </transition>
</template>

<script>
export default {
  name: "eventItem",
  props: {
    article: {
      type: Object,
      default: () => {
        title: "";
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeStyle() {
      console.log(this.$vuetify)
      const primary = this.$vuetify.theme.themes.light.primary
        return {
          'border-right-color': primary,
          'border-right-width': '8px',
        }

    }
  },
  created() {
    console.log(this.$vuetify)

  }
};
</script>

<style lang="scss" scoped>

.item {
  box-sizing: border-box;
}
.description {
  font-size: 1rem;
  font-weight: normal;
  letter-spacing: 0.009375em;
  line-height: 1rem;
  font-family: "Roboto", sans-serif;
  word-break: break-word;
}

 
</style>
