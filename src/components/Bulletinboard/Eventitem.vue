<template>
  <v-card
    :elevation="isActive ? '6' : '1'"
    :color="isActive ? settings.itemTextTitle : settings.itemColor"
    height="200"
    min-width="350"
    :outlined="isActive"
    tile
    @click="$emit('itemClicked', item)"
    class="item d-flex flex-column"
    :style="isActive && activeStyle"
  >
    <v-card-title class="justify-start flex-shrink-1">
      <div>
        <h3 v-text="item.content_title" class="text-left font-weight-bold  text-uppercase mb-0" :style="titleStyle"></h3>
        <p v-text="item.content_subtitle" class="text-left  description pr-4" :style="subtitleStyle"></p>
      </div>
    </v-card-title>
    <v-card-text class="d-flex flex-column  flex-grow-1 align-start justify-space-between">
      <p v-text="item.content_desc" class="text-left  description pr-4" :style="descriptionStyle"></p>
      <p v-text="timestampToHuman(item.content_date)" class="pa-0 ma-0" :style="footerStyle"></p>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import formats from '@/utils/formats'
  export default {
    name: 'eventItem',
    props: {
      item: {
        type: Object,
        default: () => {
          title: ''
        },
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapState({
        appLoading: state => state.appLoading,
        settings: state => state.item,
      }),
      activeStyle() {
        const primary = this.$vuetify.theme.themes.light.primary
        return {
          'border-right-color': primary,
          'border-right-width': '8px',
        }
      },
      descriptionStyle() {
        return {
          color: this.isActive ? this.settings.itemTextFooterActive : this.settings.itemTextFooter,
        }
      },
      footerStyle() {
        return {
          color: this.isActive ? this.settings.itemTextFooterActive : this.settings.itemTextFooter,
        }
      },
      subtitleStyle() {
        return {
          color: this.isActive ? this.settings.itemTextSubtitleActive : this.settings.itemTextSubtitle,
        }
      },
      titleStyle() {
        return {
          color: this.isActive ? this.settings.itemTextTitleActive : this.settings.itemTextTitle,
        }
      },
    },
    methods: {
      timestampToHuman(timestamp = '') {
        if (!timestamp) return ''
        const [date, time] = timestamp.split(' ')
        const dateHuman = formats.dateHuman(date)
        const timeHuman = formats.timeHuman(time)
        return `${dateHuman} ${timeHuman}`
      },
    },
    created() {},
  }
</script>

<style lang="scss" scoped>
  .v-card__text {
  }
  .item {
    box-sizing: border-box;
  }
  .description {
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 0.009375em;
    line-height: 1rem;
    font-family: 'Roboto', sans-serif;
    word-break: break-word;
  }
</style>
