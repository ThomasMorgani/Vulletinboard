<template>
  <v-card>
    <v-card-title>
      <span>
        <h3 class="primary--text">Edit Visibility Schedule</h3>
      </span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" class="d-flex justify-center">
          <v-dialog ref="modalScheduledateStart" v-model="modalScheduledateStart" :return-value.sync="scheduledateStart" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheduledateStart"
                label="Start date"
                prepend-icon="mdi-calendar"
                :messages="dateStartDetail"
                readonly
                clearable
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="scheduledateStart" scrollable>
              <v-btn text color="primary" @click="modalScheduledateStart = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.modalScheduledateStart.save(scheduledateStart)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-dialog ref="modalScheduletimeStart" v-model="modalScheduletimeStart" :return-value.sync="scheduletimeStart" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheduletimeStart"
                label="Start time"
                prepend-icon="mdi-calendar"
                :messages="timeStartDetail"
                readonly
                clearable
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-model="scheduletimeStart" scrollable>
              <v-btn text color="primary" @click="modalScheduletimeStart = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.modalScheduletimeStart.save(scheduletimeStart)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-dialog ref="modalScheduledateEnd" v-model="modalScheduledateEnd" :return-value.sync="scheduledateEnd" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheduledateEnd"
                label="End date"
                prepend-icon="mdi-calendar"
                :messages="dateEndDetail"
                readonly
                clearable
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="scheduledateEnd" scrollable>
              <v-btn text color="primary" @click="modalScheduledateEnd = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.modalScheduledateEnd.save(scheduledateEnd)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-dialog ref="modalScheduletimeEnd" v-model="modalScheduletimeEnd" :return-value.sync="scheduletimeEnd" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="scheduletimeEnd"
                label="End time"
                prepend-icon="mdi-calendar"
                :messages="timeEndDetail"
                readonly
                clearable
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-model="scheduletimeEnd" scrollable>
              <v-btn text color="primary" @click="modalScheduletimeEnd = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.modalScheduletimeEnd.save(scheduletimeEnd)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="d-flex align-center">
      <v-spacer></v-spacer>
      <v-btn color="error" text @click.stop="$emit('cancel')">CANCEL</v-btn>

      <v-tooltip top color="error" :disabled="error === false">
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-btn color="primary" text :disabled="error !== false" @click.stop="$emit('updateSchedule', { end: endTimestamp, start: startTimestamp })" class="font-weight-bold"
              >SAVE</v-btn
            >
          </div>
        </template>
        <span class="font-weight-bold">{{ error }}</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
  import formats from '@/utils/formats'
  export default {
    name: 'itemSchedule',
    props: {
      item: {
        type: Object,
        required: false,
      },
    },
    data: () => ({
      modalScheduledateStart: false,
      modalScheduledateEnd: false,
      modalScheduletimeStart: false,
      modalScheduletimeEnd: false,
      scheduledateStart: null,
      scheduledateEnd: null,
      scheduletimeStart: null,
      scheduletimeEnd: null,
    }),
    computed: {
      dateEndDetail() {
        if (!this.scheduledateEnd) {
          return 'No event date'
        } else {
          return formats.dateHuman(this.scheduledateEnd)
        }
      },
      dateStartDetail() {
        if (!this.scheduledateStart) {
          return 'No event date'
        } else {
          return formats.dateHuman(this.scheduledateStart)
        }
      },
      endTimestamp() {
        return this.scheduledateEnd && this.scheduletimeEnd ? `${this.scheduledateEnd} ${this.scheduletimeEnd}` : null
      },
      startTimestamp() {
        return this.scheduledateStart && this.scheduletimeStart ? `${this.scheduledateStart} ${this.scheduletimeStart}` : null
      },
      error() {
        if (!this.endTimestamp || !this.startTimestamp) {
          return 'All fields required'
        }

        const endDt = new Date(this.endTimestamp)
        const startDt = new Date(this.startTimestamp)
        if (endDt < startDt) {
          return 'End date/time must come after Start'
        }

        return false
      },
      timeEndDetail() {
        if (!this.scheduletimeEnd) {
          return 'No event date'
        } else {
          return formats.timeHuman(this.scheduletimeEnd)
        }
      },
      timeStartDetail() {
        if (!this.scheduletimeStart) {
          return 'No event date'
        } else {
          return formats.timeHuman(this.scheduletimeStart)
        }
      },
    },
    methods: {
      setEnd(end) {
        const [date, time] = end
        this.dateEnd = date
        this.timeEnd = time
      },
      setStart(start) {
        const [date, time] = start
        this.dateEnd = date
        this.timeEnd = time
      },
    },
    mounted(end) {
      console.log(this.item)
      if (this.item?.visibleScheduleEnd) {
        this.setEnd(this.item.visibleScheduleEnd)
      }

      if (this?.visibleScheduleStart) {
        this.setStart(this.visibleScheduleStart)
      }

      if (!this.item?.visibleScheduleEnd && !this.item?.visibleScheduleStart) {
        console.log('bnoit')
        const nowTs = formats.timestampFromDt()
        this.setStart(nowTs)
      }
    },
  }
</script>

<style lang="scss" scoped></style>
