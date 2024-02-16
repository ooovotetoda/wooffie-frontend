// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true }
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  runtimeConfig: {
    public: {
      baseURL: 'https://2554131-yo82697.twc1.net',
      // baseURL: 'http://localhost:8080',
    },
  },
  css: ['~/assets/main.scss', 'vue-final-modal/style.css'],
  imports: {
    dirs: ['types/*.ts', 'stores/*.ts'],
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
    '@nuxt/image',
    'vue3-carousel-nuxt'
  ],
  plugins: [
    '~/plugins/ofetch.ts',
    '~/plugins/vfm.ts',
    '~/plugins/access.ts',
  ],
  devtools: { enabled: true },
})
