// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: "http://127.0.0.1:8000",
    },
  },
});
