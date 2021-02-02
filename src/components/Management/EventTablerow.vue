<template>
  <tr>
    <!-- TITLE -->
    <td class="text-left font-weight-bold">{{ item.content_title }}</td>
    <!-- DESCRIPTION -->
    <td class="text-left">
      <v-tooltip top color="primary">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ item.content_desc && item.content_desc.length > 40 ? item.content_desc.substring(0, 40) + '...' : item.content_desc }} </span>
        </template>
        <span>{{ item.content_desc }}</span>
      </v-tooltip>
    </td>
    <!-- EVENT DATE -->
    <td class="text-left" :class="item.isPastitemDate ? 'error--text' : ''">
      {{ item.user_friendly_scheduled_date }}
    </td>
    <!-- MEDIA TYPE -->
    <td class="text-center">
      <v-icon color="blue" v-if="item.content_media" style="cursor: pointer" @click="$emit('mediaModalToggle', { item, show: true })">
        mdi-image
      </v-icon>
    </td>
    <!-- VISIBILITY -->
    <td class="text-center">
      <v-btn icon :color="item.isActive ? 'success' : 'error'" :loading="false" @click="$emit('visibilityToggle', item)">
        <v-icon v-text="item.isActive ? 'mdi-eye' : 'mdi-eye-off'"></v-icon
      ></v-btn>
    </td>
    <!-- SCHEDULE -->
    <td class="text-center">
      <v-tooltip top :color="item.scheduleIconData.color" :disabled="item.scheduleIconData.tooltip === ''">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-on="on" v-bind="attrs" :color="item.scheduleIconData.color">{{ item.scheduleIconData.icon }}</v-icon>
        </template>
        <span v-html="item.scheduleIconData.tooltip"></span>
      </v-tooltip>
    </td>

    <!-- ACTIONS -->
    <td class="justify-center layout px-0">
      <v-btn icon class="mx-0" @click="$emit('itemEdit', item)">
        <v-icon color="teal">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon class="mx-0" @click="$emit('itemDelete', item)">
        <v-icon color="pink">mdi-delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped></style>
