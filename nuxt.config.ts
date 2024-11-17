// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',
    },
  },
})
