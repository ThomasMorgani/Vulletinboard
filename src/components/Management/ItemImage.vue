<template>
  <v-img :src="src" max-width="100%" contain @click="$emit('imageClicked', { item })"></v-img>
</template>

<script>
  export default {
    name: 'itemImage',
    props: {
      item: {
        type: Object,
        required: true,
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      imageProps() {
        return
      },
      src() {
        return this.item.content_media_type === 'url' ? this.item.content_media : `${this.$api.mediaUrl}${this.item.content_media}`
      },
    },
  }
</script>

<style lang="scss" scoped></style>
