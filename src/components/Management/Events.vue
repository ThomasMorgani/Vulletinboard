<template>
  <v-card flat>
    <v-card-title class="title primary--text">
      EVENTS
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details clearable> </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
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
  export default {
    name: 'Eventstable',
    data: () => ({
      currentDateTime: new Date(),
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
    }),
    computed: {},
    methods: {
      scheduleIcon(item) {
        if (
          item?.visibleScheduleStart === 'noschedule' ||
          item?.visibleScheduleStart === 'ERROR' ||
          item?.visibleScheduleEnd === 'noschedule' ||
          item?.visibleScheduleEnd === 'ERROR'
        ) {
          return { icon: '', color: '', tooltip: '' }
        } else {
          const schedStartDate = new Date(item['visibleScheduleStart'])
          const schedEndDate = new Date(item['visibleScheduleEnd'])
          switch (true) {
            case this.currentDateTime < schedStartDate:
              return {
                icon: 'mdi-alarm',
                color: 'primary',
                tooltip: `<strong>PENDING</strong><br /> ${item.user_friendly_visibleScheduleStart} - ${item.user_friendly_visibleScheduleEnd}`,
              }
            case this.currentDateTime > schedStartDate && this.currentDateTime < schedEndDate:
              return {
                icon: 'mdi-alarm-check',
                color: 'success',
                tooltip: `<strong>ACTIVE</strong><br /> ${item.user_friendly_visibleScheduleStart} - ${item.user_friendly_visibleScheduleEnd}`,
              }
            case this.currentDateTime > schedEndDate:
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
      },
      testEventExpired(eventDate) {
        const schedDate = new Date(eventDate)
        return {
          redText: this.currentDateTime > schedDate,
        }
      },
    },
    created() {
      this.initialize()
    },
  }
</script>

<style lang="scss" scoped></style>
