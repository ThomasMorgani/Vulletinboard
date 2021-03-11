<template>
  <!-- <v-icon color="primary">mdi-theme-light-dark</v-icon> -->
  <v-switch :prepend-icon="prepend" hide-details :input-value="!$vuetify.theme.isDark" @change="toggleTheme" class="mt-0 px-4"></v-switch>
</template>

<script>
  export default {
    name: 'SwitchTheme',
    props: {
      prepend: {
        default: () => '',
      },
    },
    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        localStorage.setItem('dark', this.$vuetify.theme.dark)
      },
    },
    created() {
      const isDark = localStorage.getItem('dark') || false
      this.$vuetify.theme.dark = isDark === 'true'
    },
  }
</script>

<style lang="scss" scoped></style>
