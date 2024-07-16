export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: 'https://wooffie.ru',
      baseURL: 'https://ooovotetoda-wooffie-backend-dda1.twc1.net',
      // baseURL: 'http://localhost:8080',
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/auth/**': { prerender: true },
    '/faq/**': { prerender: true },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  // @ts-ignore
  colorMode: {
    preference: 'light',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  image: {
    providers: {
      myProvider: {
        name: 'myProvider',
        provider: '~/providers/my-provider.ts',
        options: {
          baseURL: 'https://wooffie.ru',
        },
      },
    },
  },
  imports: {
    dirs: ['types/*.ts'],
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxt/ui',
    '@nuxtjs/robots',
    '@nuxt/eslint',
    'nuxt-module-eslint-config',
  ],
  plugins: [
    '~/plugins/ofetch.ts',
    '~/plugins/access.ts',
  ],
  css: ['~/assets/main.css', '~/assets/colors.css', '~/assets/fonts.css'],
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(96702656, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
          `,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/96702656" style="position:absolute; left:-9999px;" alt="" /></div>',
        },
      ],
      title: 'Wooffie: Все Услуги для Животных на Одном Сайте',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'description', content: 'Вуффи – ваш надёжный онлайн-сервис для записи к ветеринарам, грумерам и специалистам по уходу за животными. Найдите идеального специалиста для вашего питомца, сравните цены и читайте отзывы в одном месте.' },
        { property: 'og:image', content: 'https://s3.timeweb.cloud/00708af1-woofie-s3/images/ogImage.webp' },
        { property: 'og:url', content: 'https://wooffie.ru' },
        { property: 'og:description', content: 'Забота о питомце стала проще с Wooffie! Откройте для себя лучших специалистов, читайте отзывы и записывайтесь на прием онлайн. Ваш питомец заслуживает лучшего – выберите качество с Вуффи.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'keywords', content: 'Ветеринар, ветеринарная клиника, грумер, зоосалон, уход за питомцем, стрижка собаки, уход за животными, стрижка питомца, обследование питомца' },
      ],
    },
  },
  devtools: { enabled: true },
})
