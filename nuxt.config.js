export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "knjigoteka",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  router: {
    middleware: ["auth"],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/firebase",
  ],
  firebase: {
    config: {
      apiKey: "AIzaSyCARUcWtbvD2y3jkF4PFTO5BIrB-VFWwu0",
      authDomain: "knjigotekaapi.firebaseapp.com",
      projectId: "knjigotekaapi",
      storageBucket: "knjigotekaapi.appspot.com",
      messagingSenderId: "943810533754",
      appId: "1:943810533754:web:8bb8a0097dd83f709fdec3",
      measurementId: "G-P4D91FYJ4D",
    },
    services: {
      auth: {
        persistence: "local",
        initialize: {
          onAuthStateChangedAction: "onAuthStateChangedAction",
          subscribeManually: false,
        },
        ssr: false,
      },
      firestore: true,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  ssr: false,
};
