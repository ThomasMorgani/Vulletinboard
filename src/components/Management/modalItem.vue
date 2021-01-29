<template>
  <v-dialog ref="itemModal" :value="show" max-width="50rem" scrollable transition="dialog-transition">
    <v-card min-height="85vh">
      <v-card-title class="text-title font-weight-bold primary--text">
        ITEM EDIT
      </v-card-title>
      <v-card-text>
        <form action="">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-text-field type="text" label="Title" v-model="itemEdit.content_title" color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="text" label="Description" v-model="itemEdit.content_desc" color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-dialog ref="modalEventdate" v-model="modalEventdate" :return-value.sync="itemEdit.event_date" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="itemEdit.event_date"
                    label="Event date"
                    prepend-icon="mdi-calendar"
                    :messages="dateDetail"
                    readonly
                    clearable
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="itemEdit.event_date" scrollable>
                  <v-btn text color="primary" @click="modalEventdate = false">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="$refs.modalEventdate.save(itemEdit.event_date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-dialog ref="modalEventtime" v-model="modalEventtime" :return-value.sync="itemEdit.event_time" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="itemEdit.event_time"
                    label="Event time"
                    prepend-icon="mdi-clock-time-four-outline"
                    :messages="timeDetail"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="modalEventtime" v-model="itemEdit.event_time" full-width>
                  <v-btn text color="primary" @click="modalEventtime = false">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="$refs.modalEventtime.save(itemEdit.event_time)">
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col cols="6">
              <v-select label="Visible" :items="optionsVisibility" v-model="itemEdit.visible" color="primary">
                <!-- <template #selection="{item}">
                  <v-icon left :color="item.color">{{ item.icon }}</v-icon>
                  <span class="font-weight-bold font-size-medium">
                    {{ item.text }}
                  </span>
                </template> -->
                <template #prepend>
                  <v-icon left :color="itemEdit.visible ? 'success' : 'error'">{{ itemEdit.visible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                </template>
                <template #item="{item}">
                  <v-icon left :color="item.color">{{ item.icon }}</v-icon>
                  <span class="font-weight-bold font-size-medium">
                    {{ item.text }}
                  </span>
                </template>
              </v-select>
            </v-col>

            <v-col cols="6">
              <v-switch :input-value="scheduled" label="Schedule" prepend-icon="mdi-alarm" :messages="scheduled ? scheduleDetail : null" @click="toggleSchedule">
                <template #append>
                  <v-dialog v-if="scheduled" ref="modalEventtime" v-model="modalSchedule" :return-value.sync="itemEdit.event_time" persistent width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" text color="warning">
                        <v-icon left>
                          mdi-pencil
                        </v-icon>
                        edit
                      </v-btn>
                    </template>
                    <ScheduleEdit
                      :item="itemEdit"
                      :key="modalSchedule + ''"
                      :show="modalSchedule"
                      @cancel="modalSchedule = false"
                      @updateSchedule="onUpdateSchedule"
                    ></ScheduleEdit>
                  </v-dialog>
                </template>
              </v-switch>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="$emit('close')">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import formats from '@/utils/formats'
  import ScheduleEdit from '@/components/Management/modalItemSchedule'

  export default {
    name: 'itemEditModal',
    props: {
      item: {
        type: Object,
        required: true,
      },
      itemDefault: {
        type: Object,
        required: true,
      },
      show: {
        type: Boolean,
        default: () => false,
      },
    },
    components: {
      ScheduleEdit,
    },
    data: () => ({
      itemEdit: null,
      optionsVisibility: [
        {
          text: 'HIDDEN',
          value: false,
          icon: 'mdi-eye-off',
          color: 'error',
        },
        {
          text: 'VISIBLE',
          value: true,
          icon: 'mdi-eye',
          color: 'success',
        },
      ],
      modalDelete: false,
      modalEventdate: false,
      modalEventtime: false,
      modalSchedule: false,
      scheduled: false,
      scheduledFirst: true,
    }),
    computed: {
      dateDetail() {
        if (!this.itemEdit.event_date) {
          return 'No event date'
        } else {
          return formats.dateHuman(this.itemEdit.event_date)
        }
      },
      scheduleDetail() {
        if (!this.itemEdit.user_friendly_scheduleEnd && !this.itemEdit.user_friendly_scheduleStart) {
          return 'Schedule not set'
        } else {
          return `${this.itemEdit.user_friendly_scheduleStart} - ${this.itemEdit.user_friendly_scheduleEnd}`
        }
      },
      timeDetail() {
        if (!this.itemEdit.event_time) {
          return 'No event time'
        } else {
          return formats.timeHuman(this.itemEdit.event_time)
        }
      },
    },
    methods: {
      onUpdateSchedule({ end, start }) {
        const [endDate, endTime] = end.split(' ')
        const [startDate, startTime] = start.split(' ')
        this.itemEdit.scheduleEnd = end
        this.itemEdit.user_friendly_scheduleEnd = `${formats.dateHuman(endDate, true, false)} ${formats.timeHuman(endTime)} `
        this.itemEdit.scheduleStart = start
        this.itemEdit.user_friendly_scheduleStart = `${formats.dateHuman(startDate, true, false)} ${formats.timeHuman(startTime)} `
        this.modalSchedule = false
      },
      setEventDatetime(dt) {
        const [date, time] = dt.split(' ')
        this.itemEdit.event_date = date
        this.itemEdit.event_time = time
      },
      toggleSchedule() {
        if (this.scheduledFirst) {
          this.modalSchedule = true
          this.scheduledFirst = false
        }
        this.scheduled = !this.scheduled
      },
    },
    created() {
      console.log(this.item)
      const states = ['isScheduleActive', 'isScheduleExpired', 'isSchedulePending']
      let isScheduled = false
      this.itemEdit = { ...this.item } || { ...this.itemDefault }

      if (this.itemEdit.content_date) {
        this.setEventDatetime(this.itemEdit.content_date)
      }

      states.forEach(state => {
        if (this.itemEdit[state]) {
          isScheduled = true
        }
      })
      if (isScheduled) {
        this.scheduled = true
        this.scheduledFirst = true
      }
    },
  }
</script>

<style lang="scss" scoped></style>
