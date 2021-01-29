<template>
  <v-card flat>
    <v-card-title class="pt-2">
      <v-row align="center">
        <v-col cols="6" class="text-left">
          <h2 class="title font-weight-bold primary--text">Media</h2>
        </v-col>
        <v-col cols="6">
          <v-tabs v-model="tab" color="primary" right height="40">
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
            <v-card-text>
              <v-row>
                <v-col cols="6" d-flex flex-column justify-start>
                  <v-select v-model="typeSelect" label="Source" :items="typeOptions"></v-select>
                  <v-text-field
                    :label="typeSelect === 'URL' ? 'Url' : 'File'"
                    :items="typeOptions"
                    :prepend-icon="typeSelect === 'URL' ? 'mdi-link' : 'mdi-image-plus'"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-card flat height="100%" width="100%" class="d-flex flex-column align-center justify-space-around">
                    <v-icon color="disabled" x-large>mdi-image</v-icon>
                    <p class="text--disabled">PREVIEW</p>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="video">
          <v-card flat>
            <v-card-text>
              <v-row>
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
  export default {
    name: 'itemMedia',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
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
  }
</script>

<style lang="scss" scoped></style>
