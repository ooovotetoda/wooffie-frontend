// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/main.scss', 'vue-final-modal/style.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/fonts.scss" as *; @use "@/assets/colors.scss"  as *;',
        }
      }
    }
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'vue3-carousel-nuxt',
  ],
  devtools: { enabled: true },
})
