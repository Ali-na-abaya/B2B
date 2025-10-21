export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  compatibilityDate: '2025-10-21',
  css: ["~/assets/css/tailwind.css"],
   css: [
    '@fortawesome/fontawesome-free/css/all.min.css'
  ]
});

