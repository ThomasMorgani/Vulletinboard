<template>
  <div>
    <v-img
      contain
      :src="'https://eipl.org/bulletinboard/assets/images/' + image"
      style="background-color: rgba(0,0,0,0.05);"
      :key="image"
      transition="v-slide-x-transition"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: "EventImage",
  props: {
    image: {
      type: String,
      default: () => "NO IMAGE PLACEHOLDER"
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
/* TRANSITIONS */

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
