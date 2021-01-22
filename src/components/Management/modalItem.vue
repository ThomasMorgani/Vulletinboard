<template>
  <v-dialog :key="item.id + ''" :value="show" max-width="50rem" scrollable transition="dialog-transition">
    <v-card>
      <v-card-title class="text-title font-weight-bold primary--text">
        ITEM EDIT
      </v-card-title>
      <v-card-text>
        <form action="">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-text-field type="text" label="Title" v-model="itemEdit.title" color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="text" label="Description" v-model="itemEdit.title" color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select label="Visibility" :items="optionsVisibility" v-model="itemEdit.visible" color="primary">
                <template #item="{item}">
                  <v-icon left :color="item.color">{{ item.icon }}</v-icon>
                  <span class="font-weight-bold font-size-medium">
                    {{ item.text }}
                  </span>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'itemEditModal',
    props: {
      item: {
        type: Object,
        default: () => ({
          content_desc: null,
          content_type: null,
          content_scheduled_date: null,
          content_title: null,
          content_media: null,
          content_date: null,
          created_by: null,
          created_on: null,
          id: null,
          visible: null,
          visibleScheduleEnd: null,
          visibleScheduleStart: null,
        }),
      },
      show: {
        type: Boolean,
        default: () => false,
      },
    },
    data: () => ({
      itemEdit: {},
      optionsVisibility: [
        {
          text: 'hidden',
          value: 0,
          icon: 'mdi-eye-off',
          color: 'error',
        },
        {
          text: 'schedule',
          value: -1,
          icon: 'mdi-clock',
          color: 'primary',
        },
        {
          text: 'visible',
          value: 1,
          icon: 'mdi-eye',
          color: 'success',
        },
      ],
      modalDelete: false,
      modalEventdate: false,
      modalSchedule: false,
    }),
    mounted() {
      this.itemEdit = { ...this.item }
    },
  }
</script>

<style lang="scss" scoped></style>
