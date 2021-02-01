<template>
  <v-card flat>
    <v-card-title class="pt-2">
      <v-row align="center">
        <v-col cols="6" class="text-left">
          <h2 class="title font-weight-bold primary--text">Media</h2>
        </v-col>
        <v-col cols="6">
          <v-tabs v-model="tab" color="primary" centered height="40">
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="tab in tabs" :key="tab.value" :href="`#${tab.value}`"> <v-icon v-text="tab.icon"></v-icon> </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item value="image">
          <v-card flat>
            <!-- <v-card-title class="title primary--text text-left pt-0">
              Image
            </v-card-title> -->
            <v-card-text class="pa-0">
              <v-row>
                <v-col cols="6" d-flex flex-column justify-start>
                  <v-select v-model="typeSelect" label="Source" :items="typeOptions"></v-select>
                  <v-text-field v-if="typeSelect === 'URL'" label="Url" prepend-icon="mdi-link"></v-text-field>
                  <v-text-field
                    v-else
                    :value="file && file.name ? file.name : item.content_media"
                    clearable
                    :clear-icon="file && file.name ? 'mdi-undo' : 'mdi-close'"
                    label="File"
                    prepend-icon="mdi-image-plus"
                    readonly
                    @click:clear="onClearFileInput"
                    @click="$refs.fileInput.$refs.input.click() || null"
                  ></v-text-field>
                  <v-file-input v-show="false" v-model="file" ref="fileInput" label="File" :messages="item.content_media || ''" @change="onFileInputChange"></v-file-input>
                </v-col>
                <v-col cols="6">
                  <v-card v-if="!previewSrc" flat height="100%" width="100%" class="d-flex flex-column align-center justify-space-around">
                    <v-btn x-large text color="grey" @click="$refs.fileInput.$refs.input.click() || null">
                      <v-icon color="grey" x-large>mdi-image-plus</v-icon>
                    </v-btn>
                  </v-card>
                  <v-hover v-else>
                    <template v-slot:default="{ hover }">
                      <v-card flat @click="$emit('imageClicked', { item })" width="100%" height="200" class="d-flex align-center justify-center">
                        <ItemImage :item="item" @imageClicked="$emit('imageClicked', $event)"></ItemImage>
                        <v-fade-transition>
                          <v-overlay v-if="hover" absolute color="primary" opacity=".5">
                            <v-icon color="secondary" x-large>mdi-eye</v-icon>
                          </v-overlay>
                        </v-fade-transition>
                      </v-card>
                    </template>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="video">
          <v-card flat>
            <v-card-text>
              <v-row v-if="!inputUrl">
                <v-col cols="6" class="d-flex flex-column justify-start">INPUT</v-col>
                <v-col cols="6">PREVIEW</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="text">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="6">INPUT</v-col>
                <v-col cols="6">PREVIEW</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
  import ItemImage from '@/components/Management/ItemImage'

  export default {
    name: 'itemMedia',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    components: {
      ItemImage,
    },
    data: () => ({
      file: null,
      inputName: null,
      inputUrl: null,
      tab: 0,
      tabs: [
        {
          label: 'Image',
          icon: 'mdi-image',
          value: 'image',
        },

        {
          label: 'Video',
          icon: 'mdi-filmstrip',
          value: 'video',
        },

        {
          label: 'Text',
          icon: 'mdi-format-text',
          value: 'text',
        },
      ],
      typeOptions: ['UPLOAD', 'URL'],
      typeSelect: 'UPLOAD',
    }),
    computed: {
      test() {
        if (this.$refs?.fileInput) {
          return this.$refs.fileInput
        } else {
          return null
        }
      },
      previewSrc() {
        switch (true) {
          case this.inputUrl:
            return { ...this.item, media_content: this.inputUrl, media_content_type: 'url' }
            break
          case this.item?.content_media_type === 'image' || this.item?.content_media_type === 'image_url':
            return this.item
            break
          default:
            return false
            break
        }
        return this.data
      },
    },
    methods: {
      onClearFileInput() {
        if (this.inputUrl) {
          this.$emit('mediaReset')
          this.$nextTick(() => {
            this.file = null
            this.inputUrl = null
          })
        } else {
          this.$emit('mediaChange', { item: { content_media: null, content_media_type: null } })
        }

        //if file
        //revert to original item
        //clear this.file
        //else
        //clear item media
      },
      onFileInputChange(file) {
        if (file) {
          console.log(file)
          console.log(this.file)
          console.log(this.file.name)
          this.inputUrl = URL.createObjectURL(file)
          URL.revokeObjectURL(file)
          this.$emit('mediaChange', { item: { content_media: this.inputUrl, content_media_type: 'image_url' }, file: this.file })
        }
      },
    },
  }
</script>

<style lang="scss" scoped></style>
