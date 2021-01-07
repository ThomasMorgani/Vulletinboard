<template>
  <v-app-bar
    app
    flat
    color="primary"
    min-height="1"
    height="100"
    max-height="105"
    :src="titlebarimg"
  >
    <v-toolbar-title
      class="secondary--text logo"
      v-text="title"
    ></v-toolbar-title>
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        contain
        position="left center"
        height="100%"
        min-height="100%"
        class="banner"
      ></v-img>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    title: "VULLETINBOARD",
    titlebarimg: "/images/banner33.jpg"
  })
};
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__image {
  z-index: 1;
}

.logo {
  letter-spacing: 0.25rem;
  font-weight: bold;
  font-size: 2.5em;
}
</style>
