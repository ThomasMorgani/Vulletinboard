<template>
  <v-img :src="src" contain @click="$emit('imageClicked', { item })"></v-img>
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
        const isUrl = this.item.content_media.includes('/')
        return this.item.content_media_type === 'image_url' ? this.item.content_media : `${this.$api.mediaUrl}${this.item.content_media}`
      },
    },
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
