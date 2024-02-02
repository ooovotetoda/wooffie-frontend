// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  },
  css: ['~/assets/main.scss', 'vue-final-modal/style.css'],
  imports: {
    dirs: ['types/*.ts', 'stores/*.ts'],
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:8082'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
              '@use "@/assets/fonts.scss" as *; ' +
              '@use "@/assets/colors.scss"  as *; ' +
              '@import "@/assets/mixins.scss"; ',
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
