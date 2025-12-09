export default defineNuxtConfig({

  runtimeConfig: {
    public: {
      API_URL: 'http://localhost:5083/api'
    }
  },

  css: ['vuetify/styles', '~/assets/styles.scss'],

  build: {
      transpile: ['vuetify']
  }


})
