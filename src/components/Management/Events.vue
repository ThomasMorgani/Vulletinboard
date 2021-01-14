<template>
  <v-card flat>
    <v-card-title class="title primary--text">
      <v-row>
        <v-col cols="8">
          <v-card flat height="8rem" max-height="8rem">
            <v-tabs vertical v-model="tabs">
              <v-tab>
                <v-icon left>
                  mdi-information
                </v-icon>
              </v-tab>
              <v-tab>
                <v-icon left>
                  mdi-filter
                </v-icon>
              </v-tab>
              <v-tab>
                <v-icon left>
                  mdi-key
                </v-icon>
              </v-tab>
              <v-tabs-items v-model="tabs">
                <v-tab-item key="info"><Info :counts="counts"></Info> </v-tab-item>
                <v-tab-item key="filter">FILTER </v-tab-item>
                <v-tab-item key="legend">
                  <Legend></Legend>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-card>
        </v-col>
        <v-col class="d-flex align-end">
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details clearable> </v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="itemsList"
        :search="search"
        hide-default-footer
        :options="{ itemsPerPage: 10000 }"
        height="70vh"
        fixed-header
        class="elevation-1"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="text-left font-weight-bold">{{ item.content_title }}</td>
              <td class="text-left">
                <v-tooltip top color="primary">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">{{ item.content_desc && item.content_desc.length > 40 ? item.content_desc.substring(0, 40) + '...' : item.content_desc }} </span>
                  </template>
                  <span>{{ item.content_desc }}</span>
                </v-tooltip>
              </td>

              <td class="text-left">
                <font>{{ item.user_friendly_scheduled_date }} </font>
              </td>

              <td class="text-center">
                <v-icon color="blue" v-if="item.content_media" style="cursor: pointer" @click="modalImage = item.content_media" @click.stop="showImageModal = true">
                  mdi-image
                </v-icon>
              </td>
              <td class="text-center">
                <div v-if="item.loading == 'loading'">
                  <v-progress-circular indeterminate :width="3"></v-progress-circular>
                </div>
                <div v-else-if="item.visible == 1">
                  <v-icon color="green" style="cursor: pointer" @click="changeVisibility(item)">
                    mdi-eye
                  </v-icon>
                </div>
                <div v-else-if="item.visible == 0">
                  <v-icon color="red" @click="changeVisibility(item)">
                    mdi-eye-off
                  </v-icon>
                </div>
              </td>
              <td class="text-center">
                <v-tooltip top :color="item.scheduleIconData.color" :disabled="item.scheduleIconData.tooltip === ''">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs" :color="item.scheduleIconData.color">{{ item.scheduleIconData.icon }}</v-icon>
                  </template>
                  <span v-html="item.scheduleIconData.tooltip"></span>
                </v-tooltip>
              </td>

              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editItem(item)">
                  <v-icon color="teal">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deleteItem(item)">
                  <v-icon color="pink">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import items from '@/data/events.json'
  import Info from '@/components/Management/Info'
  import Legend from '@/components/Management/Legend'
  export default {
    name: 'itemstable',
    components: { Info, Legend },
    data: () => ({
      loading: true,
      headers: [
        {
          text: 'TITLE',
          align: 'start',
          sortable: true,
          value: 'content_title',
        },
        { text: 'DESCRIPTION', value: 'content_desc', align: 'start', sortable: true },
        { text: 'DATE', value: 'content_scheduled_date', align: 'start', sortable: true },
        { text: 'MEDIA', value: 'content_media', align: 'center', sortable: false },
        { text: 'VISIBLE', value: 'content_media', align: 'center', sortable: false },
        { text: 'SCHEDULE', value: 'visibleScheduleStart', align: 'center', sortable: false },
        { text: '', value: 'visible', align: 'end', sortable: false },
      ],
      items: [],
      search: null,
      tabs: null,
    }),
    computed: {
      counts() {
        const counts = {
          active: 0,
          pastDate: 0,
          scheduledActive: 0,
          scheduledExpired: 0,
          scheduledPending: 0,
        }
        this.itemsList.forEach(item => {
          if (item.isActive) {
            counts.active++
          }
          if (item.isPastitemDate) {
            counts.pastDate++
          }
          if (item.isScheduleActive) {
            counts.scheduledActive++
          }
          if (item.isScheduleExpired) {
            counts.scheduledExpired++
          }
          if (item.isSchedulePending) {
            counts.scheduledPending++
          }
        })
        return counts
      },
      itemsList() {
        return this.items.map(item => {
          item.isActive = this.isActive(item)
          item.isPastitemDate = this.isPastitemDate(item)
          item.isScheduleActive = this.isScheduleActive(item)
          item.isScheduleExpired = this.isScheduleExpired(item)
          item.isSchedulePending = this.isSchedulePending(item)
          item.scheduleIconData = this.scheduleIcon(item)
          return item
        })
      },
      now() {
        const currentDt = new Date()
        return currentDt
      },
    },
    methods: {
      DatetimeFromTimestamp(timestamp) {
        return new Date(timestamp.substring(' ', 'T'))
      },
      initialize() {
        this.loading = true
        this.$http
          .get('https://eipl.org/bulletinboard/index.php/contentmanager/getAllArticles')
          .then(resp => {
            console.log(resp.data)
            if (resp?.data?.length > 0) {
              this.items = resp.data.map(item => {
                item.scheduleIconData = this.scheduleIcon(item)
                return item
              })
            }
          })
          .then(() => {
            this.loading = false
          })
          .catchAll(err => console.log('error init:', err))
      },
      initializeOffline() {
        const itemList = items
        this.items = itemList.map(item => {
          item.scheduleIconData = this.scheduleIcon(item)
          return item
        })
        this.loading = false
      },
      isActive(item) {
        return Boolean(item.visible)
      },
      isPastitemDate(item) {
        if (item.content_scheduled_date) {
          const itemDate = new Date(item.content_scheduled_date)
          return itemDate < this.now
        } else {
          return false
        }
      },
      isScheduleActive(item) {
        if (item.visibleScheduleEnd && item.visibleScheduleStart) {
          const schedStartDate = new Date(item.visibleScheduleStart)
          const schedEndDate = new Date(item.visibleScheduleEnd)
          return this.now > schedStartDate && this.now < schedEndDate
        } else {
          return false
        }
      },
      isScheduleExpired(item) {
        if (item.visibleScheduleEnd) {
          const schedEndDate = new Date(item.visibleScheduleEnd)
          return schedEndDate < this.now
        } else {
          return false
        }
      },
      isSchedulePending(item) {
        if (item.visibleScheduleStart) {
          const schedStartDate = new Date(item.visibleScheduleStart)
          return this.now < schedStartDate
        } else {
          return false
        }
      },
      scheduleIcon(item) {
        if (
          item?.visibleScheduleStart === 'noschedule' ||
          item?.visibleScheduleStart === 'ERROR' ||
          item?.visibleScheduleEnd === 'noschedule' ||
          item?.visibleScheduleEnd === 'ERROR'
        ) {
          return { icon: '', color: '', tooltip: '' }
        } else {
          switch (true) {
            case item.isSchedulePending:
              return {
                icon: 'mdi-alarm',
                color: 'primary',
                tooltip: `<strong>PENDING</strong><br /> ${item.user_friendly_visibleScheduleStart} - ${item.user_friendly_visibleScheduleEnd}`,
              }
            case item.isScheduleActive:
              return {
                icon: 'mdi-alarm-check',
                color: 'success',
                tooltip: `<strong>ACTIVE</strong><br /> ${item.user_friendly_visibleScheduleStart} - ${item.user_friendly_visibleScheduleEnd}`,
              }
            case item.isScheduleExpired:
              return {
                icon: 'mdi-alarm-off',
                color: 'error',
                tooltip: `<strong>EXPIRED</strong><br /> ${item.user_friendly_visibleScheduleStart} - ${item.user_friendly_visibleScheduleEnd}`,
              }
            default:
              return { icon: '', color: '', tooltip: '' }
          }
        }
      },
    },
    created() {
      // this.initialize()
      this.initializeOffline()
    },
  }
</script>

<style lang="scss" scoped></style>
