// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Wooffie: Все Услуги для Животных на Одном Сайте',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      meta: [
        { property: 'og:image', content: 'https://s3.timeweb.cloud/00708af1-woofie-s3/images/ogImage.webp' },
        { property: 'og:url', content: 'https://wooffie.ru' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://wooffie.ru',
      baseURL: 'https://2554131-yo82697.twc1.net',
      // baseURL: 'http://localhost:8080',
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  image: {
    providers: {
      myProvider: {
        name: 'myProvider',
        provider: '~/providers/my-provider.ts',
        options: {
          baseURL: "https://wooffie.ru"
        }
      }
    }
  },
  css: ['~/assets/main.scss', 'vue-final-modal/style.css'],
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
  imports: {
    dirs: ['types/*.ts'],
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'yandex-metrika-module-nuxt3',
    'vue3-carousel-nuxt'
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  //@ts-ignore
  yandexMetrika: {
    id: '96702656',
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true
  },
  plugins: [
    '~/plugins/ofetch.ts',
    '~/plugins/vfm.ts',
    '~/plugins/access.ts',
  ],
  devtools: { enabled: true },
})
