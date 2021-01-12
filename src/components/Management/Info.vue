<template>
  <v-card flat>
    <v-card-title class="subheading primary--text pb-2">
      DETAILS
    </v-card-title>
    <!-- <v-card :height="100"> -->
    <v-card-text class="d-flex flex-column flex-wrap align-start justify-start">
      <v-layout row wrap>
        <v-col :cols="Object.values(countsDisplayed).length > 3 ? 6 : 12" v-for="item in countsDisplayed" :key="item.item" class="pa-1">
          <v-sheet class="d-flex align-center justify-start mb-0"
            ><v-icon small :color="item.color" left> {{ item.icon }}</v-icon> {{ `${item.count} ${item.text}` }}</v-sheet
          >
        </v-col>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'Info',
    props: {
      counts: {
        pastDate: {
          type: Number,
          required: true,
        },
        scheduledActive: {
          type: Number,
          required: true,
        },
        scheduledExpired: {
          type: Number,
          required: true,
        },
        scheduledExpired: {
          type: Number,
          required: true,
        },
        active: {
          type: Number,
          required: true,
        },
      },
    },
    data: () => ({
      items: {
        active: {
          color: 'success',
          icon: 'mdi-eye',
          text: 'active ',
        },
        pastDate: {
          color: 'error',
          icon: 'mdi-timer-sand',
          text: 'visible post event date',
        },
        scheduledActive: {
          color: 'success',
          icon: 'mdi-alarm-check',
          text: 'scheduled active',
        },
        scheduledExpired: {
          color: 'error',
          icon: 'mdi-alarm-off',
          text: 'scheduled expired',
        },
        scheduledPending: {
          color: 'primary',
          icon: 'mdi-alarm',
          text: 'scheduled pending',
        },
      },
    }),
    computed: {
      countsDisplayed() {
        let counts = {}
        for (let item in this.counts) {
          if (this.counts[item] > 0) {
            counts[item] = { ...this.items[item], count: this.counts[item], item }
          }
        }
        return counts
      },
    },
  }
</script>

<style lang="scss" scoped></style>
