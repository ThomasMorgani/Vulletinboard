<template>
  <v-dialog :key="item.src" :value="item.show" max-width="70vw" transition="dialog-transition">
    <v-img :src="src" max-width="100%" contain @click="$emit('mediaModalToggle', { show: false, media: '', src: null })"></v-img>
  </v-dialog>
</template>

<script>
  export default {
    name: 'MediaModal',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      src() {
        return `${this.$api.mediaUrl}/${this.item.src}`
      },
    },
    mounted() {
      console.log(this.$api)
    },
  }
</script>

<style lang="scss" scoped></style>
