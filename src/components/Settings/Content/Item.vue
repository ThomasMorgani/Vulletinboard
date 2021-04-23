<template>
  <v-card outlined class="">
    <Eventlist v-if="itemlistPreview" class="eventList" sheetHeight="40em"></Eventlist>
    <v-card-title class="text-h4 primary--text">
      Items
    </v-card-title>
    <v-card-text class="d-flex ">
      <v-sheet color="transparent" class="d-flex flex-column align-start">
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemColor.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemColor.description }}</p>
            <Colorpicker @input="setItem('color', $event)" :btnProps="{ color: color }"></Colorpicker>
          </v-card-text>
        </v-card>

        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextTitle.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextTitle.description }}</p>
            <Colorpicker @input="setItem('title', $event)" :btnProps="{ color: title }"></Colorpicker>
          </v-card-text>
        </v-card>

        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextSubtitle.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextSubtitle.description }}</p>
            <Colorpicker @input="setItem('subtitle', $event)" :btnProps="{ color: subtitle }"></Colorpicker>
          </v-card-text>
        </v-card>
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextDescription.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextDescription.description }}</p>
            <Colorpicker @input="setItem('description', $event)" :btnProps="{ color: description }"></Colorpicker>
          </v-card-text>
        </v-card>
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextFooter.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextFooter.description }}</p>
            <Colorpicker @input="setItem('footer', $event)" :btnProps="{ color: footer }"></Colorpicker>
          </v-card-text>
        </v-card>
      </v-sheet>
      <v-sheet color="transparent" class="d-flex flex-column align-start ml-4">
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemColorActive.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemColorActive.description }}</p>
            <Colorpicker @input="setItem('colorActive', $event)" :btnProps="{ color: colorActive }"></Colorpicker>
          </v-card-text>
        </v-card>
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextTitleActive.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextTitleActive.description }}</p>
            <Colorpicker @input="setItem('titleActive', $event)" :btnProps="{ color: titleActive }"></Colorpicker>
          </v-card-text>
        </v-card>
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextSubtitleActive.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextSubtitleActive.description }}</p>
            <Colorpicker @input="setItem('subtitleActive', $event)" :btnProps="{ color: subtitleActive }"></Colorpicker>
          </v-card-text>
        </v-card>
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextDescriptionActive.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextDescriptionActive.description }}</p>
            <Colorpicker @input="setItem('descriptionActive', $event)" :btnProps="{ color: descriptionActive }"></Colorpicker>
          </v-card-text>
        </v-card>
        <v-card flat class="">
          <v-card-title class="text-h5 primary--text">
            {{ itemSettings.itemTextFooterActive.label }}
          </v-card-title>
          <v-card-text class="d-flex flex-column align-start">
            <p>{{ itemSettings.itemTextFooterActive.description }}</p>
            <Colorpicker @input="setItem('footerActive', $event)" :btnProps="{ color: footerActive }"></Colorpicker>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn tile color="success" :disabled="actionDisabled" width="150">SAVE </v-btn>
      <v-btn tile color="warning" :disabled="actionDisabled" @click="revertSettings">REVERT </v-btn>
      <v-spacer></v-spacer>
      <v-btn tile :color="itemlistPreview ? 'primary' : 'disabled'" @click="toggleItemlistPreview" class="font-weight-bold ">
        <v-icon left>{{ `mdi-${itemlistPreview ? 'eye' : 'eye-off'}` }}</v-icon
        >PREVIEW
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import Colorpicker from '@/components/Controls/PickerColor'
  import Eventlist from '@/components/Bulletinboard/Eventlist'
  export default {
    name: 'SettingsItem',
    components: { Colorpicker, Eventlist },
    data: () => ({
      currentSettings: {
        color: null,
        colorActive: null,
        description: null,
        descriptionActive: null,
        footer: null,
        footerActive: null,
        subtitle: null,
        subtitleActive: null,
        timeout: null,
        title: null,
        titleActive: null,
      },
      color: null,
      description: null,
      footer: null,
      itemlistPreview: false,
      metric: 'seconds',
      metricOptions: ['seconds', 'minutes', 'hours'],
      subtitle: null,
      timout: null,
      title: null,
    }),
    computed: {
      actionDisabled() {
        return false
      },
      itemSettings() {
        return this?.$store?.getters?.settingsByCat?.item || {}
      },
      // timeout: {
      //   get() {
      //     return this.fromMilliseconds(this.itemTimeout.value)
      //   },
      //   set(e) {
      //     this.$emit('input', { setting: 'itemTimeout', value: this.toMilliseconds(e.target.value) })
      //   },
      // },
    },
    methods: {
      fromMilliseconds(val) {
        switch (this.metric) {
          case 'seconds':
            return val / 1000
            break
          case 'minutes':
            return val < 60000 ? 0 : val / 60 / 1000
            break
          case 'hours':
            return val < 3600000 ? 0 : val / 60 / 60 / 1000
            break
        }
      },
      formatItemSettings() {
        const data = {
          itemColor: '#FFFFFF',
          itemColorActive: '#FFFFFF',
          itemListHeaderColor: '#2C4776',
          itemListHeaderText: 'EVENTS',
          itemListHeaderTextColor: '#FFFFFF',
          itemTextDescription: '#2C4776',
          itemTextDescriptionActive: '#FFFFFF',
          itemTextFooter: '#2C4776',
          itemTextFooterActive: '#FFFFFF',
          itemTextSubtitle: '#2C4776',
          itemTextSubtitleActive: '#FFFFFF',
          itemTextTitle: '#2C4776',
          itemTextTitleActive: '#FFFFFF',
          itemTimeout: '7000',
        }
        return data
      },
      revertSettings() {
        const currentSettings = {
          color: this.itemSettings.itemColor.value,
          colorActive: this.itemSettings.itemColorActive.value,
          description: this.itemSettings.itemTextDescription.value,
          descriptionActive: this.itemSettings.itemTextDescriptionActive.value,
          footer: this.itemSettings.itemTextFooter.value,
          footerActive: this.itemSettings.itemTextFooterActive.value,
          subtitle: this.itemSettings.itemTextSubtitle.value,
          subtitleActive: this.itemSettings.itemTextSubtitleActive.value,
          timeout: this.itemSettings.itemTimeout.value,
          title: this.itemSettings.itemTextTitle.value,
          titleActive: this.itemSettings.itemTextTitleActive.value,
        }

        for (let setting in currentSettings) {
          this[setting] = currentSettings[setting]
        }

        this.currentSettings = { ...currentSettings }
        const settingsItem = this.formatItemSettings()
        this.$store.dispatch('itemSet', { ...this.$store.state.item, ...settingsItem })
      },
      setItem(item, val) {
        this[item] = val
      },
      setUnit() {
        const timeout = this.timeout
        switch (true) {
          case timeout < 60000:
            this.metric = 'seconds'
            break
          case timeout >= 60000 && time < 3600000:
            this.metric = 'minutes'
            break
          case timeout >= 3600000:
            this.metric = 'hours'
            break
          default:
            break
        }
      },
      toggleItemlistPreview() {
        console.log('xxx')
        const items = [
          {
            content_date: '1999-09-19 19:19:19',
            content_desc: 'Description text for active item',
            content_media: '',
            content_media_type: '',
            content_subtitle: 'Active item subtitle',
            content_title: 'Active item title',
            content_type: '',
            created_by: '',
            created_on: '',
            id: 1,
            updated_by: '',
            updated_on: '',
            visible: true,
          },
          {
            content_date: '1999-09-19 19:19:19',
            content_desc: 'Description text for item',
            content_media: '',
            content_media_type: '',
            content_subtitle: 'Item subtitle',
            content_title: 'Item title',
            content_type: '',
            created_by: '',
            created_on: '',
            id: 2,
            updated_by: '',
            updated_on: '',
            visible: true,
          },
        ]

        // this.$store.dispatch('itemSet', { ...this.$store.state.item, boardHeaderShow: this.show })
        this.$store.dispatch('itemsSet', items)
        this.itemlistPreview = !this.itemlistPreview
      },
      toMilliseconds(val) {
        switch (this.metric) {
          case 'seconds':
            return val * 1000
            break
          case 'minutes':
            return val * 60 * 1000
            break
          case 'hours':
            return val * 60 * 60 * 1000
            break
        }
      },
    },
    created() {
      this.revertSettings()
    },
  }
</script>

<style lang="scss" scoped>
  .eventList {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>
